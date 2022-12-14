
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


var seqNum = 10000;

function pp16(arr, num)
{
    console.log('....................... ' + pp16.caller.name +'()');
    for (i=0; i<num; i++)
        console.log(i + '\t0x' +swap16(arr[i]).toString(16) +'\t' +swap16(arr[i])); 
}

function ikegamiHeader (camera, command, msgLen)
{
                                           // HEADER
    outBuf16[0] = swap16(0x0F10);       // Protocol Type
    outBuf16[1] = swap16(0x0100);       // Protocol Version
    outBuf16[3] = swap16(0x0000);       // 1/2 or Reserved
    outBuf16[4] = swap16(0x0000);       // 1/2 ...
    outBuf16[5] = swap16(0x0001);       // Device Type 0x0001=Camera Head
    outBuf16[6] = swap16(0x0100);       // Group ID
    outBuf16[7] = swap16(camera);       // Device ID
    outBuf16[8] = swap16(0x0100);       // SubDevice ID
    outBuf16[9] = swap16(++seqNum);     // Seq num to be echoed back by Ikegami
    outBuf16[10] = swap16(command);     // Command ID  0x0130=Order Action
    outBuf16[11] = swap16(msgLen);      // Message length 
}


function subscribe2Camera(camera)
{
    ikegamiHeader (camera, 0x0100, 6);  // 0x0100=Device Information

    outBuf16[12] = swap16(0x0130);      // Service Code  0x0130=Variable Control / Minimum Value=-2048, Maximum Value=2047
    outBuf16[13] = swap16(0x80B2);      // Service Sub Code  0x80B2=Iris
    outBuf16[14] = swap16(value);       // Data

    pp16(outBuf16, 15);
    //socket.write(outBuf16);     
}

function sendIrisValue(camera, relative, value)
{
    ikegamiHeader (camera, 0x0130, 6);  // 0x0130=Order Action

    outBuf16[12] = swap16(0x0130);      // Service Code  0x0130=Variable Control / Minimum Value=-2048, Maximum Value=2047
    outBuf16[13] = swap16(0x80B2);      // Service Sub Code  0x80B2=Iris
    outBuf16[14] = swap16(value);       // Data

    pp16(outBuf16, 15);
    //socket.write(outBuf16);        
}

function sendPresetRecall(camera, value)
{
    ikegamiHeader (camera, 0x0130, 6);  // 0x0130=Order Action

    outBuf16[12] = swap16(0x0330);      // Service Code  0x0330=Recall Preset File
    outBuf16[13] = swap16(value+9);     // Service Sub Code  0x0010, 0x0011, 0x0012, ox0013
    outBuf16[14] = swap16(0x0001);      // 0x0001 = Start

    pp16(outBuf16, 15);
    //socket.write(outBuf16);  
}

function sendGainValue(camera, relative, value)
{
    ikegamiHeader (camera, 0x0130, 6);  // 0x0130=Order Action

    outBuf16[12] = swap16(0x0130);      // Service Code  0x0130=Variable Control / Minimum Value=-2048, Maximum Value=2047
    outBuf16[13] = swap16(0x8060);      // Service Sub Code  0x8060=Step Gain
    outBuf16[14] = swap16(value);       // Data

            //    0x0020 -6 dB
            //    0x0021 -3 dB
            //    0x0022  0 dB
            //    0x0023  3 dB
            //    0x0024  6 dB
            //    0x0025  9 dB
            //    0x0026 12 dB
            //    0x0027 18 dB
            //    0x0028 24 dB
            //    0x0029 30 dB
            //    0x002A 36 dB
            //    0x002B 42 dB
            //    0x002C 48 dB
            //    0x002D 54 dB

    pp16(outBuf16, 15);
    //socket.write(outBuf16);        
}

function sendNDFilterValue(camera, relative, value)
{
    ikegamiHeader (camera, 0x0130, 6);  // 0x0130=Order Action

    outBuf16[12] = swap16(0x806A);      // Service Code  0x806A=ND Filter
    outBuf16[13] = swap16(value+9);     // Service Sub Code  0x0010, 0x0011, 0x0012, 0x0013, 0x0014
    outBuf16[14] = swap16(0x0001);      // 0x0001 = Start

    pp16(outBuf16, 15);
    //socket.write(outBuf16);  

}



// Functions to handle socket events
function connect() {
    console.log('Connecting to Ikegami Gateway ' + host + ':' + iupControlPort + '...');
    socket.connect(iupControlPort, host);

    return myEmitter;
}

socket.on('connect', function () {
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
                    for (i=0; i<message16.length; i++)
                        console.log(swap16(outBuf16[i]));
                break;
                case 0x0230:    // Notify
                break;

            }
        }
    }    
   
});


connect();
sendIrisValue(6, 'true', 40);
sendIrisValue(10, 'true', 80);

sendIrisValue(2, 'true', -40);
sendIrisValue(3, 'true', -1);

    // console.dir((swap16(outBuf16[14]) << 16) >> 16);     // Just testing signed int encoding :)

