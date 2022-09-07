socketlib = require('net');
const EventEmitter = require('events');

class Skaarhoj extends EventEmitter{

    socket = socketlib.Socket();

    constructor(host) {
        super();

        let myHost = host;
        let port = 9923;
        let self = this;        // set target or our "emit's"


        console.log('Connecting to Skaarhoj ' + host + ':' + port + '...');
        this.socket.connect(port, host);

        this.socket.on('connect', function () {
            console.log('skaarhoj connected!');
            self.emit('connect');
        });
        this.socket.on('end', function () {
            console.log('end');
            self.emit('end');
        });
        this.socket.on('timeout', function () {
            console.log('skaarhoj timeout');
            self.emit('timeout');
        });
        this.socket.on('drain', function () {
            console.log('drain');
            self.emit('drain');
        });
        this.socket.on('error', function () {
            console.log('error');
            self.emit('error');
            console.log('ReConnecting to Skaarhoj ' + host + ':' + port + '...');
            socket.connect(port, host);
        });
        this.socket.on('close', function () {
            console.log('close');
            self.emit('close');
        });


        this.socket.on('data', function(data) {

            if (data.includes('Down')){

                var button = data.toString().split('\n')[0].split('.')[0].split('#')[1];
                var value = data.toString().split('\n')[0].split(':')[1];

                self.emit('button', parseInt(button), 'Down');
            }
            else if (data.includes('Up')){

                var button = data.toString().split('\n')[0].split('.')[0].split('#')[1];
                var value = data.toString().split('\n')[0].split(':')[1];

                self.emit('button', parseInt(button), 'Up');
            }
            else if (data.includes('Abs')){

                var slider = data.toString().split('=')[0].split('#')[1];
                var position = data.toString().split('\n')[0].split(':')[1];

                self.emit('slider', parseInt(slider), parseInt(position));
            }
            else if (data.includes('Enc')){

                var dial = data.toString().split('=')[0].split('#')[1];
                var movement = data.toString().split('\n')[0].split(':')[1];

        //        console.log('dial', parseInt(dial), parseInt(movement));
                self.emit('dial', parseInt(dial), parseInt(movement));
            }
        });
    }


    hwcColor(button, color)
    {
        var str = 'HWC#' +button +'=' +color +'\n'; 
        // console.log('hwcColor()' +str);
        this.socket.write(str); 
    }

    hwcLabel(button, label)
    {
        var str = 'HWCt#' +button +'=|||||' +label +'\n';
        // console.log('hwcLabel()' +str);
        this.socket.write(str);
    }

    moveSlider(slider, position)
    {
        var str = 'HWCx#' +slider +'=' +(parseInt(position)+4096) +'\n';
        // console.log('moveSlider()' +str);
        this.socket.write(str);
    }

}

module.exports = Skaarhoj;