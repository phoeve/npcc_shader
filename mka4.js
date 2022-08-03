var buttonMap=[];
var sliderMap=[];
var cameraMap=[];
var buttonLive = 0;

birch = require('./birch.js');
console.log('Calling birch.init()');
birchEmitter = birch.init();


birchEmitter.on('initialized', () => {
    console.log('birchEmitter.on(initialized)');
    serverInit();
});


grassValley = require('./grass.js');
grassValleyEmitter = grassValley.connect();


skaarhoj = require('./skaarhoj.js');
skaarhojEmitter = skaarhoj.connect('10.1.45.58');
//skaarhojEmitter = skaarhoj.connect('10.1.43.37');
//skaarhojEmitter = skaarhoj.connect('192.168.33.88');  // Peter @ home

function intervalFunc()
{
    console.log('ACK Skaarhoj');
    skaarhoj.buttonColor(0, 0);  // Keep Skaarhoj form going to sleep
}

setInterval(intervalFunc, 1000*60*15);    // every 15 min

skaarhojEmitter.on('slider', (slider, position) => {

    skaarhoj.moveSlider(slider,position);   // Motrorized sliders need "moved" to the new position (wierd)

    if (!buttonLive)
        return;

    const scale = 3;

    console.log('skaarhojEmitter.on ' +slider +' ' +position);

    if (!sliderMap[slider]){
        sliderMap[slider] = new Map();
        sliderMap[slider].position = 0;
        sliderMap[slider].timestamp = 0;
    }
    else{
        console.dir((position -sliderMap[slider].position) *scale);

        grassValley.sendIrisValue(buttonMap[buttonLive].camera, 'true', (position - sliderMap[slider].position) * scale );   
    }

                            // Save slider position and timestamp
    console.log('slider: old_position: ' +cameraMap[buttonMap[buttonLive].camera].sliderPosition +' new_position: ' +position);
    sliderMap[slider].position = position;
    sliderMap[slider].timestamp = Date.now();
    cameraMap[buttonMap[buttonLive].camera].sliderPosition = position;  // Allowws us to position slider when this camera is selected
    cameraMap[buttonMap[buttonLive].camera].sliderTimestamp = Date.now();  // Allowws us to position slider when this camera is selected

});

skaarhojEmitter.on('dial', (dial, movement) => {

    const fineScale = 10;
    const coarseScale = 100;

    if (!buttonLive)    // No camera selected ?
        return;

    switch(dial){

//        case '9':                                // Iris dial
        case '53':                                // Iris dial
            grassValley.sendIrisValue(buttonMap[buttonLive].camera, 'true', movement * fineScale);   

                        // Move slider correspondingly
            break;

//        case '10':                                // coarse Iris dial
        case '54':                                // coarse Iris dial
            grassValley.sendIrisValue(buttonMap[buttonLive].camera, 'true', movement * coarseScale);   

                        // Move slider correspondingly
            break;

//        case '11':                                // Gain dial
        case '55':                                // Gain dial
            grassValley.sendGainValue(buttonMap[buttonLive].camera, 'true', movement);   
            break;

//        case '12':                                // ND filter dial
        case '56':                                // ND filter dial
            console.log('ndFilter');
            console.log(cameraMap[buttonMap[buttonLive].camera].ndFilter);

            cameraMap[buttonMap[buttonLive].camera].ndFilter = cameraMap[buttonMap[buttonLive].camera].ndFilter +parseInt(movement);
            if (cameraMap[buttonMap[buttonLive].camera].ndFilter < 1)
                cameraMap[buttonMap[buttonLive].camera].ndFilter = 4;
            else if (cameraMap[buttonMap[buttonLive].camera].ndFilter > 4)
                    cameraMap[buttonMap[buttonLive].camera].ndFilter = 1;


            console.log(cameraMap[buttonMap[buttonLive].camera].ndFilter);
            grassValley.sendNDFilterValue(buttonMap[buttonLive].camera, 'false', cameraMap[buttonMap[buttonLive].camera].ndFilter);
            break;

    }
});

skaarhojEmitter.on('button', (button, position) => {
  if (buttonMap[button]){

            // Send GV OCP camera name to shade
        grassValley.ocpSetCamera(buttonMap[button].camera);

            // Send birch request route camera to shader monitor
        birch.take(cameraMap[buttonMap[button].camera].birchObj, birch.destinations[0]);

            // Set button colors   red=2, green=3
        initButtonsLabels();

        skaarhoj.buttonColor(button, '2');          // set "pushed" to red
        skaarhoj.moveSlider(13,cameraMap[buttonMap[button].camera].sliderPosition);

        buttonLive = button;            // save the live button

        grassValley.subscribe2Camera(buttonMap[button].camera);        // Subscribe to camera changes in iris, gain, nd, ...
    }
    else
    {
        console.dir(button);
        switch (button){          
                                // Recall Single Camera Preset
            case 49:
                grassValley.sendPresetRecall(buttonMap[buttonLive].camera, 2);      // 2 => File 1
                break;
            case 50:
                grassValley.sendPresetRecall(buttonMap[buttonLive].camera, 3);      // 3 => File 2
                break;
            case 51:
                grassValley.sendPresetRecall(buttonMap[buttonLive].camera, 4);      // 4 => File 3
                break;
            case 52:
                grassValley.sendPresetRecall(buttonMap[buttonLive].camera, 5);      // 5 => File 4
                break;

                                // Recall All CamerasPreset
            case 33:
                cameraMap.forEach(function(obj){
                    grassValley.sendPresetRecall(obj.name, 2);   // 2 => File 1
                });
                break;
            case 34:
                cameraMap.forEach(function(obj){
                    grassValley.sendPresetRecall(obj.name, 3);   // 3 => File 2
                });
                break;
            case 35:
                cameraMap.forEach(function(obj){
                    grassValley.sendPresetRecall(obj.name, 4);   // 4 => File 3
                });
                break;
            case 36:
                cameraMap.forEach(function(obj){
                    grassValley.sendPresetRecall(obj.name, 5);   // 5 => File 4
                });
                break;

            default:
                console.log('Unmapped button pressed: ' +button);
        }
    }
});

grassValleyEmitter.on('iris', (camera, value, position) => {
    console.log('iris camera: ' +camera +' fstop: ' +value);


    if (buttonLive){
        if (camera == buttonMap[buttonLive].camera){      // new fstop for live camera?
            skaarhoj.buttonLabel(9, 'F ' +value); //fine
//            skaarhoj.buttonLabel(53, 'F ' +value); //fine

        console.dir(sliderMap[13]);
        if (!sliderMap[13] || (Date.now() - sliderMap[13].timestamp > 3000) )  // Only move slider if operator hasn't moved it in 3 sec.
            skaarhoj.moveSlider(13, position);
        }
    }
});

grassValleyEmitter.on('gain', (camera, value) => {
    console.log('gain camera: ' +camera +' gain: ' +value);


    skaarhoj.buttonLabel(55, 'Gain ' +value);
});

grassValleyEmitter.on('ndFilter', (camera, value) => {
    console.log('ndFilter camera: ' +camera +' ND Filter: ' +value);

    cameraMap[camera].ndFilter = parseInt(value);

    skaarhoj.buttonLabel(56, 'ND ' +parseInt(value));
});





function serverInit()
{

    var button;
    var camera;

    console.dir(birch.sources);
    
    for(i=0; i<birch.sources.length; i++){

                            // Initial Camera to Button Mapping - Naming driven by Birch
                            //
        switch (birch.sources[i].name){
            case 'NP CAM 1':
                button=1;
                camera=1;
                break;
            case 'NP CAM 2':
                button=2;
                camera=2;
                break;
            case 'NP CAM 3':
                button=3;
                camera=3;
                break;
            case 'NP CAM 6':
                button=4;
                camera=6;
                break;
            case 'NP CAM 7':
                button=5;
                camera=7;
                break;
            case 'NP CAM 8':
                button=6;
                camera=8;
                break;
            case 'NP CAM 10':
                button=7;
                camera=10;
                break;
        }

        cameraMap[camera] = new Object();
        cameraMap[camera].button = button;
        cameraMap[camera].birchObj = birch.sources[i];
        cameraMap[camera].ndFilter = 1;    // ND filters 1-4 on GrassValley

        buttonMap[button] = new Object();
        buttonMap[button].camera = camera;
        buttonMap[button].name = birch.sources[i].name;

        //grassValley.subscribe2Camera(camera);        // Subscribe to camera changes in iris, gain, nd, ...

    } // for loop

    console.dir(buttonMap);

    initButtonsLabels();

}

function initButtonsLabels()
{
    for(i=0;i<buttonMap.length;i++){
        if(buttonMap[i]){
            skaarhoj.buttonColor(i, '3');      // set all to green
            skaarhoj.buttonColor(i+6, '0');      // set flags to off
            skaarhoj.buttonLabel(i, buttonMap[i].name);
        }
    }
    skaarhoj.buttonLabel(54, 'Coarse');
    skaarhoj.buttonLabel(37, 'Recall ALL 1-4');
    skaarhoj.buttonLabel(44, 'Recall CAM 1-4');
}


birch.destinations = [
    {
      id: '71a043aa-0b22-4b90-8dfe-bb0d4d738a8c',
      index: 114,
      name: 'CR7 MON 3',
      xpoint: 'NP CAM 8',
      lock: false,
      history: [
        { xpoint: 'NP CAM 1', lastAssigned: '2021-08-30T20:23:53.307Z' },
        { xpoint: 'NP CAM 8', lastAssigned: '2021-08-30T17:47:50.710Z' }
      ],
      deviceId: 'd03180c8-c8d0-4952-84e6-cbea80bbc4f7',
      probeId: '2d932391-98c9-4c4a-8b47-e303f712063d',
      orgId: 'd3e4e035-99cb-44fe-98e3-3315ee511478'
    }
];

birch.sources = [
  {
    id: 'fd91aef1-d869-4b8d-a280-8008bb8874f1',
    index: 320,
    name: 'NP CAM 1',
    deviceId: 'd03180c8-c8d0-4952-84e6-cbea80bbc4f7',
    probeId: '2d932391-98c9-4c4a-8b47-e303f712063d',
    orgId: 'd3e4e035-99cb-44fe-98e3-3315ee511478'
  },
  {
    id: 'b53e25b3-ddae-40e2-aa07-098db9880624',
    index: 321,
    name: 'NP CAM 2',
    deviceId: 'd03180c8-c8d0-4952-84e6-cbea80bbc4f7',
    probeId: '2d932391-98c9-4c4a-8b47-e303f712063d',
    orgId: 'd3e4e035-99cb-44fe-98e3-3315ee511478'
  },
  {
    id: 'fcdb9807-6e57-4317-b322-396857659b77',
    index: 323,
    name: 'NP CAM 6',
    deviceId: 'd03180c8-c8d0-4952-84e6-cbea80bbc4f7',
    probeId: '2d932391-98c9-4c4a-8b47-e303f712063d',
    orgId: 'd3e4e035-99cb-44fe-98e3-3315ee511478'
  },
  {
    id: 'a48d3cdf-ca33-4d3b-b5dc-c767834731f1',
    index: 324,
    name: 'NP CAM 7',
    deviceId: 'd03180c8-c8d0-4952-84e6-cbea80bbc4f7',
    probeId: '2d932391-98c9-4c4a-8b47-e303f712063d',
    orgId: 'd3e4e035-99cb-44fe-98e3-3315ee511478'
  },
  {
    id: '4bba4e6c-ebd6-4794-be6b-24ce1e8a942a',
    index: 325,
    name: 'NP CAM 8',
    deviceId: 'd03180c8-c8d0-4952-84e6-cbea80bbc4f7',
    probeId: '2d932391-98c9-4c4a-8b47-e303f712063d',
    orgId: 'd3e4e035-99cb-44fe-98e3-3315ee511478'
  },
  {
    id: '577baa1f-37ca-498a-9a1b-80d72b31ef7f',
    index: 326,
    name: 'NP CAM 10',
    deviceId: 'd03180c8-c8d0-4952-84e6-cbea80bbc4f7',
    probeId: '2d932391-98c9-4c4a-8b47-e303f712063d',
    orgId: 'd3e4e035-99cb-44fe-98e3-3315ee511478'
  }
];

console.dir(birch.sources);

serverInit();
