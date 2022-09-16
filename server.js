
                    // Common to all Screens (Shift key overlays current screen)

const x256ToPercent = 100/255;
const x4096ToPercent = 100/4095;


const commonLayout = {
        // 'D001':    {dial:  9, display:  9, label: ' ',  color:129},
        // 'D002':    {dial: 10, display: 10, label: ' ',  color:129},     // Clear dial attributes
        // 'D003':    {dial: 11, display: 11, label: ' ',  color:129},
        // 'D004':    {dial: 12, display: 12, label: ' ',  color:129},
        // 'D005':    {dial: 13, display: 13, label: ' ',  color:129},
        // 'D006':    {dial: 14, display: 14, label: ' ',  color:129},     
        // 'D007':    {dial: 15, display: 15, label: ' ',  color:129},
        // 'D008':    {dial: 16, display: 16, label: ' ',  color:129},

        'C001': {button: 17, label: 'Home',        color:129},
        'C002': {button: 18, label: 'Gain/Gamma',  color:129},
        'C003': {button: 19, label: 'Flare/Ped',   color:129},
        'C004': {button: 20, label: 'Matrix',      color:129},
        'C005': {button: 21, label: 'Color/Corr',  color:129},
        'C006': {button: 22, label: 'HDR',         color:129},
        'C007': {button: 25, label: 'Menu',        color:129},
        'C008': {button: 26, label: ' ',           color:129},      // Turn off ABB
        'C009': {button:  1, color:129},                            // Turn sub menu button lights off
        'C010': {button:  2, color:129}, 
        'C011': {button: 38, color:129}, 
        'L047': {led:    17,        color:143},

        1039:   {dial: 56, display: 29, label: 'F ',      func: 542,    scale: 7}, 
        // 540:    {dial: 55, display: 28, label: 'PED ',      func: 540,    scale: 7, scaling: x4096ToPercent}, 
        8392:   {dial: 31, display: 31, label: 'Gain ',   color:130,    func: 8392},
        1027:   {dial: 55, display: 33, label: 'Knee ',      func: 1027}, 
        9999:   {dial: 55, display: 32, label: 'DTL ',      func: 9999}, 
        1809:   {led:  30, 0: 0, 1: 2},                         // Tally  1=red=132  0=black=129
}

const rcpLayouts = {

    17:             // Home               
    {        
        'L001': {button: 17, label: 'Home', color:130},      // Light up Menu button
        8369:   {dial:  9, display:  9, label: 'Dtl ',    color:130,  scaling: x256ToPercent,  func: 8369},
        1025:   {dial: 10, display: 10, label: 'Skn ',    color:130,    func: 762},
        615:    {dial: 11, display: 11, label: 'Sat ',    color:130,    func: 615},
        608:    {dial: 12, display: 12, label: 'Temp ',   color:130,    func: 608},
        'D005':    {dial: 13, display: 13, label: ' ',  color:129},
        8321:   {dial: 14, display: 14, label: 'Sens ',   color:130,    func: 8321},
        1030:   {dial: 15, display: 15, label: 'ND ',     color:130,    relative:false, range:4,    func: 1030},
        8200:   {dial: 16, display: 16, label: 'Scene ',  color:130,    func: 4098},
    },

    18:             // Gain/Gamma
    {
        'L001': {button: 18, color:130},       // Light up Menu button  
        1026:   {dial:  9, display: 9,  label: 'M ',  color:130,  scaling: x256ToPercent,  func: 1026},
        513:    {dial: 10, display: 10, label: 'R ',  color:132,  scaling: x256ToPercent,  func: 513},
        514:    {dial: 11, display: 11, label: 'G ',  color:143,  scaling: x256ToPercent,  func: 514},
        515:    {dial: 12, display: 12, label: 'B ',  color:138,  scaling: x256ToPercent,  func: 515},
        584:    {dial: 13, display: 13, label: 'M ',  color:130,  scaling: x256ToPercent,  func: 584},
        583:    {dial: 14, display: 14, label: 'R ',  color:132,  scaling: x256ToPercent,  func: 583},
        586:    {dial: 15, display: 15, label: 'G ',  color:143,  scaling: x256ToPercent,  func: 586},
        585:    {dial: 16, display: 16, label: 'B ',  color:138,  scaling: x256ToPercent,  func: 585},
    },

    19:             // Flare / PED
    {
        'L001': {button: 19, color:130},       // Light up Menu button 
        969:    {dial:  9, display:  9, label: 'Flare ',  color:130,   relative: false, boolean: true, func: 969},
        519:    {dial: 10, display: 10, label: 'R ',  color:132,   scaling: x256ToPercent,  func: 519},
        520:    {dial: 11, display: 11, label: 'G ',  color:143,   scaling: x256ToPercent,  func: 520},
        521:    {dial: 12, display: 12, label: 'B ',  color:138,   scaling: x256ToPercent,  func: 521},
        540:    {dial: 13, display: 13, label: 'M ',  color:130, scale: 7,  scaling: x4096ToPercent,  func: 540},
        516:    {dial: 14, display: 14, label: 'R ',  color:132,   scaling: x256ToPercent,  func: 516},     
        517:    {dial: 15, display: 15, label: 'G ',  color:143,   scaling: x256ToPercent,  func: 517},
        518:    {dial: 16, display: 16, label: 'B' ,  color:138,   scaling: x256ToPercent,  func: 518},
    },

    20:             // Matrix
    {
        'L001': {button: 20, color:130},       // Light up Menu button  
        533:    {dial:  9, display:  9, label: 'R-G ',  color:132,   func: 533},
        534:    {dial: 10, display: 10, label: 'R-B ',  color:132,   func: 534},
        535:    {dial: 11, display: 11, label: 'G-R ',  color:143,   func: 535},
        536:    {dial: 12, display: 12, label: 'G-B ',  color:143,   func: 536},
        537:    {dial: 13, display: 13, label: 'B-R ',  color:138,   func: 537},
        538:    {dial: 14, display: 14, label: 'B-G ',  color:138,   func: 538},  
        'D007':    {dial: 15, display: 15, label: ' ',  color:129},
        'D008':    {dial: 16, display: 16, label: ' ',  color:129},

    },

    21:             // Color / Correction
    {
        'L001': {button: 21, color:130},       // Light up Menu button  
        'B009': {button:  1, color:130},       // Light up sub screen "1" button   
        9999:    {dial:  9, display:  9, label: 'SAT ',     color:132,    func: 524},
        9998:    {dial: 10, display: 10, label: 'PHASE ',   color:132,      func: 524},
        9997:    {dial: 11, display: 11, label: 'SAT ',     color:133,    func: 524},
        9996:    {dial: 12, display: 12, label: 'PHASE ',   color:133,      func: 524}, 
        9995:    {dial: 13, display: 13, label: 'SAT ',     color:137,    func: 0},
        9994:    {dial: 14, display: 14, label: 'PHASE ',   color:137,      func: 524},
        9993:    {dial: 15, display: 15, label: 'SAT ',     color:143,     func: 524},
        9992:    {dial: 16, display: 16, label: 'PHASE ',   color:143,       func: 524},   

        'sub': {
            'B001': {button: 21, color:130},       // Light up Menu button 
            'B010': {button:  2, color:130},       // Light up sub screen "2" button  
            9999:    {dial:  9, display:  9, label: 'SAT ',    color:139,    func: 524},
            9998:    {dial: 10, display: 10, label: 'PHASE ',  color:139,     func: 524}, 
            'D003':    {dial: 11, display: 11, label: ' ',  color:129},
            'D004':    {dial: 12, display: 12, label: ' ',  color:129},     
            9997:    {dial: 13, display: 11, label: 'SAT ',    color:141,       func: 0},
            9996:    {dial: 14, display: 12, label: 'PHASE ',  color:141,    func: 524},
            'D007':    {dial: 15, display: 15, label: ' ',  color:129},
            'D008':    {dial: 16, display: 16, label: ' ',  color:129},


            'super': 21, 
        }
    },


    22:             // HDR
    {
        name: 'HDR',
        'B001': {button: 22, color:130},       // Light up Menu button  
        'B009': {button:  1, color:130},       // Light up sub screen "1" button   
        8392:    {dial:  9, display:  9, label: 'HDR Std ',     color:130,    func: 8392},
        8901:    {dial: 10, display: 10, label: 'HDR Out ',    color:130,    func: 8901},
        9997:    {dial: 11, display: 11, label: '% Hi ',        color:130,    func: 524},
        8385:    {dial: 12, display: 12, label: 'Pt Hi ',    color:130,    func: 8385}, 
        9994:    {dial: 14, display: 14, label: 'HDR Clip ',    color:130,    func: 524},
        'D005':    {dial: 13, display: 13, label: ' ',  color:129},
        9993:    {dial: 15, display: 15, label: '% Low ',       color:130,    func: 524},
        8386:    {dial: 16, display: 16, label: 'Pt Low ',   color:130,    func: 8386},

        'sub': {
            'B001': {button: 22, color:130},       // Light up Menu button  
            'B010': {button:  2, color:130},       // Light up sub screen "2" button  
            'D001':    {dial:  9, display:  9, label: ' ',  color:129},
            'D002':    {dial: 10, display: 10, label: ' ',  color:129},     // Clear dial attributes
            'D003':    {dial: 11, display: 11, label: ' ',  color:129},
            'D004':    {dial: 12, display: 12, label: ' ',  color:129},
            524:    {dial: 13, display: 13, label: 'SDR Level ',  color:130, func: 0},    
            572:    {dial: 14, display: 14, label: 'SDR Clip ',   color:130, func: 524}, 
            'D007':    {dial: 15, display: 15, label: ' ',  color:129},
            'D008':    {dial: 16, display: 16, label: ' ',  color:129},
   
            'super': 22,
        },
    },

    38:
    {
        name: 'Shift',
        'L001': {button: 17, label: 'S1', color:129},
        'L002': {button: 18, label: 'S2', color:129},
        'L003': {button: 19, label: 'S3', color:129},
        'L004': {button: 20, label: 'S4', color:129},
        'L005': {button: 21, label: 'S5', color:129},
        'L006': {button: 22, label: 'S6', color:129},
        'L007': {button: 25, label: 'AWB', color:129},
        'L008': {button: 26, label: 'ABB', color:129},
        'L011': {button: 38, color:130},                   // Light up Shift key

    },
};

grassValley = require('./grass.js');
grassValleyEmitter = grassValley.connect();


var f1Lay = {
    1039:       {dial: 53, display: 53, label: 'F ',     color:130, func: 542, scale: 10},      // Iris fine
    'L1039':    {dial: 54, display: 54, label: 'Coarse', color:130, func: 542, scale: 100 },     // Iris Coarse
    8392:       {dial: 55, display: 55, label: 'Gain ',  color:130, func: 8392},                // Gain
    1030:       {dial: 56, display: 56, label: 'ND ',    color:130, relative:false, range:4, func: 1030},

}


var buttonMap=[];  // Globals
var sliderMap=[];
var cameraMap=[];
var buttonLive = 0;

var RcpPageMap=[];

birch = require('./birch.js');
birchEmitter = birch.init();


birchEmitter.on('initialized', () => {
    // console.log('birchEmitter.on(initialized)');
    serverInit();
});


const Skaarhoj = require('./skaarhoj.js');
skaarhojF1 = new Skaarhoj('10.1.43.37');
skaarhojRCP = new Skaarhoj('10.1.45.54');

skaarhojF1.on('slider', (slider, position) => {

    if (!buttonLive)
        return;

    const scale = 2;

    if (!sliderMap[slider]){
        sliderMap[slider] = new Map();
        sliderMap[slider].position = 0;
        sliderMap[slider].timestamp = 0;
    }
    else{
        // console.dir(position -sliderMap[slider].position *scale);

        grassValley.sendIrisValue(buttonMap[buttonLive].camera, 'true', (position - sliderMap[slider].position) * scale );   
    }
                            // Save slider position and timestamp
    sliderMap[slider].position = position;
    cameraMap[buttonMap[liveButton].camera].sliderPosition = position;  // Allows us to position slider when this camera is selected
    cameraMap[buttonMap[liveButton].camera].sliderTimestamp = Date.now();  // Allows us to position slider when this camera is selected

});

                        //
                        //  Fusion 1
                        //

skaarhojF1.on('dial', (dial, movement) => {
    onDialFunction (f1Lay, dial, movement);
});


function onDialFunction(layout, dial, movement)
{
    if (!buttonLive)    // No camera selected ?
        return;

    Object.entries(layout).forEach(entry => {


        if (dial == entry[1].dial){

            if (entry[1].scale === undefined)
                mult = 1;
            else
                mult = entry[1].scale;

            if (entry[1].relative === false){           
                if (entry[1].boolean === true){
                    if (movement > 0)
                        grassValley.sendFunctionValue(entry[1].func, buttonMap[buttonLive].camera, 'false', '1');   
                    else
                        grassValley.sendFunctionValue(entry[1].func, buttonMap[buttonLive].camera, 'false', '0');   
                }
                                                            // Range of values like 1-4
                else if (grassValues[buttonMap[buttonLive].camera][entry[1].func] != undefined){
                    var newValue = parseInt(grassValues[buttonMap[buttonLive].camera][entry[1].func]) +movement;
                    if (newValue > entry[1].range)
                        newValue=1;
                    else if (newValue < 1)
                        newValue=entry[1].range;
                    // console.log('range', entry[1].func, buttonMap[buttonLive].camera, newValue);
                    grassValley.sendFunctionValue(entry[1].func, buttonMap[buttonLive].camera, 'true', newValue);   
                }
            }
            else{
                if (entry[1].func){
                    // console.log('abs', entry[1].func, buttonMap[buttonLive].camera, movement *mult);
                    grassValley.sendFunctionValue(entry[1].func, buttonMap[buttonLive].camera, 'true', movement *mult );   
                }
            }
        }
    });
}



const recallSinglePresetF1 = 49;
const recallAllPresetF1 = 28;
const rebootF1 = 18;

skaarhojF1.on('button', (pressed, position) => {

    if (position == 'Up')
        return;                 // F1 pabel doesn't care about the buttons' "Up" movement

    if (buttonMap[pressed]){      // Camera select button pressed ?

        buttonLive = pressed;            // save the live button

        resetButtonsNLabels(); 

            // Send GV OCP camera name to shade
        // console.log('GV OCP ' +buttonMap[pressed].camera);
        grassValley.ocpSetCamera(buttonMap[pressed].camera);

            // Send birch request route camera to shader monitor
        birch.take(cameraMap[buttonMap[pressed].camera].birchObj, birch.destinations[0]);

            // Set button colors   red=2, green=3
        skaarhojF1.hwcMode(pressed, '4');          // set "pushed" to white

        paintRCP(currentRcpLayout);

        grassValley.subscribe2Camera(buttonMap[pressed].camera);        // Subscribe to camera changes in iris, gain, nd, ...
    }
    else
    {
        switch (pressed){          
                                // Recall Single Camera Preset
            case recallSinglePresetF1:
                if (buttonLive){
                    grassValley.sendPresetRecall(buttonMap[buttonLive].camera, 2);      // 2 => File 1
                    cameraPresetLEDs(pressed);
                }
                break;
            case recallSinglePresetF1 +1:
                if (buttonLive){
                    grassValley.sendPresetRecall(buttonMap[buttonLive].camera, 3);      // 3 => File 2
                    cameraPresetLEDs(pressed);
                }
                break;
            case recallSinglePresetF1 +2:
                if (buttonLive){
                    grassValley.sendPresetRecall(buttonMap[buttonLive].camera, 4);      // 4 => File 3
                    cameraPresetLEDs(pressed);
                }
                break;
            case recallSinglePresetF1 +3:
                if (buttonLive){
                    grassValley.sendPresetRecall(buttonMap[buttonLive].camera, 5);      // 5 => File 4
                    cameraPresetLEDs(pressed);
                }
                break;

                                // Recall All CamerasPreset
            case recallAllPresetF1:
                cameraMap.forEach(function(obj){
                    grassValley.sendPresetRecall(obj.cameraNum, 2);   // 2 => File 1
                    obj.presetButton = 0;                           // Clear the camera's individual Preset
                });
                allCamerasPresetLEDs(pressed)
                break;
            case recallAllPresetF1 +1:
                cameraMap.forEach(function(obj){
                    grassValley.sendPresetRecall(obj.cameraNum, 3);   // 3 => File 2
                    obj.presetButton = 0;
                });
                allCamerasPresetLEDs(pressed)
                break;
            case recallAllPresetF1 +2:
                cameraMap.forEach(function(obj){
                    grassValley.sendPresetRecall(obj.cameraNum, 4);   // 4 => File 3
                    obj.presetButton = 0;
                });
                allCamerasPresetLEDs(pressed)
                break;
            case recallAllPresetF1 +3:
                cameraMap.forEach(function(obj){
                    grassValley.sendPresetRecall(obj.cameraNum, 5);   // 5 => File 4
                    obj.presetButton = 0;
                });
                allCamerasPresetLEDs(pressed)
                break;

            case rebootF1:            // RESET ALL ... exit()
                process.exit(1);    // program exit will cause docker to restart this
                break;

            default:
                console.log('Unmapped button pressed: ' +pressed);
        }
    }
});


                        //
                        //  RCP
                        //

skaarhojRCP.on('dial', (dial, movement) => {
    onDialFunction (currentRcpLayout, dial, movement);
});


var currentRcpLayout = {};

Object.assign(currentRcpLayout, commonLayout, rcpLayouts[17]);   // Let's head to Home screen at program startup

function paintRCP(layout)
{
    if (layout != rcpLayouts[38]){          // Don't dicplay "common" menu on shift key
        currentRcpLayout = {};
        Object.assign(currentRcpLayout, layout);         // currentRcpLayout tells us what is on the RCP excluding Shift.
    }

    // console.log('===================');
    // console.dir(currentRcpLayout);
    // console.log('===================');


    Object.entries(layout).forEach(hwc => {

        if(hwc[0] == 'sub')    // Don't paint sub menus!
            return;

        if (hwc[1].led){            // Just light up an LED with color (not a display w/label)
            skaarhojRCP.hwcMode(hwc[1].led, hwc[1][grassValues[buttonMap[buttonLive].camera][hwc[0]]] );
        }
        else if(hwc[1].dial){
            if (grassValues[buttonMap[buttonLive].camera] === undefined ||
                                                       grassValues[buttonMap[buttonLive].camera][hwc[0]] === undefined){
                skaarhojRCP.hwcLabel(hwc[1].display, hwc[1].label);    // Just a label - no value:)
            }
            else{
                if (hwc[1].scaling){
                    skaarhojRCP.hwcLabel(hwc[1].display, hwc[1].label +Math.trunc( (grassValues[buttonMap[buttonLive].camera][hwc[0]]) *hwc[1].scaling));
                }
                else{

                    if (hwc[1].boolean){
                        if(grassValues[buttonMap[buttonLive].camera][hwc[0]] == '0')
                            skaarhojRCP.hwcLabel(hwc[1].display, hwc[1].label + 'OFF');
                        else
                            skaarhojRCP.hwcLabel(hwc[1].display, hwc[1].label + 'ON');
                    }
                    else {
                        skaarhojRCP.hwcLabel(hwc[1].display, hwc[1].label +grassValues[buttonMap[buttonLive].camera][hwc[0]]);
                    }
                }
            }
            
            if (hwc[1].color){
                // console.log('calling hwcColor ' +hwc[1].dial +' ' +hwc[1].color +' ' +hwc[1].label);
                skaarhojRCP.hwcColor(hwc[1].dial, hwc[1].color);
            }
            else{
                // console.log("calling hwcColor w/default color");
                skaarhojRCP.hwcColor(hwc[1].dial, 128 +' ' +hwc[1].label); // 128 = default
            }
        }
        else if(hwc[1].button){
            // console.log('calling hwcLabel/Color ')
            if (hwc[1].label)
                skaarhojRCP.hwcLabel(hwc[1].button, hwc[1].label);  
            skaarhojRCP.hwcColor(hwc[1].button, hwc[1].color);
        }
    });

    skaarhojRCP.hwcLabel(38, buttonMap[buttonLive].name)

}
                        //
                        //  RCP
                        //

var shiftDepressed = false;

skaarhojRCP.on('button', (pressed, position) => {

    // console.log ('RCP button on ' +pressed  +' ' +position );
    // console.dir (currentRcpLayout);

    switch (pressed){ 

        case 1:             // Screen change Key ??
            if (!shiftDepressed && position == 'Down' && rcpLayouts[currentRcpLayout['super']]){
                var newLayout = {};
                Object.assign(newLayout, commonLayout, rcpLayouts[currentRcpLayout['super']]);
                paintRCP (newLayout);  // Display parent (super) screen
            }
        break;

        case 2:             // SubScreen 
            if (!shiftDepressed && position == 'Down' && currentRcpLayout['sub']){
                var newLayout = {};
                Object.assign(newLayout, commonLayout, currentRcpLayout['sub']);
                paintRCP (newLayout);  // Display child (sub) screen
            }
        break;

        case 38:            // Shift Key 
            // console.log('Shift Key ' +position);
            if (position == 'Down'){  
                shiftDepressed = true;
                paintRCP(rcpLayouts[pressed]);
            }
            else{
                shiftDepressed = false;
                paintRCP(currentRcpLayout);     // Shift key does not alter currentRcpLayout (see paintRCP)

            }
        break;

        case 17:            // Home mode 
        case 18:            // Gain/Gamma Mode 
        case 19:            // Flare/PED mode 
        case 20:            // Matrix 1,2
        case 21:            // Color 1,2
        case 22:            // HDR 1,2 

            if (position == 'Down'){    
                if (shiftDepressed){           // Shift screen invoked?
                    skaarhojRCP.hwcMode(pressed, 4); 
                    grassValley.sendPresetRecall(buttonMap[buttonLive].camera, parseInt(pressed) -15);
                }
                else {       
                    var newLayout = {};
                    Object.assign(newLayout, commonLayout, rcpLayouts[pressed]);
                    paintRCP (newLayout);  // Display parent (super) screen
                }
            }
        break;

        case 25:            // AWB=8193  State=809
            if (shiftDepressed && position == 'Down'){      // Shift depressed?
                skaarhojRCP.hwcMode(pressed, 4); 
                console.log('AWB sent');
                grassValley.sendFunctionValue(8193, buttonMap[buttonLive].camera, 'true', 'true');  
            } 
        break;

        case 26:            // ABB=8198  State=???
            if (shiftDepressed && position == 'Down'){
                skaarhojRCP.hwcMode(pressed, 4); 
                console.log('ABB sent');
                grassValley.sendFunctionValue(8198, buttonMap[buttonLive].camera, 'true', 'true'); 
            }
        break;

        default:
            console.log('Unmapped button pressed: ' +pressed +' ' +position);
    }

});


var grassValues=[];

grassValleyEmitter.on('func', (func, camera, value) => {
    console.log('GV sent ==> camera: ' +camera +' func: ' +func + ' value:' +value);

    if (grassValues[camera] === undefined)
        grassValues[camera] = [];

    grassValues[camera][func] = value;          // Save incoming GV values by camera/function code

    if (buttonLive && camera == buttonMap[buttonLive].camera){

        if (f1Lay[func] != undefined)
            skaarhojF1.hwcLabel(f1Lay[func].display, f1Lay[func].label +value);

        if (currentRcpLayout[func] != undefined){
            if (currentRcpLayout[func].led != undefined){            // LED Indicator
                if (currentRcpLayout[func][value] != undefined)   // Is there a color corresponding to value?
                    skaarhojRCP.hwcMode(currentRcpLayout[func].led, currentRcpLayout[func][value]);
            }
            else{   // Not LED
                if (currentRcpLayout[func].scaling){
                    skaarhojRCP.hwcLabel(currentRcpLayout[func].display, currentRcpLayout[func].label +Math.trunc(value *currentRcpLayout[func].scaling));
                }
                else{
                    if (currentRcpLayout[func].boolean){
                        if(value == '0')
                            skaarhojRCP.hwcLabel(currentRcpLayout[func].display, currentRcpLayout[func].label +'OFF');
                        else
                            skaarhojRCP.hwcLabel(currentRcpLayout[func].display, currentRcpLayout[func].label +'ON');
                    }
                    else{
                        skaarhojRCP.hwcLabel(currentRcpLayout[func].display, currentRcpLayout[func].label +value);
                    }
                }
            }
        }

    }
});



function serverInit()
{
    var button;
    var camera;

    // console.dir(birch.sources);
    
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
                button=13;
                camera=10;
                break;

                        // Not yet in Birch ??
            case 'NP CAM 11i':
                button=14;
                camera=11;
                break;
            case 'NP CAM 12i':
                button=15;
                camera=12;
                break;
            case 'NP CAM 13i':
                button=16;
                camera=13;
                break;

        }

        cameraMap[camera] = new Object();
        cameraMap[camera].button = button;
        cameraMap[camera].birchObj = birch.sources[i];
        cameraMap[camera].ndFilter = 1;    // ND filters 1-4 on GrassValley
        cameraMap[camera].cameraNum = camera;
        cameraMap[camera].presetButton = 0;

        buttonMap[button] = new Object();
        buttonMap[button].camera = camera;
        buttonMap[button].name = birch.sources[i].name;

        grassValley.subscribe2Camera(camera);        // Subscribe to camera changes in iris, gain, nd, ...


    } // for loop


    // console.dir(buttonMap);
    // console.dir(cameraMap);

    resetButtonsNLabels();

}

function resetButtonsNLabels()
{
    for(i=0;i<buttonMap.length;i++){
        if(buttonMap[i]){
            skaarhojF1.hwcMode(i, '0');      // set all to off
            skaarhojF1.hwcMode(i+6, '0');      // set flags to off
            skaarhojF1.hwcLabel(i, buttonMap[i].name);
        }
    }
    skaarhojF1.hwcLabel(54, 'Coarse');
    skaarhojF1.hwcLabel(47, 'Preset');
    if (buttonLive){
        cameraPresetLEDs(0);    // Clear all 4 then light single below
        skaarhojF1.hwcLabel(48, buttonMap[buttonLive].name);
        if (cameraMap[buttonMap[buttonLive].camera].presetButton)
            skaarhojF1.hwcMode(cameraMap[buttonMap[buttonLive].camera].presetButton, 4);       //  White is 4
    }
    skaarhojF1.hwcLabel(25, 'Preset ALL Cams');
    skaarhojF1.hwcLabel(18, 'Reset Panel');            // Force program to exit

    if (!buttonLive){    // We just started up - no camera selected
        allCamerasPresetLEDs(0);     // Clear "All Camera" preset buttons
        cameraPresetLEDs(0);        // Clear individual camera preset buttons
    }
    else{
        skaarhojRCP.hwcLabel(38, buttonMap[buttonLive].name)
    }
}

function cameraPresetLEDs(pressed)
{
    for (i=49;i<53;i++)                 // Individual Camera Preset LEDs
        skaarhojF1.hwcMode(i, 0);

    if (pressed){
        skaarhojF1.hwcMode(pressed, 4);       //  Green is 3
        cameraMap[buttonMap[buttonLive].camera].presetButton = pressed;
    }
}

function allCamerasPresetLEDs(pressed)
{
    for (i=28;i<32;i++){                 // All Cameras Preset LEDs
        skaarhojF1.hwcMode(i, 0);
    }

    if (pressed)
        skaarhojF1.hwcMode(pressed, 4);

    cameraPresetLEDs(0);   // All cameras Profile ... clear this cameras individual Profile LEDs
}


