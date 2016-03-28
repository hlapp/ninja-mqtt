var mqtt = require("mqtt")
    , util = require('util')
    , stream = require('stream').Writable
    , EventEmitter = require('events')
    , config = require("./lib/config")
    , dt = require("./lib/deviceTable");

const enabled = true;

// Give our driver a stream interface
util.inherits(ninjaMqtt,stream);

function ninjaMqtt(opts, app) {
    stream.call(this);
    var self = this;
    
    this.app = app;
    this.opts = opts || {};

    if (!enabled) {
        return app.log.info("Ninjablocks MQTT module is not enabled.");
    }

    /* we need the array of devices */
    var ninja = app.domain.members.filter(function(member) {
        return member.hasOwnProperty('devices');
    });
    if (ninja.length < 1) throw new Error("could not find ninja client object");
    this.devices = ninja[0].devices || {};
    this.queuedRegistrations = Object.keys(this.devices);

    // read and as needed update connection and other configuration
    var connOpts = config.connOpts;
    // fall back to serial as username and app token as password if username
    // and password are needed (userID may be implied by key, or anonymous)
    if (connOpts.username !== undefined) {
        connOpts.username = connOpts.username || app.id;
        connOpts.password = connOpts.password || app.token;
    }
    connOpts.will = {
        topic: this.topicNameFor('meta') + "/up",
        payload: "false",
        qos: 1,
        retain: true
    }
    /* connect to MQTT server */
    this.mqttClient = mqtt.connect(connOpts);

    /* register event handlers for MQTT connection */
    this.mqttClient.on('connect', function () {
        app.log.info("Connected to MQTT broker");
        self.registerBlock(function(err) {
            if (err) throw err;
            app.log.info("Registered %s on MQTT broker", app.id);
            self.publishUp(self.topicNameFor('meta'), function(err) {
                if (err) return app.log.error("Publish UP to MQTT: %s", err);
                app.log.debug("Published UP for %s", app.id);
            });
        });
        // register devices that have been queued up
        var devGuid = self.queuedRegistrations.pop();
        while (devGuid) {
            self.registerDevice(devGuid);
            devGuid = self.queuedRegistrations.pop()
        }
        self.mqttClient.on('message', messageHandler.call(self));
    });
    this.mqttClient.on('reconnect', function () {
        app.log.info("Reconnecting to MQTT broker");
    });
    this.mqttClient.on('close', function () {
        app.log.info("Disconnected from MQTT broker");
    });

    app.on('device::up', this.registerDevice.bind(this));
};

ninjaMqtt.prototype.registerDevice = function(devGuid) {
    var self = this,
        log = this.app.log,
        device = this.devices[devGuid];
    // if we aren't currently connected to MQTT, queue the device
    if (! (this.mqttClient && this.mqttClient.connected)) {
        log.info("Queuing device %s for registration with MQTT", devGuid);
        return this.queuedRegistrations.push(devGuid);
    }
    // otherwise register the device on MQTT broker
    var devTypes = [];
    if (! device.metadata) {
        var matchingDevs = dt.findDevice(device);
        if (matchingDevs.length > 0) {
            device.metadata = matchingDevs[0];
        }
    }
    if (device.metadata) {
        if (device.metadata.readable) devTypes.push('sensor');
        if (device.metadata.writable) devTypes.push('actuator');
    } else {
        log.warn("Device %s not found in the known device table", devGuid);
        if ((device.readable === undefined) || device.readable) {
            devTypes.push('sensor');
        }
        if (device.writeable || ('function' === typeof device.write)) {
            devTypes.push('actuator');
        }
    }
    devTypes.forEach(function(devType) {
        var topicPrefix = self.topicNameFor('meta', device, devType);
        self.publishUp(topicPrefix, function(err) {
            if (err) return log.error("Publish UP to MQTT: %s", err);
            log.debug("Published UP for %s %s", devType, devGuid);
            self.publishMeta(topicPrefix, device, function(err) {
                if (err) return log.error("Publish META to MQTT: %s", err);
                log.debug("Published metadata for %s %s", devType, devGuid);
            });
            log.info("Registered %s device %s with MQTT broker",devType,devGuid);
            self.deviceHeartbeat(device, devType, function(err) {
                if (err) throw err;
                log.debug("published heartbeat for %s device %",
                          devType, devGuid);
            });
        });
        if (devType === 'sensor') {
            device.on('data', dataHandler.call(self, device));
        } else if (devType === 'actuator') {
            self.subscribeActuatorTopic(device);
        }
    });
    if (isRF433device(device)) {
        device.on('data', rf433subDeviceHandler.call(self, device));
    }
}

ninjaMqtt.prototype.registerBlock = function(callback) {
    callback = defaultHandler(callback);
    var mqttClient = this.mqttClient;
    if (!mqttClient) callback(new Error("MQTT connection not available"));
    this.blockHeartbeat(callback);
};

ninjaMqtt.prototype.publishUp = function(topic, callback) {
    callback = defaultHandler(callback);
    var qos = { qos: 2, retain: true };
    var now = (new Date(Date.now())).toString();
    this.mqttClient.publish(topic + "/up", now, qos, callback);
}

ninjaMqtt.prototype.publishMeta = function(topic, device, callback) {
    callback = defaultHandler(callback);
    if (! device.metadata) return callback();
    var qos = { qos: 2, retain: true };
    var metaProps = ['devType', 'name'];
    for (var prop of metaProps) {
        if (device.metadata[prop]) {
            this.mqttClient.publish(topic + "/" + prop,
                                    device.metadata[prop].toString(),
                                    qos,
                                    function(err) {
                                        if (err) return callback(err);
                                    });
        }
    }
    callback();
}

ninjaMqtt.prototype.blockHeartbeat = function(callback) {
    callback = defaultHandler(callback);
    var mqttClient = this.mqttClient,        
        qos = { qos: 2 },
        app = this.app,
        topicNameFor = this.topicNameFor.bind(this);
    mqttClient.publish(topicNameFor("block"), app.id, qos, function(err) {
        if (err) return callback(err);
        publishActive();
    });
    function publishActive() {
        mqttClient.publish(topicNameFor('meta') + '/active', "1",
                           qos,
                           callback);
    }
};

ninjaMqtt.prototype.deviceHeartbeat = function(topicPrefix, callback) {
    callback = defaultHandler(callback);
    var mqttClient = this.mqttClient,
        qos = { qos: 2 };
    mqttClient.publish(topicPrefix + "/active", "1", qos, callback);
};

ninjaMqtt.prototype.subscribeActuatorTopic = function(device, callback) {
    callback = defaultHandler(callback);
    var mqttClient = this.mqttClient,
        app = this.app,
        deviceID = deviceUID(device),
        topic = this.topicNameFor('data', device, 'actuator'),
        qos = { qos: 1 };
    mqttClient.subscribe(topic, qos, function(err, granted) {
        if (err) return callback(err);
        granted.forEach(function(subscr) {
            app.log.info("Subscribed to actuator topic for device", deviceID);
        });
        callback(err, granted);
    });
}

/* Required by Stream.Writable implementors */
ninjaMqtt.prototype._write = function(chunk, encoding, callback) {
    return this.mqttClient.write(chunk, encoding, callback);
}

ninjaMqtt.prototype.topicNameFor = function(channelType, device, deviceType) {
    if (channelType == 'block') return 'ninjablock/blocks';
    if (device) {
        return ['dev',
                this.app.id,
                deviceType,
                deviceUID(device),
                channelType].join('/');
    } else {
        return ['dev', this.app.id, channelType].join('/');
    }
}

function dataHandler(device) {
    var log = this.app.log,
        self = this,
        qos = { qos: 1 },
        topic = this.topicNameFor('data', device, 'sensor');

    return function(data) {
        var DA = data.toString();
        if (!self.mqttClient.connected) {
            return log.debug("MQTT not connected, dropping data (%s)", data);
        }
        self.mqttClient.publish(topic, DA, qos, function(err) {
            if (err) {
                return log.error("Error publishing data from %s: %s",
                                 deviceGUID(self.app.id, device), err);
            }
        });
    };
}

function rf433subDeviceHandler(device) {
    var self = this;

    return function(data) {
        var devMeta = config.rf433deviceMap[data.toString()];
        if (devMeta) {
            var subDevGuid = deviceGUID(self.app.id, devMeta);
            var subDev = self.devices[subDevGuid];
            if (! subDev) {
                subDev = {
                    G: devMeta.G, V: devMeta.V, D: devMeta.D,
                    metadata: devMeta
                };
                EventEmitter.call(subDev);
                self.devices[subDevGuid] = subDev;
                self.registerDevice(subDevGuid);
            }
            subDev.emit('data', subDev.metadata.mapRFdata(data));
        }
    };
}

function messageHandler() {
    var log = this.app.log,
        self = this;
    return function(topic, message) {
        var topicElems = topic.split('/');
        if (topicElems.length < 4) return;
        var DA = message.toString(),
            deviceID = topicElems[1] + "_" + topicElems[3],
            device = self.devices[deviceID];
        if (!device) {
            return log.warn("Attempt to actuate unknown device %s (%s)",
                            deviceID, DA);
        }
        if ('function' == typeof device.write) {
            log.debug("Actuating device %s (%s) using write",
                      deviceGUID(self.app.id, device), DA);
            device.write(DA);
        } else {
            log.debug("Actuating device %s (%s) using event",
                      deviceGUID(self.app.id, device), DA);
            self.app.emit('device::command',
                          { G: device.G, V: device.V, D: device.D, DA: DA });
        }
    };
}

function deviceUID(device) {
    return [device.G, device.V, device.D].join('_');
}

function deviceGUID(blockID, device) {
    return blockID + '_' + deviceUID(device);
}

function defaultHandler(callback) {
    return (callback && ('function' === typeof callback)) ?
        callback : function(err) { if (err) throw err; }
    ;
}

function isRF433device(device) {
    var rf433devices = dt.findDevice({ V:device.V, D:device.D, name:"rf433" });
    return rf433devices.length > 0;
}

module.exports = ninjaMqtt;
