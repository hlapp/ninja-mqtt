/* MQTT and other connection options */

var fs = require("fs");
var dt = require("./deviceTable");
const ourGID = '1011'; // = 11 decimal = 'L' (Lappland)

/* must have trailing slashes */
const assetsDir = __dirname + "/../assets/";
const tokenDir = "/etc/opts/ninja/";

var RF433codes = {
    '010101010101010101010101': {
        // PIR Motion Sensor, with timeSeries = true
        V: "0",
        D: "204",
        mapRFdata: function(data) { return "1"; }
    },
    '010011010101000100110000': {
        // Button, timeSeries = false
        V: "0",
        D: "5",
        mapRFdata: function(data) {
            // alternate between 1 and 0, starting with 1
            this._data ^= 1;
            return this._data;
        }
    },
    '010101000101111101010000': {
        // Reed Sensor, timeSeries = true
        V: "0",
        D: "201",
        mapRFdata: function(data) { return "1"; }
    }
}

function readAsset(fname) {
    return fs.readFileSync(assetsDir + fname);
}

function readNinjaToken(fname) {
    return fs.readFileSync(tokenDir + fname);
}

function secConnOpts() {
    this.host = "ninjablock.local";
    this.port = 8883;
    this.key = readAsset("ninja-mqtt-client.key");
    this.cert = readAsset("ninja-mqtt-client.crt");
    this.ca = readAsset("ca-certificates.crt");
    this.protocol = "mqtts";
};

function localConnOpts() {
    this.host = "localhost";
    this.port = 1883;
    // this.username = readNinjaToken("serial.conf");
    // this.password = readNinjaToken("mqtt-token.conf");
    this.username = null; // null triggers default, currently block serial
    this.password = null; // null triggers default, currently block token
    this.protocol = "mqtt";
};

function rf433DeviceResolver() {
    function resolve(rfdata) {
        if (this.cache[rfdata]) return this.cache[rfdata];
        var rf433dev = RF433codes[rfdata];
        var matches = dt.findDevice(rf433dev);
        if (matches.length == 0) return undefined;
        matches[0].G = ourGID;
        matches[0].mapRFdata = rf433dev.mapRFdata.bind(matches[0]);
        this.cache[rfdata] = matches[0];
        return matches[0];
    }
    var devMap = {};
    Object.defineProperty(devMap, 'cache', {
        value: {}
        // by default, the prop won't be enumerable, changeable, deletable
    });
    for (var rfdata in RF433codes) {
        Object.defineProperty(devMap, rfdata, {
            get: resolve.bind(devMap, rfdata),
            enumerable: true,
            configurable: true
        });
    }
    return devMap;
}

// the connection options object
module.exports.connOpts = new secConnOpts();

// a map from rf433 data values to metadata of the (sub)device they're
// coming from
module.exports.rf433deviceMap = rf433DeviceResolver();
