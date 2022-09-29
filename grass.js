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

exports.sendFunctionValue = sendFunctionValue;

exports.ocpSetCamera = ocpSetCamera;
exports.subscribe2Camera = subscribe2Camera;
exports.sendPresetRecall = sendPresetRecall;
exports.connect = connect;


function ocpSetCamera(camera){
    var temp;

    temp = {'function-value-change': {device: {deviceid: '045NRN', 'function': {$:{'id': '8466'}, value: camera}}}};

    var xml = builder.buildObject(temp);
    socket.write(xml);        
}


// function sendIrisValue(camera, relative, value){

//     var setJson = {"function-value-change":{"$":{"response-level":"ErrorOnly"},"device":[{"name":[camera],"function":[{"$":{"id":"542"},"value":[{"_":value,"$":{"relative":relative}}]}]}]}};

//     var xml = builder.buildObject(setJson);
//     socket.write(xml);        
// }

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

    console.log ('send GV ==> function: ', 4098, 'camera: ', camera, 'value: ', value);

    var setJson = {"function-value-change":{"$":{"response-level":"ErrorOnly"},"device":[{"name":[camera],"function":[{"$":{"id":"4098"},"value":[{"_":value,"$":{"relative":'false'}}]}]}]}};

    var xml = builder.buildObject(setJson);
    socket.write(xml);        
}

            //
            //
function sendFunctionValue(func, camera, relative, value)
{
    console.log ('send GV ==> function: ', func, 'camera: ', camera, 'value: ', value);
    var setJson = {"function-value-change":{"$":{"response-level":"ErrorOnly"},"device":[{"name":[camera],"function":[{"$":{"id":func},"value":[{"_":value,"$":{"relative":relative}}]}]}]}};

    // console.log(setJson);

    var xml = builder.buildObject(setJson);
    // console.log(xml);

    socket.write(xml);  
}

var subCodes = [524, 523, 615, 513, 514, 515, 516, 517, 518, 584, 583, 586, 585, 608,
                969, 519, 520, 521, 524, 533, 534, 535, 536, 537, 654, 538, 540, 776, 969, 
                1025, 1026,1027, 1039, 1041, 1042, 1056, 8392, 1030, 1809,  
                8306, 8321, 8200, 8369, 8378, 8385, 8386, 8387, 8388, 8901, 8392,
];


var unSubCodes = [8895, 8894, 739,];

function subscribe2Camera(camera){

    var sub2Cam;
    var xml;

    console.log('GV subscribe2Camera:', camera);

    subCodes.forEach(function(code){

                // Subscribe to each that we want to get on connect
        sub2Cam = {'function-value-request': 
                {$:{'subscribe': "true", 'response-level': 'ErrorOnly'}, 
                                device:{
                                        name: camera, 
                                        'function': {$:{'id': code}},
                                }
                }};
        xml = builder.buildObject(sub2Cam);
        socket.write(xml);    
    });  

                // Subscribe to all !!   This only sends on changes in values
    sub2Cam = {'function-value-request': 
            {$:{'subscribe': "true", 'response-level': 'ErrorOnly'}, 
                            device:{
                                    name: camera, 
                            }
            }};
    xml = builder.buildObject(sub2Cam);
    socket.write(xml);    


    unSubCodes.forEach(function(code){

                // Subscribe to each that we want to get on connect
        sub2Cam = {'function-value-request': 
                {$:{'subscribe': "false", 'response-level': 'ErrorOnly'}, 
                                device:{
                                        name: camera, 
                                        'function': {$:{'id': code}},
                                }
                }};
        xml = builder.buildObject(sub2Cam);
        socket.write(xml);    
    });

    // console.log('+++++++++++++++++++' + 'subscribe2Camera');


    // var sub2Cam = {'function-value-request': 
    //         {$:{'subscribe': "true", 'response-level': 'ErrorOnly'}, 
    //                         device:{
    //                                 name: camera, 
    //                                 'function': {$:{'id': '8392'}},
    //                         }
    //         }};
    // var xml = builder.buildObject(sub2Cam);
    // console.dir (xml);
    // socket.write(xml);        


    // var sub2Cam = {'function-value-request': 
    //         {$:{'subscribe': "true", 'response-level': 'ErrorOnly'}, 
    //                         device:{
    //                                 name: camera, 
    //                                 'function': {$:{'id': '1030'}},
    //                         }
    //         }};
    // var xml = builder.buildObject(sub2Cam);
    // console.dir (xml);
    // socket.write(xml);  

    // var sub2Cam = {'function-value-request': 
    //         {$:{'subscribe': "true", 'response-level': 'ErrorOnly'}, 
    //                         device:{
    //                                 name: camera, 
    //                                 // 'function': {$:{'id': '524'}},     // Skin Detail
    //                         }
    //         }};
    // var xml = builder.buildObject(sub2Cam);
    // console.dir (xml);
    // socket.write(xml);       

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
    connect();
});
socket.on('close', function () {
    console.log('close');
});



socket.on('data', function(data) {
    
    const splitStr = '</function-value-indication>\n';    // Closing tag indicator
    var arr = [];

    // console.log('\n******************************\nRaw from GV: \n' + data);
        
    data = data.toString();
    arr=data.split(splitStr);    // If multiple responses arrive, let's split them up

    // console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@');
    // console.dir (arr);

    arr.forEach(function(xmlBuf){

        // console.log('[][]][][][][][][][][[][][][][][][][][][][][][][][][');
        // console.dir(xmlBuf);

        if (xmlBuf == ''){           // End of concatenated messages?
            // console.log('skipping null xmlBuf from GV: ', xmlBuf);
            return;
        }

        var parser = new xml2js.Parser();

        try {

        parser.parseString(xmlBuf +splitStr, function (err, result) {       // Replace split string

            if (err){
                console.log('skipping xmlBuf b/c of error: ', err, xmlBuf);
                return;     // Just skip this xml message
            }

            switch (Object.keys(result)[0]){
                
                case 'request-response':
                case 'application-authentication-indication':
                case 'function-information-indication':
                    console.log('GV sent <== ', result[Object.keys(result)[0]]['$'].message, ' ', result[Object.keys(result)[0]]['$'].result);
                    // console.dir(result);
                    // console.dir(Object.keys(result);

                    break;

                case 'function-value-indication':

                    // console.log('# of functions: ' +result['function-value-indication'].device[0].function.length)

                    switch(result['function-value-indication'].device[0].function[0]['$'].id){

                        case '1039':        // Iris special processing
                            var fstop = 
                                MapIris2Fstop( parseInt(result['function-value-indication'].device[0].function[0]['value']));
                            var position = 
                                MapIris2FstopPosition( parseInt(result['function-value-indication'].device[0].function[0]['value']));
                            myEmitter.emit('func', result['function-value-indication'].device[0].function[0]['$'].id,
                                                    result['function-value-indication'].device[0].name, fstop, position);
                        break;

                        default:
                            var val = 
                                result['function-value-indication'].device[0].function[0]['value'];
                            //myEmitter.emit('gain', result['function-value-indication'].device[0].name, gain);
                            myEmitter.emit('func', result['function-value-indication'].device[0].function[0]['$'].id,
                                                        result['function-value-indication'].device[0].name, val);
                        break;
                    }

                break;
    
                default:
                    console.log('Unknown Message Type ' +Object.keys(result)[0]);
        
            }
        
        });
        }                   // End try
        catch (err) {
          // statements to handle any exceptions
          console.log('vvv parser threw error vvv');    // pass exception object to error handler
          console.dir(err);
          console.log('^^^ parser threw error ^^^');
        }
    });
    
});




let table = [
      {34: '---'},
      {31: '25.'},
      {51: '22.'},
      {30: '21.'},
      {50: '19.'},
      {49: '17.'},
      {29: '16.'},
      {28: '15.'},
      {48: '13.'},
      {27: '12.'},
      {26: '11.'},
      {25: '10.'},
      {47: '9.5'},
      {24: '8.7'},
      {23: '8.0'},
      {22: '7.3'},
      {46: '6.7'},
      {21: '6.2'},
      {20: '5.6'},
      {19: '5.2'},
      {45: '4.8'},
      {18: '4.4'},
      {17: '4.0'},
      {16: '3.7'},
      {44: '3.4'},
      {15: '3.1'},
      {14: '2.8'},
      {13: '2.6'},
      {43: '2.4'},
      {12: '2.2'},
      {11: '2.0'},
      {9:  '1.8'},
      {8:  '1.7'},
      {6:  '1.5'},
      {5:  '1.4'} ];

function MapIris2Fstop(value){


    for (i=0;i<table.length;i++)
        if (value == Object.keys(table[i]))
            return table[i][value];

    return ('undef');
}

function MapIris2FstopPosition(value){
    for (i=0;i<table.length;i++)
        if (value == Object.keys(table[i]))
            return parseInt((i+1)/(table.length +1) *1000);
}
