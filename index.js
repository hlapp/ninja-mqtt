var mqtt = require("mqtt")
    , util = require('util')
    , stream = require('stream');

const enabled = true;

const CHANNELS = {
    block: function() { return "ninjablock/blocks"; },
    dev: {
        meta: fmtDeviceChannel.bind(this, null, "meta"), // pass blockID
        sensor: {
            // pass blockID, devID
            meta: fmtDeviceChannel.bind(this, "sensor", "meta"), 
            value: fmtDeviceChannel.bind(this, "sensor", "value")
        },
        actuator: {
            // pass blockID, devID
            meta: fmtDeviceChannel.bind(this, "actuator", "meta"), 
            value: fmtDeviceChannel.bind(this, "actuator", "value")
        }
    }
};

function fmtDeviceChannel(devType, devChannel, blockID, devID) {
    if (devID == undefined) {
        return "dev/"+blockID+"/"+devChannel;
    }
    return "dev/"+blockID+"/"+devType+"/"+devID+"/"+devChannel;
}

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
    var config = require("./lib/config");
    // fall back to serial as username and app token as password if username
    // and password are needed (userID may be implied by key, or anonymous)
    if (config.username != undefined) {
        config.username = config.username || app.id;
        config.password = config.password || app.token;
    }
    /* connect to MQTT server */
    this.isConnected = false;
    this.mqttClient = mqtt.connect(config.connOpts);

    /* register event handlers for MQTT connection */
    this.mqttClient.on('connect', function () {
        self.isConnected = true;
        app.log.info("Connected to MQTT broker");
        self.registerBlock(function(err) {
            if (err) throw err;
            app.log.info("Registered %s on MQTT broker", app.id);
            self.publishUp(CHANNELS.dev.meta(app.id), function(err) {
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
        self.isConnected = false;
        app.log.info("Disconnected from MQTT broker");
    });

    app.on('device::up', this.registerDeviceHandler.bind(this));
    app.on('client::down', function () {
        /* disconnect from MQTT server */
        this.mqttClient.end();
    }.bind(this));
};

ninjaMqtt.prototype.registerDevice = function(devGuid) {
    // if we aren't currently connected to MQTT, queue the device
    if (!this.isConnected) return this.queuedRegistrations.push(devGuid);
    // otherwise register the device on MQTT broker
    var self = this,
        log = this.app.log,
        device = this.devices[devGuid];
    this.registerDevice(device, function(err, regT) {
        if (err) throw err;
        log.info("Registered device %s as %s with MQTT broker", devGuid, regT);
        self.publishUp(CHANNELS.dev[regT].meta(self.app.id, deviceUID(device)),
                       function(err) {
                           if (err) {
                               return log.error("Publish UP to MQTT: %s", err);
                           }
                           log.debug("Published UP for %s", devGuid);
                       });
    });
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
        app = this.app;
    mqttClient.publish(CHANNELS.block(), app.id, qos, function(err) {
        if (err) return callback(err);
        publishActive();
    });
    function publishActive() {
        mqttClient.publish(CHANNELS.dev.meta(app.id) + "/active", "1",
                           qos,
                           callback);
    }
};

ninjaMqtt.prototype.deviceHeartbeat = function(device, callback) {
    callback = defaultHandler(callback);
    var mqttClient = this.mqttClient,
        app = this.app,
        deviceID = deviceUID(device);
        qos = { qos: 2 };
    [ device.readable ?
      CHANNELS.dev.sensor.meta(app.id, deviceID) : undefined,
      device.writable ?
      CHANNELS.dev.actuator.meta(app.id, deviceID) : undefined ].forEach(
          function(prefix, i) {
              if (prefix ==  undefined) return;
              mqttClient.publish(prefix + "/active", "1", qos, function(err) {
                  if (err) return callback(err);
                  app.log.debug("published heartbeat for device %s_%s",
                                app.id, deviceID);
                  callback(null, i == 0 ? "sensor" : "actuator");
              });
          });
};

function deviceUID(device) {
    return [device.G, device.V, device.D].join('_');
}

function subscribe(mqttClient) {
    mqttClient.subscribe('$SYS/#', function(err, granted) {
        if (err) throw err;
        granted.forEach(function(elem) {
            console.log("subscribed to " + elem.topic + ", QoS=" + elem.qos);
        });
    });
}

function publish(mqttClient) {
    mqttClient.publish('presence', 'Hello mqtt', function() {
        console.log("publish complete");
    });
}

function defaultHandler(callback) {
    return (callback && ('function' === typeof callback)) ?
        callback : function(err) { if (err) throw err; }
    ;
}

module.exports = ninjaMqtt;
