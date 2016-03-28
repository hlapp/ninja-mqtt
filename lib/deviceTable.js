/*
 * Table of known device IDs and the metadata properties of the
 * corresponding devices.
 * 
 * Transcribed from https://shop.ninjablocks.com/pages/device-ids
 *
 * Property legend:
 * - column "State" is omitted
 * - "Actuator" is property "w" (writable)
 * - "Sensor" is property "r" (readable)
 * - "Has Sub Device" is property "hasSubDevs" (sub-devices will often
 *   come in multiples, hence plural)
 * - "Time Series data" is property "timeSeries"
 */

const DeviceTable = [{ 
    V:"0", D:"1", devType:"temperature", name: "Block Temperature", writable:false, readable:true, silent:false, hasSubDevs:false, timeSeries:true
}, {
    V:"0", D:"2", devType:"linear_acceleration", name:"Block Accelerometer", writable:false, readable:true, silent:false, hasSubDevs:false, timeSeries:false
}, {
    V:"0", D:"3", devType:"jiggle", name:"Block Jiggle", writable:false, readable:true, silent:false, hasSubDevs:false, timeSeries:false
}, {
    V:"0", D:"5", devType:"button", name:"Push Button", writable:false, readable:true, silent:false, hasSubDevs:false, timeSeries:false
}, {
    V:"0", D:"6", devType:"light_level", name:"Light Sensor", writable:false, readable:true,	silent:false, hasSubDevs:false, timeSeries:true
}, {
    V:"0", D:"7", devType:"pir", name:"PIR Motion Sensor", writable:false, readable:true,	silent:false, hasSubDevs:false, timeSeries:false
}, {
    V:"0", D:"8", devType:"humidity", name:"Humidity", writable:false, readable:true, silent:false, hasSubDevs:false, timeSeries:true
}, {
    V:"0", D:"9", devType:"temperature", name:"Temperature", writable:false, readable:true, silent: 0, hasSubDevs:false, timeSeries:true
}, {
    V:"0", D:"11", devType:"rf433", name:"RF 433Mhz", writable:true, readable:true, silent:false, hasSubDevs:true, timeSeries:false
}, {
    V:"0", D:"12", devType:"sound", name:"Sound Sensor", writable:false, readable:true, silent:false, hasSubDevs:false, timeSeries:false
}, {
    V:"0", D:"13", devType:"temperature", name:"La Crosse Temp TX3/6", writable:false, readable:true, silent:false, hasSubDevs:false, timeSeries:true
}, {
    V:"0", D:"14", devType:"hid", name:"Unknown HID Device", writable:false, readable:true, silent:false, hasSubDevs:false, timeSeries:false
}, {
    V:"0", D:"20", devType:"temperature", name:"La Crosse Temp WS2355", writable:false, readable:true, silent:false, hasSubDevs:false, timeSeries:true
}, {
    V:"0", D:"21", devType:"humidity", name:"La Crosse Humidity WS2355", writable:false, readable:true, silent:false, hasSubDevs:false, timeSeries:true
}, {
    V:"0", D:"22", devType:"rainfall", name:"La Crosse Rainfall WS2355", writable:false, readable:true, silent:false, hasSubDevs:false, timeSeries:false
}, {
    V:"0", D:"23", devType:"direction", name:"La Crosse Wind Direction", writable:false, readable:true, silent:false, hasSubDevs:false, timeSeries:false
}, {
    V:"0", D:"24", devType:"speed", name:"La Crosse Wind Speed", writable:false, readable:true, silent:false, hasSubDevs:false, timeSeries:false
}, {
    V:"0", D:"30", devType:"humidity", name:"Humidity", writable:false, readable:true, silent:false, hasSubDevs:false, timeSeries:true
}, {
    V:"0", D:"31", devType:"temperature", name:"Temperature", writable:false, readable:true, silent:false, hasSubDevs:false, timeSeries:true
}, {
    V:"0", D:"101", devType:"twitter", name:"Twitter", writable:true, readable:true, silent:true, hasSubDevs:false, timeSeries:false
}, {
    V:"0", D:"102", devType:"facebook", name:"Facebook", writable:true, readable:true, silent:true, hasSubDevs:false, timeSeries:false
}, {
    V:"0", D:"103", devType:"sms", name:"SMS", writable:true, readable:true, silent:true, hasSubDevs:false, timeSeries:false
}, {
    V:"0", D:"104", devType:"dropbox", name:"Dropbox", writable:true, readable:true, silent:true, hasSubDevs:false, timeSeries:false
}, {
    V:"0", D:"105", devType:"googledrive", name:"Google Drive", writable:true, readable:true, silent:true, hasSubDevs:false, timeSeries:false
}, {
    V:"0", D:"106", devType:"email", name:"Email", writable:true, readable:true, silent:true, hasSubDevs:false, timeSeries:false
}, {
    V:"0", D:"107", devType:"salesforce", name:"Salesforce", writable:true, readable:true, silent:true, hasSubDevs:false, timeSeries:false
}, {
    V:"0", D:"108", devType:"webhook", name:"Webhook", writable:true, readable:true, silent:true, hasSubDevs:true, timeSeries:false
}, {
    V:"0", D:"200", devType:"button", name:"Push Button", writable:false, readable:true, silent:false, hasSubDevs:false, timeSeries:true
}, {
    V:"0", D:"201", devType:"momentary_switch", name:"Reed Switch", writable:false, readable:true, silent:false, hasSubDevs:false, timeSeries:true
}, {
    V:"0", D:"202", devType:"temperature", name:"Temperature", writable:false, readable:true, silent:false, hasSubDevs:false, timeSeries:true
}, {
    V:"0", D:"203", devType:"humidity", name:"Humidity", writable:false, readable:true, silent:false, hasSubDevs:false, timeSeries:true
}, {
    V:"0", D:"204", devType:"pir", name:"PIR Motion Sensor", writable:false, readable:true, silent:false, hasSubDevs:false, timeSeries:true
}, {
    V:"0", D:"205", devType:"switch_sensor", name:"Switch Sensor", writable:false, readable:true, silent:false, hasSubDevs:false, timeSeries:true
}, {
    V:"0", D:"206", devType:"switch_actuator", name:"Switch Actuator", writable:true, readable:false, silent:false, hasSubDevs:false, timeSeries:false
}, {
    V:"0", D:"207", devType:"switch", name:"Switch", writable:true, readable:true, silent:false, hasSubDevs:false, timeSeries:true
}, {
    V:"0", D:"208", devType:"orientation", name:"Orientation", writable:false, readable:true, silent:false, hasSubDevs:false, timeSeries:false
}, {
    V:"0", D:"209", devType:"jiggle", name:"Jiggle", writable:false, readable:true, silent:false, hasSubDevs:false, timeSeries:true
}, {
    V:"0", D:"210", devType:"gesture", name:"Gesture", writable:false, readable:true, silent:false, hasSubDevs:false, timeSeries:false
}, {
    V:"0", D:"211", devType:"keyboard", name:"Keyboard", writable:false, readable:true, silent:false, hasSubDevs:false, timeSeries:false
}, {
    V:"0", D:"212", devType:"code_reader", name:"Barcode Scanner", writable:false, readable:true, silent:false, hasSubDevs:false, timeSeries:false
}, {
    V:"0", D:"213", devType:"code_reader", name:"QR code Scanner", writable:false, readable:true, silent:false, hasSubDevs:false, timeSeries:false
}, {
    V:"0", D:"214", devType:"distance", name:"Distance", writable:false, readable:true, silent:false, hasSubDevs:false, timeSeries:true
}, {
    V:"0", D:"215", devType:"sound", name:"Sound", writable:false, readable:true, silent:false, hasSubDevs:false, timeSeries:true
}, {
    V:"0", D:"216", devType:"microphone", name:"Microphone", writable:false, readable:true, silent:false, hasSubDevs:false, timeSeries:false
}, {
    V:"0", D:"217", devType:"hid", name:"HID Device", writable:false, readable:true, silent:false, hasSubDevs:true, timeSeries:false
}, {
    V:"0", D:"218", devType:"rfid", name:"RFID Reader", writable:false, readable:true, silent:false, hasSubDevs:true, timeSeries:false
}, {
    V:"0", D:"219", devType:"proximity", name:"Proximity Sensor", writable:false, readable:true, silent:false, hasSubDevs:false, timeSeries:true
}, {
    V:"0", D:"220", devType:"camera_still", name:"Camera", writable:true, readable:true, silent:false, hasSubDevs:false, timeSeries:false
}, {
    V:"0", D:"221", devType:"camera_video", name:"Video Camera", writable:true, readable:true, silent:false, hasSubDevs:false, timeSeries:false
}, {
    V:"0", D:"222", devType:"compass", name:"Compass", writable:false, readable:true, silent:false, hasSubDevs:false, timeSeries:false
}, {
    V:"0", D:"223", devType:"location", name:"Location", writable:false, readable:true, silent:false, hasSubDevs:false, timeSeries:false
}, {
    V:"0", D:"224", devType:"light", name:"Light", writable:false, readable:true, silent:false, hasSubDevs:false, timeSeries:true
}, {
    V:"0", D:"225", devType:"moisture", name:"Moisture", writable:false, readable:true, silent:false, hasSubDevs:false, timeSeries:true
}, {
    V:"0", D:"226", devType:"ph", name:"pH Sensor", writable:false, readable:true, silent:false, hasSubDevs:false, timeSeries:true
}, {
    V:"0", D:"227", devType:"geiger", name:"Geiger Counter", writable:false, readable:true, silent:false, hasSubDevs:false, timeSeries:true
}, {
    V:"0", D:"228", devType:"rf", name:"RF Transceiver", writable:true, readable:true, silent:false, hasSubDevs:true, timeSeries:false
}, {
    V:"0", D:"229", devType:"zigbee", name:"Zigbee Transceiver", writable:true, readable:true, silent:false, hasSubDevs:true, timeSeries:false
}, {
    V:"0", D:"230", devType:"zwave", name:"Z-wave Transceiver", writable:true, readable:true, silent:false, hasSubDevs:true, timeSeries:false
}, {
    V:"0", D:"231", devType:"alarm", name:"Alarm", writable:true, readable:false, silent:false, hasSubDevs:false, timeSeries:false
}, {
    V:"0", D:"232", devType:"speaker", name:"Speaker", writable:true, readable:false, silent:false, hasSubDevs:false, timeSeries:false
}, {
    V:"0", D:"233", devType:"light_onoff", name:"Light", writable:true, readable:false, silent:false, hasSubDevs:false, timeSeries:false
}, {
    V:"0", D:"233", devType:"light_switch", name:"Light", writable:true, readable:false, silent:false, hasSubDevs:false, timeSeries:false
}, {
    V:"0", D:"234", devType:"light_dim", name:"Light (Dimmable)", writable:true, readable:false, silent:false, hasSubDevs:false, timeSeries:false
}, {
    V:"0", D:"235", devType:"rgbled8", name:"RGB Light (Basic)", writable:true, readable:false, silent:false, hasSubDevs:false, timeSeries:false
}, {
    V:"0", D:"236", devType:"rgbled", name:"RGB Light", writable:true, readable:false, silent:false, hasSubDevs:false, timeSeries:false
}, {
    V:"0", D:"237", devType:"servo", name:"Servo", writable:true, readable:false, silent:false, hasSubDevs:false, timeSeries:false
}, {
    V:"0", D:"238", devType:"relay", name:"Relay", writable:true, readable:false, silent:false, hasSubDevs:false, timeSeries:false
}, {
    V:"0", D:"239", devType:"stepper", name:"Stepper", writable:true, readable:false, silent:false, hasSubDevs:false, timeSeries:false
}, {
    V:"0", D:"240", devType:"display_text", name:"Text Display", writable:true, readable:false, silent:false, hasSubDevs:false, timeSeries:false
}, {
    V:"0", D:"241", devType:"display_image", name:"Image Display", writable:true, readable:false, silent:false, hasSubDevs:false, timeSeries:false
}, {
    V:"0", D:"242", devType:"energy", name:"Energy", writable:false, readable:true, silent:false, hasSubDevs:false, timeSeries:true
}, {
    V:"0", D:"243", devType:"power", name:"Power", writable:false, readable:true, silent:false, hasSubDevs:false, timeSeries:true
}, {
    V:"0", D:"244", devType:"state", name:"Generic State Device", writable:true, readable:true, silent:false, hasSubDevs:false, timeSeries:false
}, {
    V:"0", D:"255", devType:"screen_capture", name:"Screen Capture", writable:true, readable:true, silent:false, hasSubDevs:false, timeSeries:false
}, {
    V:"0", D:"256", devType:"screen_capture", name:"Mac Screen Capture", writable:true, readable:true, silent:false, hasSubDevs:false, timeSeries:false
}, {
    V:"0", D:"260", devType:"presence", name:"Presence", writable:false, readable:true, silent:false, hasSubDevs:false, timeSeries:false
}, {
    V:"0", D:"261", devType:"presence", name:"Presence - Wifi AP", writable:false, readable:true, silent:false, hasSubDevs:false, timeSeries:false
}, {
    V:"0", D:"262", devType:"presence", name:"Presence - Wifi Client", writable:false, readable:true, silent:false, hasSubDevs:false, timeSeries:false
}, {
    V:"0", D:"263", devType:"presence", name:"Presence - Bluetooth", writable:false, readable:true, silent:false, hasSubDevs:false, timeSeries:false
}, {
    V:"0", D:"264", devType:"presence", name:"Presence - USB", writable:false, readable:true, silent:false, hasSubDevs:false, timeSeries:false
}, {
    V:"0", D:"265", devType:"presence", name:"Presence - IP", writable:false, readable:true, silent:false, hasSubDevs:false, timeSeries:false
}, {
    V:"0", D:"266", devType:"presence", name:"Presence - UPNP", writable:false, readable:true, silent:false, hasSubDevs:false, timeSeries:false
}, {
    V:"0", D:"267", devType:"presence", name:"Presence - Zeroconf", writable:false, readable:true, silent:false, hasSubDevs:false, timeSeries:false
}, {
    V:"0", D:"268", devType:"presence", name:"Presence - MAC", writable:false, readable:true, silent:false, hasSubDevs:false, timeSeries:false
}, {
    V:"0", D:"269", devType:"presence", name:"Presence - Xbox Live", writable:false, readable:true, silent:false, hasSubDevs:false, timeSeries:false
}, {
    V:"0", D:"280", devType:"mediaplayer", name:"Media Player", writable:true, readable:true, silent:false, hasSubDevs:false, timeSeries:false
}, {
    V:"0", D:"281", devType:"mediaplayer", name:"Media Player - Xbmc", writable:true, readable:true, silent:false, hasSubDevs:false, timeSeries:false
}, {
    V:"0", D:"282", devType:"mediaplayer", name:"Media Player - VLC", writable:true, readable:true, silent:false, hasSubDevs:false, timeSeries:false
}, {
    V:"0", D:"283", devType:"mediaplayer", name:"Media Player - iTunes", writable:true, readable:true, silent:false, hasSubDevs:false, timeSeries:false
}, {
    V:"0", D:"284", devType:"mediaplayer", name:"Media Player - Spotify", writable:true, readable:true, silent:false, hasSubDevs:false, timeSeries:false
}, {
    V:"0", D:"300", devType:"openurl", name:"Open URL", writable:true, readable:false, silent:false, hasSubDevs:false, timeSeries:false
}, {
    V:"0", D:"310", devType:"notification", name:"Notification", writable:true, readable:false, silent:false, hasSubDevs:false, timeSeries:false
}, {
    V:"0", D:"311", devType:"notification", name:"Mac Notification", writable:true, readable:false, silent:false, hasSubDevs:false, timeSeries:false
}, {
    V:"0", D:"320", devType:"lock-screen", name:"Lock Screen", writable:true, readable:false, silent:false, hasSubDevs:false, timeSeries:false
}, {
    V:"0", D:"500", devType:"location", name:"Browser GPS", writable:false, readable:true, silent:false, hasSubDevs:false, timeSeries:false
}, {
    V:"0", D:"500", devType:"cpu", name:"CPU Usage", writable:false, readable:true, silent:false, hasSubDevs:false, timeSeries:true
}, {
    V:"0", D:"501", devType:"cpu", name:"NinjaBlock CPU Usage", writable:false, readable:true, silent:false, hasSubDevs:false, timeSeries:true
}, {
    V:"0", D:"502", devType:"cpu", name:"Mac CPU Usage", writable:false, readable:true, silent:false, hasSubDevs:false, timeSeries:true
}, {
    V:"0", D:"503", devType:"cpu", name:"Raspberry Pi CPU Usage", writable:false, readable:true, silent:false, hasSubDevs:false, timeSeries:true
}, {
    V:"0", D:"510", devType:"temperature", name:"CPU Temperature", writable:false, readable:true, silent:false, hasSubDevs:false, timeSeries:true
}, {
    V:"0", D:"511", devType:"temperature", name:"Raspberry Pi CPU Temperature", writable:false, readable:true, silent:false, hasSubDevs:false, timeSeries:true
}, {
    V:"0", D:"512", devType:"temperature", name:"NinjaBlock CPU Temperature", writable:false, readable:true, silent:false, hasSubDevs:false, timeSeries:true
}, {
    V:"0", D:"513", devType:"temperature", name:"Mac CPU Temperature", writable:false, readable:true, silent:false, hasSubDevs:false, timeSeries:true
}, {
    V:"0", D:"520", devType:"ram", name:"RAM Usage", writable:false, readable:true, silent:false, hasSubDevs:false, timeSeries:true
}, {
    V:"0", D:"521", devType:"ram", name:"NinjaBlock RAM Usage", writable:false, readable:true, silent:false, hasSubDevs:false, timeSeries:true
}, {
    V:"0", D:"522", devType:"ram", name:"Mac RAM Usage", writable:false, readable:true, silent:false, hasSubDevs:false, timeSeries:true
}, {
    V:"0", D:"523", devType:"ram", name:"Raspberry Pi RAM Usage", writable:false, readable:true, silent:false, hasSubDevs:false, timeSeries:true
}, {
    V:"0", D:"530", devType:"network-activity", name:"Incoming Network Activity", writable:false, readable:true, silent:false, hasSubDevs:false, timeSeries:true
}, {
    V:"0", D:"531", devType:"network-activity", name:"NinjaBlock Incoming Network Activity", writable:false, readable:true, silent:false, hasSubDevs:false, timeSeries:true
}, {
    V:"0", D:"532", devType:"network-activity", name:"Mac Incoming Network Activity", writable:false, readable:true, silent:false, hasSubDevs:false, timeSeries:true
}, {
    V:"0", D:"533", devType:"network-activity", name:"Raspberry Pi Incoming Network Activity", writable:false, readable:true, silent:false, hasSubDevs:false, timeSeries:true
}, {
    V:"0", D:"540", devType:"network-activity", name:"Outgoing Network Activity", writable:false, readable:true, silent:false, hasSubDevs:false, timeSeries:true
}, {
    V:"0", D:"541", devType:"network-activity", name:"NinjaBlock Outgoing Network Activity", writable:false, readable:true, silent:false, hasSubDevs:false, timeSeries:true
}, {
    V:"0", D:"542", devType:"network-activity", name:"Mac Outgoing Network Activity", writable:false, readable:true, silent:false, hasSubDevs:false, timeSeries:true
}, {
    V:"0", D:"543", devType:"network-activity", name:"Raspberry Pi Outgoing Network Activity", writable:false, readable:true, silent:false, hasSubDevs:false, timeSeries:true
}, {
    V:"0", D:"550", devType:"battery", name:"Battery", writable:false, readable:true, silent:false, hasSubDevs:false, timeSeries:false
}, {
    V:"0", D:"551", devType:"battery", name:"Mac Battery", writable:false, readable:true, silent:false, hasSubDevs:false, timeSeries:false
}, {
    V:"0", D:"600", devType:"ias_zone", name:"IAS Zone", writable:false, readable:true, silent:false, hasSubDevs:false, timeSeries:false
}, {
    V:"0", D:"999", devType:"rgbled", name:"On Board RGB LED v2", writable:true, readable:true, silent:false, hasSubDevs:false, timeSeries:false
}, {
    V:"0", D:"999", devType:"rgbled8", name:"Status Light", writable:true, readable:true, silent:false, hasSubDevs:false, timeSeries:false
}, {
    V:"0", D:"1000", devType:"rgbled8", name:"On Board RGB LED", writable:true, readable:true, silent:false, hasSubDevs:false, timeSeries:false
}, {
    V:"0", D:"1002", devType:"relay", name:"Relay Board", writable:true, readable:true, silent:false, hasSubDevs:false, timeSeries:true
}, {
    V:"0", D:"1003", devType:"system", name:"Arduino Version", writable:true, readable:true, silent:false, hasSubDevs:false, timeSeries:false
}, {
    V:"0", D:"1004", devType:"webcam", name:"Web Cam", writable:true, readable:false, silent:false, hasSubDevs:false, timeSeries:false
}, {
    V:"0", D:"1005", devType:"network", name:"Network", writable:true, readable:true, silent:true, hasSubDevs:false, timeSeries:false
}, {
    V:"0", D:"1006", devType:"speech", name:"USB Text to Speech", writable:true, readable:false, silent:false, hasSubDevs:false, timeSeries:false
}, {
    V:"0", D:"1007", devType:"rgbled", name:"Nina's Eyes", writable:true, readable:true, silent:false, hasSubDevs:false, timeSeries:false
}, {
    V:"0", D:"1008", devType:"light", name:"Philips Hue", writable:true, readable:true, silent:false, hasSubDevs:false, timeSeries:false
}, {
    V:"0", D:"1009", devType:"relay", name:"Belkin WeMo Socket", writable:true, readable:false, silent:false, hasSubDevs:false, timeSeries:false
}, {
    V:"0", D:"1010", devType:"light", name:"ZigBee Light", writable:true, readable:true, silent:false, hasSubDevs:false, timeSeries:false
}, {
    V:"0", D:"1011", devType:"light", name:"Limitless LED RGB", writable:true, readable:true, silent:false, hasSubDevs:false, timeSeries:false
}, {
    V:"0", D:"1012", devType:"light", name:"Limitless LED White", writable:true, readable:true, silent:false, hasSubDevs:false, timeSeries:false
}, {
    V:"0", D:"1020", devType:"speech", name:"Text-to-Speech", writable:true, readable:false, silent:false, hasSubDevs:false, timeSeries:false
}, {
    V:"0", D:"1021", devType:"speech", name:"Mac Text-to-Speech", writable:true, readable:false, silent:false, hasSubDevs:false, timeSeries:false
}, {
    V:"0", D:"2000", devType:"sandbox", name:"Sandbox", writable:true, readable:true, silent:false, hasSubDevs:true, timeSeries:true
}, {
    V:"0", D:"3680", devType:"html", name:"HTML", writable:false, readable:true, silent:false, hasSubDevs:false, timeSeries:false
}, {
    V:"0", D:"7000", devType:"matrix_display", name:"LED Board", writable:true, readable:false, silent:true, hasSubDevs:false, timeSeries:false
}, {
    V:"0", D:"9001", devType:"metric", name:"Connected Blocks", writable:false, readable:true, silent:false, hasSubDevs:false, timeSeries:true
}, {
    V:"0", D:"9002", devType:"metric", name:"Redis Response Time", writable:false, readable:true, silent:false, hasSubDevs:false, timeSeries:true
}, {
    V:"0", D:"9003", devType:"metric", name:"MySQL Response Time", writable:false, readable:true, silent:false, hasSubDevs:false, timeSeries:true
}, {
    V:"0", D:"10000", devType:"led", name:"Browser LED", writable:true, readable:true, silent:false, hasSubDevs:false, timeSeries:false
}, {
    V:"2", D:"9714", devType:"airconditioner", name:"Air Conditioner", writable:true, readable:true, silent:false, hasSubDevs:false, timeSeries:false
}, {
    V:"3", D:"1", devType:"relay", name:"Power Socket Switch", writable:true, readable:true, silent:false, hasSubDevs:false, timeSeries:false
}, {
    V:"3", D:"2", devType:"power", name:"Power Usage", writable:false, readable:true, silent:false, hasSubDevs:false, timeSeries:true
}, {
    V:"3", D:"3", devType:"switch_sensor", name:"NetVox Switch", writable:false, readable:true, silent:false, hasSubDevs:false, timeSeries:true
}, {
    V:"3", D:"11", devType:"rf433", name:"Camera Control", writable:true, readable:true, silent:false, hasSubDevs:true, timeSeries:false
}, {
    V:"4", D:"2", devType:"meeting_length", name:"Meeting Length", writable:false, readable:true, silent:false, hasSubDevs:false, timeSeries:true
}, {
    V:"4", D:"3", devType:"room_utilisation", name:"Room Utilisation", writable:false, readable:true, silent:false, hasSubDevs:false, timeSeries:true
}, {
    V:"4", D:"4", devType:"battery_alarm", name:"Battery Alarm", writable:false, readable:true, silent:false, hasSubDevs:false, timeSeries:false
}, {
    V:"4", D:"5", devType:"alarm", name:"Zone Alarm", writable:false, readable:true, silent:false, hasSubDevs:false, timeSeries:false
}];

module.exports.deviceTable = DeviceTable;
module.exports.findDevice = function(query) {
    if (! query) return [];
    var matches = DeviceTable;
    if (query.D !== undefined) matches = matches.filter(function(devEntry) {
        return (devEntry.D === query.D.toString());
    });
    if (query.V !== undefined) matches = matches.filter(function(devEntry) {
        return (devEntry.V === query.V.toString());
    });
    if (query.devType !== undefined) matches = matches.filter(function(devEntry) {
        return (devEntry.devType === query.devType);
    });
    if (query.name !== undefined) matches = matches.filter(function(devEntry) {
        return (devEntry.name === query.name);
    });
    return matches;
};
