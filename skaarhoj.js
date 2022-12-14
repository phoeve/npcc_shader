socketlib = require('net');
const EventEmitter = require('events');

class Skaarhoj extends EventEmitter{

    socket = socketlib.Socket();

    constructor(host) {
        super();

        let myHost = host;
        let port = 9923;
        let self = this;        // set target for our "emit's"


        console.log('Connecting to Skaarhoj ' + host + ':' + port + '...');
        this.socket.connect(port, host);

        this.socket.on('connect', function () {
            console.log('skaarhoj connected!');
            self.clear();
            self.socket.write('SleepTimer=0\n');
            self.socket.write('Webserver=1\n');
            self.socket.write('WakeUp!\n');
            self.socket.write('PanelBrightness=6,6\n');     // Make sure LED's don't go dimm on sleep, etc.
            self.emit('connect');
        });
        this.socket.on('end', function () {
            console.log('end');
            self.emit('error');
        });
        this.socket.on('timeout', function () {
            console.log('skaarhoj timeout');
            self.emit('error');
        });
        this.socket.on('drain', function () {
            console.log('drain');
            self.emit('error');
        });
        this.socket.on('error', function () {
            console.log('error');
            self.emit('error');
            // console.log('ReConnecting to Skaarhoj ' + host + ':' + port + '...');
            // socket.connect(port, host);
        });
        this.socket.on('close', function () {
            console.log('close');
            self.emit('error');
        });


        this.socket.on('data', function(data) {

            // console.log('<== Skaarhoj sent');
            // console.dir(data);

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
            else if (data.includes('Press')){
                var dial = data.toString().split('\n')[0].split('.')[0].split('#')[1];
                self.emit('press', parseInt(dial));
            }
        });
    }

    clear()
    {
        this.socket.write('Clear\n');
    }

    hwcMode(button, mode)
    {
        var str = 'HWC#' +button +'=' +mode +'\n'; 
        // console.log('hwcColor()' +str);
        this.socket.write(str); 
    }


    hwcColor(button, color)
    {
        var str = 'HWCc#' +button +'=' +color +'\n' +'HWC#' +button +'=4\n'; 
        // console.log('hwcColor()' +str);
        this.socket.write(str); 
    }


                        // The three commands below
                        // HWC#38=4
                        // HWCc#38=137
                        // HWCt#38=9999|2|40|Value


// HWCt#9=|||Sensitivity|1|50%

    hwcLabel(button, label, value)
    {
        // var str = 'HWCt#' +button +'=|||' +label;

        // if (value == undefined || isNaN(value))
        if (value == undefined)
            var str = 'HWCt#' +button +'=|||||' +label +'||||||||||||\n';
        else
            var str = 'HWCt#' +button +'=|||' +label +'||' +value +'||||||||||||\n';


        // var str = 'HWCt#' +button +'=|||||' +label +'||||||||||0||\n';
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