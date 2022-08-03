//****************************************************************************************************

    //
    // Connect to Grass Valley Gateway to control OCP
    //

var xml2js = require('xml2js-preserve-spaces');
var GVAuth = {'application-authentication-request': {$:{'xml-protocol': "2.0", 'response-levels':"ErrorOnly"}, 'name':'NPCCShaderCP'}};
var builder = new xml2js.Builder();
var parser = new xml2js.Parser();


const EventEmitter = require('events');
class MyEmitter extends EventEmitter {}
const myEmitter = new MyEmitter();

socketlib = require('net');
var socket = socketlib.Socket();

const port = 8080;
const host = '10.1.44.210';



exports.sendIrisValue = sendIrisValue;
exports.sendGainValue = sendGainValue;
exports.sendNDFilterValue = sendNDFilterValue;
exports.ocpSetCamera = ocpSetCamera;
exports.subscribe2Camera = subscribe2Camera;
exports.sendPresetRecall = sendPresetRecall;
exports.connect = connect;


//  <device connection-state="connected">
//    <sessionid>IHQWGM</sessionid>
//    <name access="rw" maxlength="2" type="numeric">1</name>
//    <alias access="r" maxlength="8" type="charset1">CAM 1</alias>
//    <deviceid access="r" maxlength="6" type="charset1">044YCP</deviceid>
//    <type>OCP</type>


function ocpSetCamera(camera){
//    var camera = {'function-value-change': {device: {sessionid:'IHQWGM', name: '1', deviceid: '044YCP', alias: 'CAM 1', 'function': {$:{'id': '8466'}, value: camera}}}};

    var temp;

    temp = {'function-value-change': {device: {deviceid: '045NRN', 'function': {$:{'id': '8466'}, value: camera}}}};

    var xml = builder.buildObject(temp);
    //console.log (ocpSetCamera);
    console.dir (xml);
    socket.write(xml);        
}


function sendIrisValue(camera, relative, value){

    //console.log(sendIrisValue);

    var setJson = {"function-value-change":{"$":{"response-level":"ErrorOnly"},"device":[{"name":[camera],"function":[{"$":{"id":"542"},"value":[{"_":value,"$":{"relative":relative}}]}]}]}};

    var xml = builder.buildObject(setJson);
    //console.dir (xml);
    socket.write(xml);        
}

//<function id="4098" access="w" blocked="false">
//  <type>Mode</type>
//  <name>Recall SceneFile</name>
//  <option name="No File">1</option>
//  <option name="File 1">2</option>
//  <option name="File 2">3</option>
//  <option name="File 3">4</option>
//  <option name="File 4">5</option>
//  <option name="Standard">6</option>
//  <value>1</value>
//</function>

function sendPresetRecall(camera, value){

    var setJson = {"function-value-change":{"$":{"response-level":"ErrorOnly"},"device":[{"name":[camera],"function":[{"$":{"id":"4098"},"value":[{"_":value,"$":{"relative":'false'}}]}]}]}};

    var xml = builder.buildObject(setJson);
    console.log(sendPresetRecall);
    console.dir (xml);
    socket.write(xml);        
}

function sendGainValue(camera, relative, value){

    var setJson = {"function-value-change":{"$":{"response-level":"ErrorOnly"},"device":[{"name":[camera],"function":[{"$":{"id":"8392"},"value":[{"_":value,"$":{"relative":relative}}]}]}]}};

    var xml = builder.buildObject(setJson);
    console.log(sendGainValue);
    console.dir (xml);
    socket.write(xml);        
}

function sendNDFilterValue(camera, relative, value){

    var setJson = {"function-value-change":{"$":{"response-level":"ErrorOnly"},"device":[{"name":[camera],"function":[{"$":{"id":"9999"},"value":[{"_":value,"$":{"relative":relative}}]}]}]}};

    var xml = builder.buildObject(setJson);
    console.log(sendNDFilterValue);
    console.dir (xml);
    socket.write(xml);        
}


//                var subscribe2CameraIris = {'function-information-request': 

function subscribe2Camera(camera){

    console.log('+++++++++++++++++++' + 'subscribe2Camera');

    for (i=0; i<1; i++){
        var sub2Cam = {'function-value-request': 
                {$:{'subscribe': "true", 'response-level': 'ErrorOnly'}, 
                                device:{
                                        name: camera, 
                                        'function': {$:{'id': i}},
                                }
                }};
        var xml = builder.buildObject(sub2Cam);
        console.log(sub2Cam);
        console.dir (xml);
        socket.write(xml);        
    }


    console.log('+++++++++++++++++++' + 'subscribe2Camera');
}



// Functions to handle socket events
function connect() {
    console.log('Connecting to GrassValley ' + host + ':' + port + '...');
    socket.connect(port, host);

    return myEmitter;
}

socket.on('connect', function () {
    var xml = builder.buildObject(GVAuth);
//    console.dir (xml);
    socket.write(xml);          // Authenticate the connection
    console.log('GrassValley connected!');
});
socket.on('end', function () {
    console.log('end');
});
socket.on('timeout', function () {
    console.log('GrassValley timeout');
});
socket.on('drain', function () {
    console.log('drain');
});
socket.on('error', function () {
    console.log('error');
    Connect();
});
socket.on('close', function () {
    console.log('close');
});

socket.on('data', function(data) {
    
    console.log('\n******************************\nRaw from GV: \n' + data);
        
    var parser = new xml2js.Parser();
    parser.parseString(data, function (err, result) {
        console.dir(result);
        console.dir(Object.keys(result)[0]);
    
        switch (Object.keys(result)[0]){
            
            case 'request-response':
                console.log('Got request-response');
    
                break;
    
            case 'application-authentication-indication':
                console.log('Got application-authentication-indication');
    
                break;
    
            case 'function-information-indication':
                console.log('Unknown Message Type ' +Object.keys(result)[0]);
                break;

            case 'function-value-indication':

                switch(result['function-value-indication'].device[0].function[0]['$'].id){

                    case '1039':        // Iris
                        var fstop = 
                            MapIris2Fstop( result['function-value-indication'].device[0].function[0]['value']);
                        myEmitter.emit('iris', result['function-value-indication'].device[0].name, fstop);
                    break;

                    case '8392':        //  Gain
                        var gain = 
                            result['function-value-indication'].device[0].function[0]['value'];
                        myEmitter.emit('iris', result['function-value-indication'].device[0].name, gain);
                    break;
                }
                break;
    
            default:
                console.log('Unknown Message Type ' +Object.keys(result)[0]);
    
        }
    
    });
    
});

let table = {
      34: '---',
      31: '25.',
      51: '22.',
      30: '21.',
      50: '19.',
      49: '17.',
      29: '16.',
      28: '15.',
      48: '13.',
      27: '12.',
      26: '11.',
      25: '10.',
      47: '9.5',
      24: '8.7',
      23: '8.0',
      22: '7.3',
      46: '6.7',
      21: '6.2',
      20: '5.6',
      19: '5.2',
      45: '4.8',
      18: '4.4',
      17: '4.0',
      16: '3.7',
      44: '3.4',
      15: '3.1',
      14: '2.8',
      13: '2.6',
      43: '2.4',
      12: '2.2',
      11: '2.0',
      9:  '1.8',
      8:  '1.7',
      6:  '1.5',
      5:  '1.4' };

function MapIris2Fstop(value){
    return (table[value]);
}

