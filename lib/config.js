/* MQTT and other connection options */

var fs = require("fs");

/* must have trailing slashes */
var assetsDir = __dirname + "/../assets/";
var tokenDir = "/etc/opts/ninja/";

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
    this.protocol = "mqtt";
};

module.exports = {
    // the connection options object 
    "connOpts": new secConnOpts()
};
