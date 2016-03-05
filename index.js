var mqtt = require("mqtt")
    , util = require('util')
    , stream = require('stream').Writable;

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
    this.queuedRegistrations = [];

    // read and as needed update connection and other configuration
    var connOpts = require("./lib/config").connOpts;
    // fall back to serial as username and app token as password if username
    // and password are needed (userID may be implied by key, or anonymous)
    if (connOpts.username != undefined) {
        connOpts.username = connOpts.username || app.id;
        connOpts.password = connOpts.password || app.token;
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
        var devGuid;
        while (devGuid = self.queuedRegistrations.pop()) {
            self.registerDevice(devGUID);
        }
    });
    this.mqttClient.on('reconnect', function () {
        app.log.info("Reconnecting to MQTT broker");
    });
    this.mqttClient.on('close', function () {
        app.log.info("Disconnected from MQTT broker");
    });

    app.on('device::up', this.registerDevice.bind(this));
    app.on('client::down', function () {
        /* disconnect from MQTT server */
        this.mqttClient.end();
    }.bind(this));
};

ninjaMqtt.prototype.registerDevice = function(devGuid) {
    // if we aren't currently connected to MQTT, queue the device
    if (! (this.mqttClient && this.mqttClient.connected)) {
        return this.queuedRegistrations.push(devGuid);
    }
    // otherwise register the device on MQTT broker
    var self = this,
        log = this.app.log,
        device = this.devices[devGuid];
    this.deviceHeartbeat(device, function(err, regT) {
        if (err) throw err;
        log.info("Registered device %s as %s with MQTT broker", devGuid, regT);
        self.publishUp(self.topicNameFor('meta', device, regT),
                       function(err) {
                           if (err) {
                               return log.error("Publish UP to MQTT: %s", err);
                           }
                           log.debug("Published UP for %s", devGuid);
                       });
    });
    if (device.readable) {
        device.on('data', dataHandler.call(this, device));
    }
    if (device.writeable) {
        this.subscribeActuatorTopic(device, function(err, granted) {
            if (err) throw err;
            self.mqttClient.on('message', messageHandler.call(self, device));
        });
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
    var qos = { qos: 2 };
    this.mqttClient.publish(topic + "/up",
                            (new Date(Date.now())).toString(),
                            qos,
                            callback);
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

ninjaMqtt.prototype.deviceHeartbeat = function(device, callback) {
    callback = defaultHandler(callback);
    var mqttClient = this.mqttClient,
        app = this.app,
        deviceID = deviceUID(device),
        qos = { qos: 2 },
        self = this;
    [ device.readable ? 'sensor' : undefined,
      device.writeable ? 'actuator' : undefined ].forEach(
          function(devType, i) {
              if (devType ==  undefined) return;
              var prefix = self.topicNameFor('meta', device, devType);
              mqttClient.publish(prefix + "/active", "1", qos, function(err) {
                  if (err) return callback(err);
                  app.log.debug("published heartbeat for device %s_%s",
                                app.id, deviceID);
                  callback(null, devType);
              });
          });
};

ninjaMqtt.prototype.subscribeActuatorTopic = function(device, callback) {
    callback = defaultHandler(callback);
    var mqttClient = this.mqttClient,
        app = this.app,
        deviceID = deviceUID(device),
        topic = this.topicNameFor('value', device, 'actuator'),
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
        topic = this.topicNameFor('value', device, 'sensor');

    return function(data) {
        if (!self.mqttClient.connected) {
            return log.debug("MQTT not connected, dropping data (%s)", data);
        }
        self.mqttClient.publish(topic, data, qos, function(err) {
            if (err) {
                return log.error("Error publishing data from %s: %s",
                                 deviceGUID(self.app.id, device), err);
            }
        });
    };
}

function messageHandler(device) {
    var log = this.app.log,
        self = this;
    return function(topic, message) {
        var DA = message.toString();
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

module.exports = ninjaMqtt;
