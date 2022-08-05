
const EventEmitter = require('events');
class MyEmitter extends EventEmitter {}
const myEmitter = new MyEmitter();

socketlib = require('net');
var socket = socketlib.Socket();

const iupControlPort = 55100;
const iupDataPort = 55110;
const host = '10.2.43.101';

exports.sendIrisValue = sendIrisValue;
exports.sendGainValue = sendGainValue;
exports.sendNDFilterValue = sendNDFilterValue;
//exports.ocpSetCamera = ocpSetCamera;
exports.subscribe2Camera = subscribe2Camera;
exports.sendPresetRecall = sendPresetRecall;
exports.connect = connect;


            // Convert 16 bit endeanness
function swap16(val) {
    return ((val & 0xFF) << 8) | ((val >> 8) & 0xFF);
}


var outBuf = new ArrayBuffer(128); // create a buffer of length 128
var outBuf16 = new Uint32Array(outBuf); // treat buffer as a sequence of 16-bit integers

// Variable Control - 0x0130
// Iris sub-code - 0x80B2
// Gain sub code - 0x8249
// ND Filter - 0x806A
// Step Gain - 0x8060


var seqNum = 0;

function sendIrisValue(camera, relative, value){

                                        // HEADER
    outBuf16[0] = swap16(0x0F10);       // Protocol Type
    outBuf16[1] = swap16(0x0100);       // Protocol Version
    outBuf16[3] = swap16(0x0000);       // 1/2 or Reserved
    outBuf16[4] = swap16(0x0000);       // 1/2 ...
    outBuf16[5] = swap16(0x0001);       // Device Type 0x0001=Camera Head
    outBuf16[6] = swap16(0x0100);       // Group ID
    outBuf16[7] = swap16(0x0100);       // Device ID
    outBuf16[8] = swap16(0x0100);       // SubDevice ID
    outBuf16[9] = swap16(++seqNum);     // Seq num to be echoed back by Ikegami
    outBuf16[10] = swap16(0x0130);      // Command ID  0x0130=Order Action
    outBuf16[11] = swap16(0x0000);      // Message length


    outBuf16[12] = swap16(0x0130);      // Service Code  0x0130=Variable Control / Minimum Value=-2048, Maximum Value=2047
    outBuf16[13] = swap16(0x80B2);      // Service Sub Code  0x80B2=Iris
    outBuf16[14] = swap16(value);       // Data


    console.dir (outBuf16);
    socket.write(outBuf16);        
}

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
    console.log('********** sendGainValue()');
    console.dir (xml);
    socket.write(xml);        
}

function sendNDFilterValue(camera, relative, value){

    var setJson = {"function-value-change":{"$":{"response-level":"ErrorOnly"},"device":[{"name":[camera],"function":[{"$":{"id":"1030"},"value":[{"_":value,"$":{"relative":relative}}]}]}]}};

    var xml = builder.buildObject(setJson);
    console.log(sendNDFilterValue);
    console.dir (xml);
    socket.write(xml);        
}

function subscribe2Camera(camera){

    console.log('+++++++++++++++++++' + 'subscribe2Camera');

    var sub2Cam = {'function-value-request': 
            {$:{'subscribe': "true", 'response-level': 'ErrorOnly'}, 
                            device:{
                                    name: camera, 
                                    'function': {$:{'id': '1039'}},
                            }
            }};
    var xml = builder.buildObject(sub2Cam);
    console.log(sub2Cam);
    console.dir (xml);
    socket.write(xml);        


    var sub2Cam = {'function-value-request': 
            {$:{'subscribe': "true", 'response-level': 'ErrorOnly'}, 
                            device:{
                                    name: camera, 
                                    'function': {$:{'id': '8392'}},
                            }
            }};
    var xml = builder.buildObject(sub2Cam);
    console.dir (xml);
    socket.write(xml);        


    var sub2Cam = {'function-value-request': 
            {$:{'subscribe': "true", 'response-level': 'ErrorOnly'}, 
                            device:{
                                    name: camera, 
                                    'function': {$:{'id': '1030'}},
                            }
            }};
    var xml = builder.buildObject(sub2Cam);
    console.dir (xml);
    socket.write(xml);        

    console.log('+++++++++++++++++++' + 'subscribe2Camera');
}



// Functions to handle socket events
function connect() {
    console.log('Connecting to Ikegami Gateway ' + host + ':' + iupControlPort + '...');
    socket.connect(iupControlPort, host);

    return myEmitter;
}

socket.on('connect', function () {
    socket.write('auth???');          // Authenticate the connection
    console.log('Ikegami connected!');
});
socket.on('end', function () {
    console.log('end');
});
socket.on('timeout', function () {
    console.log('Ikegami timeout');
});
socket.on('drain', function () {
    console.log('drain');
});
socket.on('error', function () {
    console.log('error');
    connect();
});
socket.on('close', function () {
    console.log('close');
});



socket.on('data', function(data) {

    console.log('\n******************************\nRaw from Ikegami: \n' + data);            

    inBuf += data;  // keep buffering ...
    var idx;
                                                                // Look for start of Header 0x0F20
    if ((idx=inBuf16.indexOf(swap16(0x0F20), 0)) > 0){           // FF over garbage to first Header
        inBuf16 = inBuf16.slice(idx);
    }

    while (inBuf.length > 24){                                  // More than a header!
        msgLen = swap16(inBuf16[11]);                           // 2 byte message length

        if (inBuf.length >= 24 + msgLen){                       // We have a full message or more !
            message = inBuf.slice(0, 24 + msgLen -1);           // Copy message from buffer
            inBuf = inBuf.slice(24 + msgLen -1);                // Delete message from buffer
                        // Process message!

            var message16 = new Uint16Array(message);       // Create 2 byte uint16 view

            switch (swap16(message16[9])){           // Offset 18 (9 in Uint16) is "Command ID"

                                // DEVICE INFORMATION
                case 0x0200:    // Answer
                break;
                case 0x0300:    // Notify
                break;
                                // SERVICE INFORMATION (CODE)
                case 0x0210:    // Answer
                break;
                                // SERVICE INFORMATION (SUB CODE)
                case 0x0211:    // Answer
                break;
                                // SERVICE INFORMATION (DATA)
                case 0x0212:    // Answer
                break;
                                // QUERY PARAMETER
                case 0x0220:    // Answer
                break;
                                // CHANGE PARAMETER
                case 0x0221:    // Answer
                break;
                                // UPDATE PARAMETER
                case 0x0322:    // Notify
                break;
                                // ORDER ACTION
                case 0x0230:    // Answer
                    console.log('Got Order Action Answer')
                    console.dir(message16)
                break;
                case 0x0230:    // Notify
                break;

            }
        }
    }    
   
});



connect();
