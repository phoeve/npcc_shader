
        // Skaarhoj constants
        // for HWC#xx=yy mode calls (leds, buttons )
const modeOff   = 0;
const modeRed   = 2;
const modeGreen = 3;
const modeWhite = 4;

        // for HWCc#xx=yy color calls (dials, buttons, )
const colorOff     = 129;
const colorWhite   = 130;
const colorRed     = 132;
const colorGreen   = 143;
const colorBlue    = 138;
const colorMagenta = 133;
const colorYellow  = 137;
const colorCyan    = 141;
const colorAmber   = 136;




        // Naming buttons for our RCP
const buttonHome        = 17;
const buttonGainGamma   = 18;
const buttonFlarePed    = 19;
const buttonMatrix      = 20;
const buttonColorCorr   = 21;
const buttonHdr         = 22;
const buttonSuper       =  1;
const buttonSub         =  2;
const buttonShift       = 38;


        // Mapping Screen Layouts to Skaarhoj buttons
const screenShift         = buttonShift;                // Many screens have same screen# as Skaarhoj button# (by design - avoids some mapping)
const screenHome          = buttonHome;
const screenGainGamma     = buttonGainGamma;
const screenFlarePed      = buttonFlarePed;
const screenMatrix        = buttonMatrix;
const screenColorCorr     = buttonColorCorr;
const screenColorCorrSub  = 221;
const screenHdr           = buttonHdr;
const screenHdrSub        = 222;


            // Grass valley Function Codes
            //
const gvSensitivity = 8321;
const gvFstop       = 1039;
const gvIris        =  542;
const gvGain        = 8392;
const gvDetail      = 1056;
const gvKnee        = 1027;
const gvTally       = 1809;
const gvDtl         = 8369;
const gvSkin        =  776;
const gvSkinSet     = 8192;
const gvActiveScene = 8200;
const gvSetScene    = 4098;
const gvNDFilter    = 1030;
const gvSaturation  =  615;
const gvTemp        =  608;

const gvGainMaster  = 1026;
const gvGainRed     =  513;
const gvGainGreen   =  514;
const gvGainBlue    =  515;
const gvGammaMaster =  584;
const gvGammaRed    =  583;
const gvGammaGreen  =  586;
const gvGammaBlue   =  585;

const gvFlareOnOff  =  969;
const gvFlareRed    =  519;
const gvFlareGreen  =  520;
const gvFlareBlue   =  521;
const gvPedMaster   =  540;
const gvPedRed      =  516;
const gvPedGreen    =  517;
const gvPedBlue     =  518;

const gvMatrixRG    =  533;
const gvMatrixRB    =  534;
const gvMatrixGR    =  535;
const gvMatrixGB    =  536;
const gvMatrixBR    =  537;
const gvMatrixBG    =  538;


                // GV Function Code Excepions Table    assumed default -> "functionCode: {setter: functionCode},"

const gvFuncCodeDef = {
                // "setRelative: true" - means that the setter (GV) is expecting a setRelative value - default
    [gvDetail]:       {boolean: true},
    [gvKnee]:         {boolean: true},
    [gvTally]:        {boolean: true},
    [gvDtl]:          {boolean: true},
    [gvSkin]:         {boolean: true},
    [gvSensitivity]:  {setRelative:false, range:2},
    [gvNDFilter]:     {setRelative:false, range:4},
    [gvActiveScene]:  {setRelative:false, range:5},
    [gvFlareOnOff]:   {boolean: true},
}


const x2562Pct = 100/255;
const x4k2Pct = 100/4095;

                    // Common to all Screens (Shift key overlays current screen)
const commonLayout = 
{
        'Shift':      {button: buttonShift,                           color: colorOff,                        screen: screenShift},
        'C001':       {button: buttonHome,      label: 'Home',        color: colorOff,                        screen: screenHome},
        'C002':       {button: buttonGainGamma, label: 'Gain/Gamma',  color: colorOff,                        screen: screenGainGamma},
        'C003':       {button: buttonFlarePed,  label: 'Flare/Ped',   color: colorOff,                        screen: screenFlarePed},
        'C004':       {button: buttonMatrix,    label: 'Matrix',      color: colorOff,                        screen: screenMatrix},
        'C005':       {button: buttonColorCorr, label: 'Color/Corr',  color: colorOff,                        screen: screenColorCorr},
        'C006':       {button: buttonHdr,       label: 'HDR',         color: colorOff,                        screen: screenHdr},
        'C025':       {button: 25,              label: 'Menu',        color: colorOff},
        'C026':       {button: 26,              label: ' ',           color: colorOff},      // Turn off ABB
        [gvFstop]:    {dial:   56, display: 29, label: 'F ',                                  setter: gvIris,     setScale: 7, setUpScale: 100}, 
        [gvPedMaster]:{dial:   99, display: 28, label: 'PED ',        displayScaling: x4k2Pct,                setScale: 7, setUpScale: 100}, 
        [gvGain]:     {dial:   31, display: 31, label: 'Gain ',       color: colorWhite,      setter: gvGain, setScale: 1, setUpScale: 10},
        [gvDetail]:   {button: 32, display: 32, label: 'DTL ',        color: colorOff}, 
        [gvKnee]:     {button: 33, display: 33, label: 'Knee ',       color: colorOff}, 
        [gvTally]:    {led:    30,                  0: modeOff, 1: modeRed},                         // Tally  1=red=colorRed  0=black=colorOff
        'C009':       {button: buttonSuper,     color: colorOff},     // Turn sub menu button lights off
        'C010':       {button: buttonSub,       color: colorOff}, 
}

const rcpLayouts = {

    [screenHome]:             // Home               
    {        
        'H001':          {button: 17, label: 'Home',                color: colorWhite},      // Light up Menu button
        [gvDtl]:         {dial:    9, display:  9, label: 'Dtl ',   color: colorWhite,    displayScaling: x2562Pct},
        [gvSkin]:        {dial:   10, display: 10, label: 'Skin ',  color: colorWhite,    setter: gvSkinSet},
        [gvSaturation]:  {dial:   11, display: 11, label: 'Sat ',   color: colorWhite,    },
        [gvTemp]:        {dial:   12, display: 12, label: 'Temp ',  color: colorWhite,    },
        'H005':          {dial:   13, display: 13, label: ' ',      color: colorOff},
        [gvSensitivity]: {dial:   14, display: 14, label: 'Sens ',  color: colorWhite     },
        [gvNDFilter]:    {dial:   15, display: 15, label: 'ND ',    color: colorWhite,    },
        [gvActiveScene]: {dial:   16, display: 16, label: 'Scene ', color: colorWhite,    displayAdjust: -1, setter: 4098},
    },

    [screenGainGamma]:             // Gain/Gamma
    {
        'G001':           {button: 18, color: colorWhite},       // Light up Menu button  
        [gvGainMaster]:   {dial:  9, display: 9,  label: 'M ',  color: colorWhite},
        [gvGainRed]:      {dial: 10, display: 10, label: 'R ',  color: colorRed,    displayScaling: x2562Pct},
        [gvGainGreen]:    {dial: 11, display: 11, label: 'G ',  color: colorGreen,  displayScaling: x2562Pct},
        [gvGainBlue]:     {dial: 12, display: 12, label: 'B ',  color: colorBlue,   displayScaling: x2562Pct},
        [gvGammaMaster]:  {dial: 13, display: 13, label: 'M ',  color: colorWhite,  displayScaling: x2562Pct},
        [gvGammaRed]:     {dial: 14, display: 14, label: 'R ',  color: colorRed,    displayScaling: x2562Pct},
        [gvGammaGreen]:   {dial: 15, display: 15, label: 'G ',  color: colorGreen,  displayScaling: x2562Pct},
        [gvGammaBlue]:    {dial: 16, display: 16, label: 'B ',  color: colorBlue,   displayScaling: x2562Pct},
    },

    [screenFlarePed]:             // Flare / PED
    {
        'F001':           {button: 19, color: colorWhite},       // Light up Menu button 
        [gvFlareOnOff]:   {dial:  9, display:  9, label: 'Flare ',  color: colorWhite},
        [gvFlareRed]:     {dial: 10, display: 10, label: 'R ',  color: colorRed,   displayScaling: x2562Pct},
        [gvFlareGreen]:   {dial: 11, display: 11, label: 'G ',  color: colorGreen, displayScaling: x2562Pct},
        [gvFlareBlue]:    {dial: 12, display: 12, label: 'B ',  color: colorBlue,  displayScaling: x2562Pct},
        [gvPedMaster]:    {dial: 13, display: 13, display_2: 28, label: 'M ',  color: colorWhite, displayScaling: x4k2Pct, setScale: 7},
        [gvPedRed]:       {dial: 14, display: 14, label: 'R ',  color: colorRed,   displayScaling: x2562Pct},     
        [gvPedGreen]:     {dial: 15, display: 15, label: 'G ',  color: colorGreen, displayScaling: x2562Pct},
        [gvPedBlue]:      {dial: 16, display: 16, label: 'B' ,  color: colorBlue,  displayScaling: x2562Pct},
    },

    [screenMatrix]:             // Matrix
    {
        'M001':        {button: 20, color: colorWhite},       // Light up Menu button  
        [gvMatrixRG]:  {dial:  9, display:  9, label: 'R-G ',  color: colorRed},
        [gvMatrixRB]:  {dial: 10, display: 10, label: 'R-B ',  color: colorRed},
        [gvMatrixGR]:  {dial: 11, display: 11, label: 'G-R ',  color: colorGreen},
        [gvMatrixGB]:  {dial: 12, display: 12, label: 'G-B ',  color: colorGreen},
        [gvMatrixBR]:  {dial: 13, display: 13, label: 'B-R ',  color: colorBlue},
        [gvMatrixBG]:  {dial: 14, display: 14, label: 'B-G ',  color: colorBlue},  
        'M007':        {dial: 15, display: 15, label: ' ',     color: colorOff},
        'M008':        {dial: 16, display: 16, label: ' ',     color: colorOff},

    },

    [screenColorCorr]:             // Color / Correction
    {
        'CC001': {button:  buttonColorCorr,  color: colorWhite},       // Light up Menu button  
        'CC002': {button:  buttonSuper,      color: colorWhite},       // Light up sub screen "1" button   
        'CC003': {button:  buttonSub,        color: colorOff, screen: screenColorCorrSub},          
        9999:    {dial:  9, display:  9, label: 'SAT ',     color: colorRed},
        9998:    {dial: 10, display: 10, label: 'PHASE ',   color: colorRed},
        9997:    {dial: 11, display: 11, label: 'SAT ',     color: colorMagenta},
        9996:    {dial: 12, display: 12, label: 'PHASE ',   color: colorMagenta}, 
        9995:    {dial: 13, display: 13, label: 'SAT ',     color: colorYellow},
        9994:    {dial: 14, display: 14, label: 'PHASE ',   color: colorYellow},
        9993:    {dial: 15, display: 15, label: 'SAT ',     color: colorGreen},
        9992:    {dial: 16, display: 16, label: 'PHASE ',   color: colorGreen},   
    },

    [screenColorCorrSub]: {
        'CC001':    {button: buttonColorCorr, color: colorWhite},       // Light up Menu button 
        'CC002':    {button: buttonSuper,     color: colorOff, screen: screenColorCorr},       
        'CC010':    {button: buttonSub,       color: colorWhite},       // Light up sub screen "2" button  
        9999:       {dial:  9, display:  9, label: 'SAT ',    color: colorBlue},
        9998:       {dial: 10, display: 10, label: 'PHASE ',  color: colorBlue}, 
        'CC003':    {dial: 11, display: 11, label: ' ',       color: colorOff},
        'CC004':    {dial: 12, display: 12, label: ' ',       color: colorOff},     
        9997:       {dial: 13, display: 11, label: 'SAT ',    color: colorCyan},
        9996:       {dial: 14, display: 12, label: 'PHASE ',  color: colorCyan},
        'CC007':    {dial: 15, display: 15, label: ' ',       color: colorOff},
        'CC008':    {dial: 16, display: 16, label: ' ',       color: colorOff},
    },


    [screenHdr]:             // HDR
    {
        'HD001': {button:  buttonHdr, color: colorWhite},       // Light up Menu button  
        'HD002': {button:  buttonSuper, color: colorWhite},       // Light up sub screen "1" button  
        'HD003': {button:  buttonSub,   color: colorOff, screen: screenHdrSub},          
        8387:    {dial:  9, display:  9, label: 'HDR Std ',  color: colorWhite},
        8388:    {dial: 10, display: 10, label: 'HDR Out ',  color: colorWhite},
        9997:    {dial: 11, display: 11, label: '% Hi ',     color: colorWhite},
        8385:    {dial: 12, display: 12, label: 'Pt Hi ',    color: colorWhite}, 
        9994:    {dial: 14, display: 14, label: 'HDR Clip ', color: colorWhite},
        'HD005': {dial: 13, display: 13, label: ' ',         color: colorOff},
        9993:    {dial: 15, display: 15, label: '% Low ',    color: colorWhite},
        8386:    {dial: 16, display: 16, label: 'Pt Low ',   color: colorWhite},
    },


    [screenHdrSub]: {
        'HD001':     {button: buttonHdr,   color: colorWhite},       // Light up Menu button  
        'HD002':     {button: buttonSuper, color: colorOff, screen: screenHdr},       
        'HD003':     {button: buttonSub,   color: colorWhite},       // Light up sub screen "2" button  
        'HD004':     {dial:  9, display:  9, label: ' ',          color: colorOff},
        'HD005':     {dial: 10, display: 10, label: ' ',          color: colorOff},     // Clear dial attributes
        'HD006':     {dial: 11, display: 11, label: ' ',          color: colorOff},
        'HD007':     {dial: 12, display: 12, label: ' ',          color: colorOff},
        524:         {dial: 13, display: 13, label: 'SDR Level ', color: colorWhite},    
        572:         {dial: 14, display: 14, label: 'SDR Clip ',  color: colorWhite}, 
        'HD008':     {dial: 15, display: 15, label: ' ',          color: colorOff},
        'HD009':     {dial: 16, display: 16, label: ' ',          color: colorOff},
    },

    [screenShift]:
    {
        'S001': {button: 17, label: 'S1',  color: colorOff, setter: 4098, setRelative: false, parm:2},
        'S002': {button: 18, label: 'S2',  color: colorOff, setter: 4098, setRelative: false, parm:3},
        'S003': {button: 19, label: 'S3',  color: colorOff, setter: 4098, setRelative: false, parm:4},
        'S004': {button: 20, label: 'S4',  color: colorOff, setter: 4098, setRelative: false, parm:5},
        'S005': {button: 21, label: 'S5',  color: colorOff, setter: 4098, setRelative: false, parm:6},
        'S006': {button: 22, label: ' ',   color: colorOff},
        'S007': {button: 25, label: 'AWB', color: colorOff, setter: 8193, setRelative: false, parm:true},
        'S008': {button: 26, label: 'ABB', color: colorOff, setter: 8198, setRelative: false, parm:true},
        'S011': {button: screenShift, color: colorWhite},                   // Light up Shift key

    },
};

var f1Lay = {
    [gvFstop]:       {dial: 53, display: 53, label: 'F ',     color: colorWhite, setter: gvIris, setScale: 10, setUpScale: 100},      // Iris fine
    [gvGain]:        {dial: 54, display: 54, label: 'Gain ',  color: colorWhite, setScale: 1, setUpScale: 10},    
    [gvSensitivity]: {dial: 55, display: 55, label: 'Sens ',  color: colorWhite},            
    [gvNDFilter]:    {dial: 56, display: 56, label: 'ND ',    color: colorWhite},
}


                //
                // Grass Valley Calls
                //
grassValley = require('./grass.js');
grassValleyEmitter = grassValley.connect();

                //
                // Birch calls
                //
birch = require('./birch.js');
birchEmitter = birch.init();
birchEmitter.on('initialized', () => {
    // console.log('birchEmitter.on(initialized)');
    serverInit();
});


                //
                // Skaarhoj init
                //
const Skaarhoj = require('./skaarhoj.js');
skaarhojF1 = new Skaarhoj('10.1.43.37');
skaarhojRCP = new Skaarhoj('10.1.45.54');




                //
                //  Fusion 1
                //

skaarhojF1.on('dial', (dial, movement) => {
    onDialFunction (f1Lay, dial, movement);
});

const recallSinglePresetF1 = 49;
const recallAllPresetF1 = 28;
const rebootF1 = 18;


function getLayEntByHWC (layout, pressed, hwc)
{
    var layEnt = {};

    Object.entries(layout).forEach(item => { 
        // console.log('pressed:', pressed, 'hwc:', hwc, 'item[1][hwc]:', item[1][hwc], 'item:', item);
        if (item[1][hwc] === pressed){
            layEnt = item[1];
            // console.log('Matched!');
        }
    });

    return layEnt;
}

var f1DialToggleMap = [];                   // Dial press (toggle) logic for Fusion 1      
skaarhojF1.on('press', (pressed) => {

    var layEnt = getLayEntByHWC (f1Lay, pressed, 'dial');

    if (layEnt == {} || layEnt.setUpScale == undefined)
        return;             // Not an UpScale button

    if (f1DialToggleMap[pressed] == true ){
        f1DialToggleMap[pressed] = false;
        skaarhojF1.hwcColor(pressed, colorOff);
    }
    else{
        f1DialToggleMap[pressed] = true;
        skaarhojF1.hwcColor(pressed, colorAmber);
    }
});




skaarhojF1.on('button', (pressed, position) => {

    if (position == 'Up'){          // Ignore button Up's on Fusion One
        return;                 
    }

    if (f1ButtonMap[pressed]){      // Camera select button pressed ?

        f1ButtonLive = pressed;            // save the live button

        resetButtonsNLabels(); 

            // Send GV OCP camera name to shade
            // console.log('GV OCP ' +f1ButtonMap[pressed].camera);
        grassValley.ocpSetCamera(f1ButtonMap[pressed].camera);

            // Send birch request route camera to shader monitor
        birch.take(cameraMap[f1ButtonMap[pressed].camera].birchObj, birch.destinations[0]);

            // Set button colors   red=2, green=3
        skaarhojF1.hwcMode(pressed, modeWhite);          // set "pushed" to white

        paintRCP(currentRcpLayout);

    }
    else
    {
        switch (pressed){          
                                // Recall Single Camera Preset
            case recallSinglePresetF1:
                if (f1ButtonLive){
                    grassValley.sendPresetRecall(f1ButtonMap[f1ButtonLive].camera, 2);      // 2 => File 1
                    cameraPresetLEDs(pressed);
                }
                break;
            case recallSinglePresetF1 +1:
                if (f1ButtonLive){
                    grassValley.sendPresetRecall(f1ButtonMap[f1ButtonLive].camera, 3);      // 3 => File 2
                    cameraPresetLEDs(pressed);
                }
                break;
            case recallSinglePresetF1 +2:
                if (f1ButtonLive){
                    grassValley.sendPresetRecall(f1ButtonMap[f1ButtonLive].camera, 4);      // 4 => File 3
                    cameraPresetLEDs(pressed);
                }
                break;
            case recallSinglePresetF1 +3:
                if (f1ButtonLive){
                    grassValley.sendPresetRecall(f1ButtonMap[f1ButtonLive].camera, 5);      // 5 => File 4
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


function onDialFunction(layout, dial, movement)
{

    // console.log('dial:', dial, 'movement:', movement);
    // console.dir(layout);

    if (!f1ButtonLive)    // No camera selected ?
        return;

    Object.entries(layout).forEach(item => {  // Loop through currentLayout looking for this dial #

        var gvFuncNum = item[0];
        var gvFuncDef = gvFuncCodeDef[gvFuncNum];
        var layEnt = item[1];


        if (dial === layEnt.dial){         // Is the Dial that was turned?

            var setter = item[0];             // Default GV setter function code same as getter function code
            if (layEnt.setter)
                var setter = layEnt.setter;

            mult = 1;                   // default to "no" multiplier                                
            if ( ((layout === f1Lay && f1DialToggleMap[dial]) || (layout != f1Lay && rcpDialToggleMap[dial]))  && layEnt.setUpScale){   // If operator pushes dial while turning - setUpScale!
                if (layEnt.setUpScale)
                    mult = layEnt.setUpScale;
            }
            else if (layEnt.setScale){
                mult = layEnt.setScale;
            }

            if (gvFuncDef != undefined){        // Any special handling at gvFuncCodeDef level?
                if (gvFuncDef.boolean === true){
                    if (movement > 0){
                        // console.log('grassValley.sendFunctionValue', setter, false, 1);
                        grassValley.sendFunctionValue(setter, f1ButtonMap[f1ButtonLive].camera, 'false', 1);   
                    }
                    else{
                        // console.log('grassValley.sendFunctionValue', setter, false, 0);
                        grassValley.sendFunctionValue(setter, f1ButtonMap[f1ButtonLive].camera, 'false', 0);   
                    }
                }                           

                else if (gvFuncDef.setRelative != undefined && gvFuncDef.setRelative === false){     // !=undefined means setRelative is true
                                            // range? && previous/cached values ?
                    if (gvFuncDef.range && grassValueCache[f1ButtonMap[f1ButtonLive].camera][gvFuncNum] != undefined){  
                        var newValue = parseInt(grassValueCache[f1ButtonMap[f1ButtonLive].camera][gvFuncNum]) +movement;

                        if (layEnt.displayAdjust == undefined)
                            var adj = 0;
                        else
                            var adj = layEnt.displayAdjust;

                        if (newValue > gvFuncDef.range -adj) // Range of values like 1-4
                            newValue=1 -adj;
                        else if (newValue < 1 -adj)
                            newValue=gvFuncDef.range -adj;

                        // console.log('grassValley.sendFunctionValue', setter, false, newValue);
                        grassValley.sendFunctionValue(setter, f1ButtonMap[f1ButtonLive].camera, false, newValue);   
                    }
                } // end setRelative === false
            }
            else{
                // console.log('grassValley.sendFunctionValue', setter, false, movement, '*', mult);
                grassValley.sendFunctionValue(setter, f1ButtonMap[f1ButtonLive].camera, true, movement *mult );   
            }
        }
    });
}
                        //
                        //  RCP
                        //

var currentRcpLayout = {};


var rcpDialToggleMap = [];

function rcpDialToggleMapClear()
{
    Object.entries(rcpDialToggleMap).forEach(item => {  
        if (item[0] != undefined)
            skaarhojRCP.hwcColor(item[1], 129);     // Clear dial color ring
    });
    rcpDialToggleMap = [];
}

                
skaarhojRCP.on('press', (pressed) => {      // Dial press (toggle) logic for RCP

    var layEnt = getLayEntByHWC (currentRcpLayout, pressed, 'dial');

    if (layEnt == {} || layEnt.setUpScale == undefined)
        return;             // Not an UpScale button

    if (rcpDialToggleMap[pressed] == true){
        rcpDialToggleMap[pressed] = false;
        skaarhojRCP.hwcColor(pressed, colorOff);
    }
    else{
        rcpDialToggleMap[pressed] = true;
        skaarhojRCP.hwcColor(pressed, colorAmber);
    }
});


skaarhojRCP.on('dial', (dial, movement) => {
    onDialFunction (currentRcpLayout, dial, movement);
});


var shiftDepressed = false;

skaarhojRCP.on('button', (pressed, position) => {


    // console.log('button:', pressed, 'position:', position);
    // console.dir(currentRcpLayout);

    if (pressed === buttonShift){
        if (position === 'Down'){
            shiftDepressed = true;
            paintRCP (rcpLayouts[screenShift]);
        }
        else{
            shiftDepressed = false;
            paintRCP(currentRcpLayout);     // Shift key does not alter currentRcpLayout (see paintRCP)
            return;
        }
    }

                        // Find the button on the current layout
    var layout;
    if (shiftDepressed)
        layout = rcpLayouts[buttonShift];
    else
        layout = currentRcpLayout;


    Object.entries(layout).forEach(item => {

        var gvFuncNum = item[0];
        var gvFuncDef = gvFuncCodeDef[gvFuncNum];
        var layEnt = item[1];


        if (pressed == layEnt.button){         // Is this currentLayout Button that was pressed?


            if (position === 'Down'){

                // console.log('gvFuncDef: ', 'gvFuncDef: ', gvFuncDef, 'gvFuncNum: ', gvFuncNum);
                // console.log('layEnt:', layEnt);

                skaarhojRCP.hwcMode(pressed, modeWhite);    // Light up the button skaarhojRCP.hwcColor(pressed, colorWhite); 

                if (layEnt.screen){
                    // console.log('Painting new screen:', layEnt.screen);

                    paintRCP (rcpLayouts[layEnt.screen]);
                }
                else {
                    var setter = false;

                    if (!isNaN(gvFuncNum)){        // gvFuncNum is numeric
                        setter = gvFuncNum;
                    }
                    if (layEnt.setter){
                        setter = layEnt.setter;
                    }

                    if (setter){
                        if (gvFuncDef && gvFuncDef.boolean){     // button or dial depressed
                            var val = !grassValueCache[f1ButtonMap[f1ButtonLive].camera][gvFuncNum];
                            grassValley.sendFunctionValue(setter, f1ButtonMap[f1ButtonLive].camera, false, val);  
                        }
                        else{
                            grassValley.sendFunctionValue(setter, f1ButtonMap[f1ButtonLive].camera, false, layEnt.parm);  
                        }
                    }
                }
            }

        }
    });

});

        // Let's head to Home screen at program startup
Object.assign(currentRcpLayout, commonLayout, rcpLayouts[screenHome]);  


function paintRCP(layout)
{
    rcpDialToggleMapClear();            // Clear any dials that are in "upScale" mode

    var paintLayout = layout;

    if (layout != rcpLayouts[screenShift]){          // Don't display "common" menu on shift key
        currentRcpLayout = {};
        Object.assign(currentRcpLayout, commonLayout, layout);         // currentRcpLayout tells us what is on the RCP excluding Shift.
        paintLayout = currentRcpLayout;
    }

    Object.entries(paintLayout).forEach(item => {

        var gvFuncNum = item[0];
        var gvFuncDef = gvFuncCodeDef[gvFuncNum];
        var layEnt = item[1];

        // console.log ('gvFuncNum', gvFuncNum, 'gvFuncDef', gvFuncDef, 'layEnt', layEnt);

        // console.log(gvFuncCodeDef);

        if (layEnt.led){            // Just light up an LED with color (not a display w/label)
            skaarhojRCP.hwcMode(layEnt.led, layEnt[ grassValueCache[f1ButtonMap[f1ButtonLive].camera][gvFuncNum] ] );
        }
        else if(layEnt.dial){
            if (grassValueCache[f1ButtonMap[f1ButtonLive].camera] === undefined ||
                                                       grassValueCache[f1ButtonMap[f1ButtonLive].camera][gvFuncNum] === undefined){
                skaarhojRCP.hwcLabel(layEnt.display, layEnt.label);    // Just a label - no value:)
            }
            else{
                if (layEnt.displayScaling){
                    skaarhojRCP.hwcLabel(layEnt.display, layEnt.label +Math.trunc( (grassValueCache[f1ButtonMap[f1ButtonLive].camera][gvFuncNum]) *layEnt.displayScaling));  //???
                    if (layEnt.display_2 !=undefined)
                        skaarhojRCP.hwcLabel(layEnt.display_2, layEnt.label +Math.trunc( (grassValueCache[f1ButtonMap[f1ButtonLive].camera][gvFuncNum]) *layEnt.displayScaling));  //???
                }
                else{

                    if (gvFuncDef != undefined && gvFuncDef.boolean){
                        if(grassValueCache[f1ButtonMap[f1ButtonLive].camera][gvFuncNum] == '0')
                            skaarhojRCP.hwcLabel(layEnt.display, layEnt.label + 'OFF');
                        else
                            skaarhojRCP.hwcLabel(layEnt.display, layEnt.label + 'ON');
                    }
                    else {
                        if (layEnt.displayAdjust){
                            skaarhojRCP.hwcLabel(layEnt.display, layEnt.label +(parseInt(grassValueCache[f1ButtonMap[f1ButtonLive].camera][gvFuncNum]) +layEnt.displayAdjust) );
                        }
                        else{
                            skaarhojRCP.hwcLabel(layEnt.display, layEnt.label +grassValueCache[f1ButtonMap[f1ButtonLive].camera][gvFuncNum]);
                        }
                    }
                }
            }
            
            if (layEnt.color){
                // console.log('calling hwcColor ' +layEnt[1].dial +' ' +layEnt[1].color +' ' +layEnt[1].label);
                skaarhojRCP.hwcColor(layEnt.dial, layEnt.color);
            }
            else{
                // console.log("calling hwcColor w/default color");
                skaarhojRCP.hwcColor(layEnt.dial, 128 +' ' +layEnt.label); // 128 = default
            }
        }
        else if(layEnt.button){

            if (layEnt.label)
                skaarhojRCP.hwcLabel(layEnt.button, layEnt.label);

            skaarhojRCP.hwcColor(layEnt.button, layEnt.color);
        }
    });

    skaarhojRCP.hwcLabel(screenShift, f1ButtonMap[f1ButtonLive].name)

}





var f1ButtonMap=[];  // Globals
var f1ButtonLive = 0;
var cameraMap=[];
var grassValueCache=[];

grassValleyEmitter.on('func', (func, camera, value) => {
    console.log('GV sent <== camera: ' +camera +' func: ' +func + ' value:' +value);

    if (grassValueCache[camera] == undefined)
        grassValueCache[camera] = [];

    grassValueCache[camera][func] = value;          // Save incoming GV values by camera/function code

    if (f1ButtonLive && camera == f1ButtonMap[f1ButtonLive].camera){     // If this pertains to the "live" camera ...

        // console.log ('grassValleyEmitter.on', 'func', func, 'f1Lay', f1Lay);
        if (f1Lay[func] != undefined){           // Update the Fusion 1 panel if this function is defined there
            skaarhojF1.hwcLabel(f1Lay[func].display, f1Lay[func].label +value);
        }

        if (currentRcpLayout[func] != undefined){           // RCP - Does this GV function code have a setter?
            if (currentRcpLayout[func].led != undefined){            // LED Indicator
                if (currentRcpLayout[func][value] != undefined){   // Is there a color corresponding to value?
                    skaarhojRCP.hwcMode(currentRcpLayout[func].led, currentRcpLayout[func][value]);
                    if (currentRcpLayout[func].led_2)
                        skaarhojRCP.hwcMode(currentRcpLayout[func].led_2, currentRcpLayout[func][value]);
                }
            }
            else{   // Not LED
                if (currentRcpLayout[func].displayScaling){
                    skaarhojRCP.hwcLabel(currentRcpLayout[func].display, currentRcpLayout[func].label +Math.trunc(value *currentRcpLayout[func].displayScaling));
                    if (currentRcpLayout[func].display_2)
                        skaarhojRCP.hwcLabel(currentRcpLayout[func].display_2, currentRcpLayout[func].label +Math.trunc(value *currentRcpLayout[func].displayScaling));

                }
                else{
                    if (currentRcpLayout[func].boolean){
                        if(value == '0'){
                            skaarhojRCP.hwcLabel(currentRcpLayout[func].display, currentRcpLayout[func].label +'OFF');
                            if (currentRcpLayout[func].display_2)
                                skaarhojRCP.hwcLabel(currentRcpLayout[func].display_2, currentRcpLayout[func].label +'OFF');

                        }
                        else{
                            skaarhojRCP.hwcLabel(currentRcpLayout[func].display, currentRcpLayout[func].label +'ON');
                            if (currentRcpLayout[func].display_2)
                                skaarhojRCP.hwcLabel(currentRcpLayout[func].display_2, currentRcpLayout[func].label +'ON');
                        }
                    }
                    else{
                        if (currentRcpLayout[func].displayAdjust){
                            skaarhojRCP.hwcLabel(currentRcpLayout[func].display, currentRcpLayout[func].label +(parseInt(value) +currentRcpLayout[func].displayAdjust) );
                            if (currentRcpLayout[func].display_2)
                                skaarhojRCP.hwcLabel(currentRcpLayout[func].display_2, currentRcpLayout[func].label +(parseInt(value) +currentRcpLayout[func].displayAdjust) );
                        }
                        else{
                            skaarhojRCP.hwcLabel(currentRcpLayout[func].display, currentRcpLayout[func].label +value);
                            if (currentRcpLayout[func].display_2)
                                skaarhojRCP.hwcLabel(currentRcpLayout[func].display_2, currentRcpLayout[func].label +value);
                        }
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

    console.dir(birch.sources.length);
    
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

        f1ButtonMap[button] = new Object();
        f1ButtonMap[button].camera = camera;
        f1ButtonMap[button].name = birch.sources[i].name;

        grassValley.subscribe2Camera(camera);        // Subscribe to camera changes in iris, gain, nd, ...


    } // for loop

    resetButtonsNLabels();

}

function resetButtonsNLabels()
{
    for(i=0;i<f1ButtonMap.length;i++){
        if(f1ButtonMap[i]){
            skaarhojF1.hwcMode(i, '0');      // set all to off
            skaarhojF1.hwcMode(i+6, '0');      // set flags to off
            skaarhojF1.hwcLabel(i, f1ButtonMap[i].name);
        }
    }
    // skaarhojF1.hwcLabel(54, 'Coarse');
    skaarhojF1.hwcLabel(47, 'Preset');
    if (f1ButtonLive){
        cameraPresetLEDs(0);    // Clear all 4 then light single below
        skaarhojF1.hwcLabel(48, f1ButtonMap[f1ButtonLive].name);
        if (cameraMap[f1ButtonMap[f1ButtonLive].camera].presetButton)
            skaarhojF1.hwcMode(cameraMap[f1ButtonMap[f1ButtonLive].camera].presetButton, 4);       //  White is 4
    }
    skaarhojF1.hwcLabel(25, 'Preset ALL Cams');
    skaarhojF1.hwcLabel(18, 'Reset Panel');            // Force program to exit

    if (!f1ButtonLive){    // We just started up - no camera selected
        allCamerasPresetLEDs(0);     // Clear "All Camera" preset buttons
        cameraPresetLEDs(0);        // Clear individual camera preset buttons
    }
    else{        
        Object.entries(f1Lay).forEach(layEnt => { 
            skaarhojF1.hwcLabel(layEnt[1].display, layEnt[1].label + grassValueCache[f1ButtonMap[f1ButtonLive].camera][layEnt[0]]);
        });
        skaarhojRCP.hwcLabel(screenShift, f1ButtonMap[f1ButtonLive].name);    // Use Shift key's Display area
    }
}

function cameraPresetLEDs(pressed)
{
    for (i=49;i<53;i++)                 // Individual Camera Preset LEDs
        skaarhojF1.hwcMode(i, 0);

    if (pressed){
        skaarhojF1.hwcMode(pressed, 4);       //  Green is 3
        cameraMap[f1ButtonMap[f1ButtonLive].camera].presetButton = pressed;
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

// console.log("Unit testing ON!!!!");
// f1ButtonLive = 1;
// currentRcpLayout = rcpLayouts.screenHome;

// f1DialToggleMap[53] = true;
// onDialFunction(f1Lay, 53, 1);

// console.dir (gvFuncCodeDef);
// console.dir(f1Lay);
// console.dir(rcpLayouts);
// console.dir(commonLayout);





