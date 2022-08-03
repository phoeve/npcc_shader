socketlib = require('net');
var socket = socketlib.Socket();

const EventEmitter = require('events');
class MyEmitter extends EventEmitter {}
const myEmitter = new MyEmitter();

exports.buttonColor = buttonColor;
exports.buttonLabel = buttonLabel;
exports.moveSlider = moveSlider;
exports.connect = connect;

var ipAddress = '';
const port = 9923;

function buttonColor(button, color)
{
    var str = 'HWC#' +button +'=' +color +'\n'; 
    console.log('buttonColor()' +str);
    socket.write(str); 
}

function buttonLabel(button, label)
{
    var str = 'HWCt#' +button +'=|||||' +label +'\n';
    console.log('buttonLabel()' +str);
    socket.write(str);
}

function moveSlider(slider, position)
{
    var str = 'HWCx#' +slider +'=' +(parseInt(position)+4096) +'\n';
    console.log('moveSlider()' +str);
    socket.write(str);
}

// Functions to handle socket events
function connect(host) {
    
    if (ipAddress == '')
        ipAddress = host;
    console.log('Connecting to Skaarhoj ' + ipAddress + ':' + port + '...');
    socket.connect(port, ipAddress);

    return myEmitter;
}

socket.on('connect', function () {
    console.log('skaarhoj connected!');

});
socket.on('end', function () {
    console.log('end');
});
socket.on('timeout', function () {
    console.log('skaarhoj timeout');
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

    if (data.includes('Down')){

        var button = data.toString().split('\n')[0].split('.')[0].split('#')[1];
        var value = data.toString().split('\n')[0].split(':')[1];

        myEmitter.emit('button', parseInt(button), 'Down');

    }else if (data.includes('Abs')){

        var slider = data.toString().split('=')[0].split('#')[1];
        var position = data.toString().split('\n')[0].split(':')[1];

        myEmitter.emit('slider', parseInt(slider), parseInt(position));
    }
    else if (data.includes('Enc')){

        var dial = data.toString().split('=')[0].split('#')[1];
        var movement = data.toString().split('\n')[0].split(':')[1];

//        console.log('dial', parseInt(dial), parseInt(movement));
        myEmitter.emit('dial', parseInt(dial), parseInt(movement));
    }
});

