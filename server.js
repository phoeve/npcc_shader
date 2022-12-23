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
const colorMagenta = 134;
const colorYellow  = 137;
const colorCyan    = 141;
const colorAmber   = 136;



        // Naming buttons for our RCP
const buttonHome        = 17;
const buttonGainGamma   = 18;
const buttonFlarePed    = 19;
const buttonMatrixCC    = 20;
const buttonDetailKnee  = 21;
const buttonHdr         = 22;
const buttonSuper       =  1;
const buttonSub         =  2;
const buttonSoloShift   = 32;
const buttonAllShift    = 33;
const buttonCamera      = 38;



        // Mapping Screen Layouts to Skaarhoj buttons
const screenShift         = 255;                // Many screens have same screen# as Skaarhoj button# (by design - avoids some mapping)
const screenHome          = buttonHome;
const screenGainGamma     = buttonGainGamma;
const screenFlarePed      = buttonFlarePed;
const screenMatrixCC      = buttonMatrixCC;
const screenDetailKnee    = buttonDetailKnee;
const screenHdr           = buttonHdr;
const screenHdrSub        = 222;

const screenCC            = 888;


            // Grass valley Function Codes
            //
const gvSensitivity = 8321;
const gvFstop       = 1039;
const gvIris        =  542;
const gvGain        = 8392;
const gvDtlOnOff    = 8377;
const gvDtlLevel    = 8378;
const gvKneeOnOff   = 1027;
const gvKneePoint   = 654;
const gvKneeSlope   = 541;

const gvTally       = 1809;
const gvDtl         = 8369;
const gvSkinOnOff   = 1025;
const gvSkin        =  776;

const gvActiveScene = 8200;
const gvSetScene    = 4098;
const gvNDFilter    = 1030;
const gvSaturation  =  615;
const gvTemp        =  608;

const gvGainMaster  = 1026;
const gvGainRed     =  513;
const gvGainGreen   =  514;
const gvGainBlue    =  515;
const gvGammaMaster = 9105;
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

const gvHdrStd      =  8387;
const gvHdrOut      =  8388;
const gvHdrHigh     =  8385;
const gvHdrGamLow   =  8386;

const gvHdrClipLvl  =  8896;
const gvHdrOutLvl   =  8901;

const gvHdrGamBrkHi =  8903;
const gvHdrGamBrkLo =  8902;

const gvCCSet       =  1240;
const gvCCName      =  1242;
const gvCCColor     =   741;
const gvCCWidth     =   742;
const gvCCHue       =   743;
const gvCCSat       =   744;
const gvCCLum       =   745;




const x2562Pct = 100/255;           //  Scaling factor for 0-255  => 0-100%
const x4k2Pct = 100/4095;           //  Scaling factor for 0-4095 => 0-100%

                    // Common to all Screens (Shift key overlays current screen)
const commonLayout = 
{
        'SoloShift':  {button: buttonSoloShift,                       color: colorOff,                        screen: screenShift},
        'AllShift':   {button: buttonAllShift,                        color: colorOff,                        screen: screenShift},
        'C001':       {button: buttonHome,      label: 'Home',        color: colorOff,                        screen: screenHome},
        'C002':       {button: buttonGainGamma, label: 'Gain/Gamma',  color: colorOff,                        screen: screenGainGamma},
        'C003':       {button: buttonFlarePed,  label: 'Flare/Ped',   color: colorOff,                        screen: screenFlarePed},
        'C004':       {button: buttonMatrixCC,  label: 'Matrix/Color',color: colorOff,                        screen: screenMatrixCC},
        'C005':       {button: buttonDetailKnee,label: 'Detail/Knee', color: colorOff,                        screen: screenDetailKnee},
        'C006':       {button: buttonHdr,       label: 'HDR',         color: colorOff,                        screen: screenHdr},
        'C025':       {button: 25,              label: 'Menu',        color: colorOff},
        'C026':       {button: 26,              label: ' ',           color: colorOff},      // Turn off ABB
        [gvFstop]:    {dial:   56, display: 29, label: 'F Stop',      setter: gvIris}, 
        [gvPedMaster]:{dial:   99, display: 28, label: 'PED Master',  displayScaling: x4k2Pct}, 
        [gvGain]:     {dial:   31, display: 31, label: 'Gain',        color: colorWhite,              setScale: 1, setUpScale: 10},
        'Solo':       {button: 32, display: 32, label: 'Solo',        color: colorOff}, 
        'All':        {button: 33, display: 33, label: 'All',         color: colorOff}, 
        'Recall':     {button: 34, display: 34, label: '<Shift',      color: colorOff}, 
        [gvTally]:    {led:    30,                  0: modeOff, 1: modeRed},                         // Tally  1=red=colorRed  0=black=colorOff

        'CX001': {button:  1,     color: colorOff},     // Turn off small buttons at top of RCP
        'CX002': {button:  2,     color: colorOff},
        'CX003': {button:  3,     color: colorOff},
        'CX004': {button:  4,     color: colorOff},
        'CX005': {button:  5,     color: colorOff},
        'CX006': {button:  6,     color: colorOff},
        'CX007': {button:  7,     color: colorOff},
        'CX008': {button:  8,     color: colorOff},
}

const rcpLayouts = {

    [screenHome]:             // Home               
    {        
        'H001':          {button: 17, label: 'Home',               color: colorWhite},      // Light up Menu button
        [gvDtlOnOff]:    {press:   9, toggle:true, on:3, off:1,    onColor: colorAmber, offColor: colorOff},
        [gvDtlLevel]:    {dial:    9, display:  9, label: 'Dtl',   displayScaling: x2562Pct},
        [gvKneeOnOff]:   {press:  10, toggle:true, on:3, off:1,    onColor: colorAmber, offColor: colorOff},
        [gvKneePoint]:   {dial:   10, display: 10, label: 'Knee',  color: colorWhite,    range:true, rangeLow:2, rangeHi:6},
        [gvSaturation]:  {dial:   11, display: 11, label: 'Sat',   color: colorWhite,    },
        [gvTemp]:        {dial:   12, display: 12, label: 'Temp',  color: colorWhite,    },
        [gvSkinOnOff]:   {press:  13, toggle:true, on:3, off:1,    onColor: colorAmber, offColor: colorOff},
        [gvSkin]:        {dial:   13, display: 13, label: 'Skin',  setter: gvSkin},
        [gvSensitivity]: {dial:   14, display: 14, label: 'Sens',  color: colorWhite,    range:true, rangeLow:1, rangeHi:2},
        [gvNDFilter]:    {dial:   15, display: 15, label: 'ND',    color: colorWhite,    range:true, rangeLow:1, rangeHi:4},
        [gvActiveScene]: {dial:   16, display: 16, label: 'Scene', color: colorWhite,    displayAdjust: -1, range:true, rangeLow:2, rangeHi:6, setter: 4098},
    },

    [screenGainGamma]:             // Gain/Gamma
    {
        'G001':           {button: 18, color: colorWhite},       // Light up Menu button  
        // [gvGainMaster]:   {dial:  9, display: 9,  label: 'M',  color: colorWhite},
        [gvGainRed]:      {dial: 10, display: 10, label: 'R',  color: colorRed,    displayScaling: x2562Pct},
        [gvGainGreen]:    {dial: 11, display: 11, label: 'G',  color: colorGreen,  displayScaling: x2562Pct},
        [gvGainBlue]:     {dial: 12, display: 12, label: 'B',  color: colorBlue,   displayScaling: x2562Pct},
        [gvGammaMaster]:  {dial: 13, display: 13, label: 'M',  color: colorWhite},
        [gvGammaRed]:     {dial: 14, display: 14, label: 'R',  color: colorRed,    displayScaling: x2562Pct},
        [gvGammaGreen]:   {dial: 15, display: 15, label: 'G',  color: colorGreen,  displayScaling: x2562Pct},
        [gvGammaBlue]:    {dial: 16, display: 16, label: 'B',  color: colorBlue,   displayScaling: x2562Pct},
    },

    [screenFlarePed]:             // Flare / PED
    {
        'F001':           {button: 19, color: colorWhite},       // Light up Menu button 
        // [gvFlareOnOff]:   {dial:  9, display:  9, label: 'Flare OnOff',  color: colorWhite},
        [gvFlareOnOff]:   {press: 9, display:  9, label: 'Flare', toggle:true, on:1, off:0,    onColor: colorAmber, offColor: colorOff},
        [gvFlareRed]:     {dial: 10, display: 10, label: 'Flare Red',  color: colorRed,   displayScaling: x2562Pct},
        [gvFlareGreen]:   {dial: 11, display: 11, label: 'Flare Green',  color: colorGreen, displayScaling: x2562Pct},
        [gvFlareBlue]:    {dial: 12, display: 12, label: 'Flare Blue',  color: colorBlue,  displayScaling: x2562Pct},
        [gvPedMaster]:    {dial: 13, display: 13, display_2: 28, label: 'PED Master',  color: colorWhite, displayScaling: x4k2Pct, setScale: 7},
        [gvPedRed]:       {dial: 14, display: 14, label: 'PED Red',  color: colorRed,   displayScaling: x2562Pct},     
        [gvPedGreen]:     {dial: 15, display: 15, label: 'PED Green',  color: colorGreen, displayScaling: x2562Pct},
        [gvPedBlue]:      {dial: 16, display: 16, label: 'PED Blue' ,  color: colorBlue,  displayScaling: x2562Pct},
    },



    [screenDetailKnee]:             // Detail / Knee
    {
        'CC001': {button:  21,  color: colorWhite},       // Light up Menu button 
        'M009':  {dial:  9, display:  9, label: ' ',     color: colorOff},
        'M010':  {dial: 10, display: 10, label: ' ',     color: colorOff},
        'M011':  {dial: 11, display: 11, label: ' ',     color: colorOff},
        'M012':  {dial: 12, display: 12, label: ' ',     color: colorOff},
        'M013':  {dial: 13, display: 13, label: ' ',     color: colorOff},
        'M014':  {dial: 14, display: 14, label: ' ',     color: colorOff},
        'M015':  {dial: 15, display: 15, label: ' ',     color: colorOff}, 
        'M016':  {dial: 16, display: 16, label: ' ',     color: colorOff},
        [gvCCSet]: {screenTrigger: screenCC},
    },



    [screenMatrixCC]:             // Matrix and Color Corrector
    {
        'M001':        {button: 20, color: colorWhite},       // Light up Menu button  
        [gvMatrixRG]:  {dial:  9, display:  9, label: 'R-G',  color: colorRed},
        [gvMatrixRB]:  {dial: 10, display: 10, label: 'R-B',  color: colorRed},
        [gvMatrixGR]:  {dial: 11, display: 11, label: 'G-R',  color: colorGreen},
        [gvMatrixGB]:  {dial: 12, display: 12, label: 'G-B',  color: colorGreen},
        [gvMatrixBR]:  {dial: 13, display: 13, label: 'B-R',  color: colorBlue},
        [gvMatrixBG]:  {dial: 14, display: 14, label: 'B-G',  color: colorBlue},  
        'M007':        {dial: 15, display: 15, label: ' ',    color: colorOff},
        'M008':        {dial: 16, display: 16, label: ' ',    color: colorOff},
        'CB008': {button:  1,     color: colorWhite,    screen: screenMatrixCC},
        'CB001': {button:  2,     color: colorRed,      setter: gvCCSet, parm: 0,   screen: 8880},
        'CB002': {button:  3,     color: colorYellow,   setter: gvCCSet, parm: 1,   screen: 8881},
        'CB003': {button:  4,     color: colorGreen,    setter: gvCCSet, parm: 2,   screen: 8882},
        'CB004': {button:  5,     color: colorCyan,     setter: gvCCSet, parm: 3,   screen: 8883},
        'CB005': {button:  6,     color: colorBlue,     setter: gvCCSet, parm: 4,   screen: 8884},
        'CB006': {button:  7,     color: colorMagenta,  setter: gvCCSet, parm: 5,   screen: 8885},
        [gvCCSet]: {screenTrigger: screenCC},
    },

   8880:
    {
        'CC001': {button:  buttonMatrixCC,  color: colorWhite},       // Light up Menu button 

        [gvCCSet]: {screenTrigger: screenCC},
        741:    {dial:  9, display:  9, label: 'Color', color: colorRed},
        742:    {dial: 10, display: 10, label: 'Width', color: colorRed},
        743:    {dial: 11, display: 11, label: 'Hue',   color: colorRed},
        744:    {dial: 12, display: 12, label: 'Sat',   color: colorRed, displayScaling: x4k2Pct},
        745:    {dial: 13, display: 13, label: 'Lum',   color: colorRed, displayScaling: x4k2Pct},
        'CB010':{dial: 14, display: 14, label: ' ',     color: colorOff},
        'CB011':{dial: 15, display: 15, label: ' ',     color: colorOff},
        'CB012':{dial: 16, display: 16, label: ' ',     color: colorOff},
        'CB008': {button:  1,     color: colorWhite,    screen: screenMatrixCC},
        'CB001': {button:  2,     color: colorRed,      setter: gvCCSet, parm: 0},
        'CB002': {button:  3,     color: colorYellow,   setter: gvCCSet, parm: 1},
        'CB003': {button:  4,     color: colorGreen,    setter: gvCCSet, parm: 2},
        'CB004': {button:  5,     color: colorCyan,     setter: gvCCSet, parm: 3},
        'CB005': {button:  6,     color: colorBlue,     setter: gvCCSet, parm: 4},
        'CB006': {button:  7,     color: colorMagenta,  setter: gvCCSet, parm: 5},
    },

    8881:
    {
        'CC001': {button:  buttonMatrixCC,  color: colorWhite},       // Light up Menu button 

        [gvCCSet]: {screenTrigger: screenCC},
        741:    {dial:  9, display:  9, label: 'Color', color: colorYellow},
        742:    {dial: 10, display: 10, label: 'Width', color: colorYellow},
        743:    {dial: 11, display: 11, label: 'Hue',   color: colorYellow},
        744:    {dial: 12, display: 12, label: 'Sat',   color: colorYellow, displayScaling: x4k2Pct},
        745:    {dial: 13, display: 13, label: 'Lum',   color: colorYellow, displayScaling: x4k2Pct},
        'CB010':{dial: 14, display: 14, label: ' ',     color: colorOff},
        'CB011':{dial: 15, display: 15, label: ' ',     color: colorOff},
        'CB012':{dial: 16, display: 16, label: ' ',     color: colorOff},
        'CB008': {button:  1,     color: colorWhite,    screen: screenMatrixCC},
        'CB001': {button:  2,     color: colorRed,      setter: gvCCSet, parm: 0},
        'CB002': {button:  3,     color: colorYellow,   setter: gvCCSet, parm: 1},
        'CB003': {button:  4,     color: colorGreen,    setter: gvCCSet, parm: 2},
        'CB004': {button:  5,     color: colorCyan,     setter: gvCCSet, parm: 3},
        'CB005': {button:  6,     color: colorBlue,     setter: gvCCSet, parm: 4},
        'CB006': {button:  7,     color: colorMagenta,  setter: gvCCSet, parm: 5},
    },

    8882:
    {
        'CC001': {button:  buttonMatrixCC,  color: colorWhite},       // Light up Menu button 

        [gvCCSet]: {screenTrigger: screenCC},
        741:    {dial:  9, display:  9, label: 'Color', color: colorGreen},
        742:    {dial: 10, display: 10, label: 'Width', color: colorGreen},
        743:    {dial: 11, display: 11, label: 'Hue',   color: colorGreen},
        744:    {dial: 12, display: 12, label: 'Sat',   color: colorGreen, displayScaling: x4k2Pct},
        745:    {dial: 13, display: 13, label: 'Lum',   color: colorGreen, displayScaling: x4k2Pct},
        'CB010':{dial: 14, display: 14, label: ' ',     color: colorOff},
        'CB011':{dial: 15, display: 15, label: ' ',     color: colorOff},
        'CB012':{dial: 16, display: 16, label: ' ',     color: colorOff},
        'CB008': {button:  1,     color: colorWhite,    screen: screenMatrixCC},
        'CB001': {button:  2,     color: colorRed,      setter: gvCCSet, parm: 0},
        'CB002': {button:  3,     color: colorYellow,   setter: gvCCSet, parm: 1},
        'CB003': {button:  4,     color: colorGreen,    setter: gvCCSet, parm: 2},
        'CB004': {button:  5,     color: colorCyan,     setter: gvCCSet, parm: 3},
        'CB005': {button:  6,     color: colorBlue,     setter: gvCCSet, parm: 4},
        'CB006': {button:  7,     color: colorMagenta,  setter: gvCCSet, parm: 5},
    },

    8883:
    {
        'CC001': {button:  buttonMatrixCC,  color: colorWhite},       // Light up Menu button 

        [gvCCSet]: {screenTrigger: screenCC},
        741:    {dial:  9, display:  9, label: 'Color', color: colorCyan},
        742:    {dial: 10, display: 10, label: 'Width', color: colorCyan},
        743:    {dial: 11, display: 11, label: 'Hue',   color: colorCyan},
        744:    {dial: 12, display: 12, label: 'Sat',   color: colorCyan, displayScaling: x4k2Pct},
        745:    {dial: 13, display: 13, label: 'Lum',   color: colorCyan, displayScaling: x4k2Pct},
        'CB010':{dial: 14, display: 14, label: ' ',     color: colorOff},
        'CB011':{dial: 15, display: 15, label: ' ',     color: colorOff},
        'CB012':{dial: 16, display: 16, label: ' ',     color: colorOff},
        'CB008': {button:  1,     color: colorWhite,    screen: screenMatrixCC},
        'CB001': {button:  2,     color: colorRed,      setter: gvCCSet, parm: 0},
        'CB002': {button:  3,     color: colorYellow,   setter: gvCCSet, parm: 1},
        'CB003': {button:  4,     color: colorGreen,    setter: gvCCSet, parm: 2},
        'CB004': {button:  5,     color: colorCyan,     setter: gvCCSet, parm: 3},
        'CB005': {button:  6,     color: colorBlue,     setter: gvCCSet, parm: 4},
        'CB006': {button:  7,     color: colorMagenta,  setter: gvCCSet, parm: 5},
    },

    8884:
    {
        'CC001': {button:  buttonMatrixCC,  color: colorWhite},       // Light up Menu button 

        [gvCCSet]: {screenTrigger: screenCC},
        741:    {dial:  9, display:  9, label: 'Color', color: colorBlue},
        742:    {dial: 10, display: 10, label: 'Width', color: colorBlue},
        743:    {dial: 11, display: 11, label: 'Hue',   color: colorBlue},
        744:    {dial: 12, display: 12, label: 'Sat',   color: colorBlue, displayScaling: x4k2Pct},
        745:    {dial: 13, display: 13, label: 'Lum',   color: colorBlue, displayScaling: x4k2Pct},
        'CB010':{dial: 14, display: 14, label: ' ',     color: colorOff},
        'CB011':{dial: 15, display: 15, label: ' ',     color: colorOff},
        'CB012':{dial: 16, display: 16, label: ' ',     color: colorOff},
        'CB008': {button:  1,     color: colorWhite,    screen: screenMatrixCC},
        'CB001': {button:  2,     color: colorRed,      setter: gvCCSet, parm: 0},
        'CB002': {button:  3,     color: colorYellow,   setter: gvCCSet, parm: 1},
        'CB003': {button:  4,     color: colorGreen,    setter: gvCCSet, parm: 2},
        'CB004': {button:  5,     color: colorCyan,     setter: gvCCSet, parm: 3},
        'CB005': {button:  6,     color: colorBlue,     setter: gvCCSet, parm: 4},
        'CB006': {button:  7,     color: colorMagenta,  setter: gvCCSet, parm: 5},
    },

    8885:
    {
        'CC001': {button:  buttonMatrixCC,  color: colorWhite},       // Light up Menu button 

        [gvCCSet]: {screenTrigger: screenCC},
        741:    {dial:  9, display:  9, label: 'Color', color: colorMagenta},
        742:    {dial: 10, display: 10, label: 'Width', color: colorMagenta},
        743:    {dial: 11, display: 11, label: 'Hue',   color: colorMagenta},
        744:    {dial: 12, display: 12, label: 'Sat',   color: colorMagenta, displayScaling: x4k2Pct},
        745:    {dial: 13, display: 13, label: 'Lum',   color: colorMagenta, displayScaling: x4k2Pct},
        'CB010':{dial: 14, display: 14, label: ' ',     color: colorOff},
        'CB011':{dial: 15, display: 15, label: ' ',     color: colorOff},
        'CB012':{dial: 16, display: 16, label: ' ',     color: colorOff},
        'CB008': {button:  1,     color: colorWhite,    screen: screenMatrixCC},
        'CB001': {button:  2,     color: colorRed,      setter: gvCCSet, parm: 0},
        'CB002': {button:  3,     color: colorYellow,   setter: gvCCSet, parm: 1},
        'CB003': {button:  4,     color: colorGreen,    setter: gvCCSet, parm: 2},
        'CB004': {button:  5,     color: colorCyan,     setter: gvCCSet, parm: 3},
        'CB005': {button:  6,     color: colorBlue,     setter: gvCCSet, parm: 4},
        'CB006': {button:  7,     color: colorMagenta,  setter: gvCCSet, parm: 5},
    },


    [screenHdr]:             // HDR
    {
        'HD001': {button:  buttonHdr, color: colorWhite},       // Light up Menu button  
        'CB001': {button:  buttonSuper, color: colorWhite},       // Light up sub screen "1" button  
        'CB002': {button:  buttonSub,   color: colorOff, screen: screenHdrSub},          
        [gvHdrStd]:    {dial:  9, display:  9, label: 'HDR Std',  color: colorWhite},
        [gvHdrOut]:    {dial: 10, display: 10, label: 'HDR Out',  color: colorWhite},
        [gvHdrGamBrkHi]:    {dial: 11, display: 11, label: '% Hi',     color: colorWhite},
        [gvHdrHigh]:    {dial: 12, display: 12, label: 'Pt Hi',    color: colorWhite}, 
        [gvHdrClipLvl]:    {dial: 14, display: 14, label: 'HDR Clip', color: colorWhite},
        'HD005': {dial: 13, display: 13, label: ' ',         color: colorOff},
        [gvHdrGamBrkLo]:    {dial: 15, display: 15, label: '% Low',    color: colorWhite},
        [gvHdrGamLow]:    {dial: 16, display: 16, label: 'Pt Low',   color: colorWhite},
    },


    [screenHdrSub]: {
        'HD001':     {button: buttonHdr,   color: colorWhite},       // Light up Menu button  
        'CB001':     {button: buttonSuper, color: colorOff, screen: screenHdr},       
        'CB002':     {button: buttonSub,   color: colorWhite},       // Light up sub screen "2" button  
        'HD004':     {dial:  9, display:  9, label: ' ',          color: colorOff},
        'HD005':     {dial: 10, display: 10, label: ' ',          color: colorOff},     // Clear dial attributes
        'HD006':     {dial: 11, display: 11, label: ' ',          color: colorOff},
        'HD007':     {dial: 12, display: 12, label: ' ',          color: colorOff},
        524:         {dial: 13, display: 13, label: 'SDR Level', color: colorWhite},    
        572:         {dial: 14, display: 14, label: 'SDR Clip',  color: colorWhite}, 
        'HD008':     {dial: 15, display: 15, label: ' ',          color: colorOff},
        'HD009':     {dial: 16, display: 16, label: ' ',          color: colorOff},
    },

    [screenShift]:
    {
        'S001': {button: 17, label: 'Scene 1',  color: colorWhite, setter: 4098, parm:2},
        'S002': {button: 18, label: 'Scene 2',  color: colorWhite, setter: 4098, parm:3},
        'S003': {button: 19, label: 'Scene 3',  color: colorWhite, setter: 4098, parm:4},
        'S004': {button: 20, label: 'Scene 4',  color: colorWhite, setter: 4098, parm:5},
        'S005': {button: 21, label: 'Scene 5',  color: colorWhite, setter: 4098, parm:6},
        'S006': {button: 22, label: ' ',   color: colorOff},
        'S007': {button: 25, label: 'AWB', color: colorWhite, setter: 8193, parm:true},
        'S008': {button: 26, label: 'ABB', color: colorWhite, setter: 8198, parm:true},
        'S011': {button: screenShift, color: colorWhite},                   // Light up Shift key
    },
};

const f1Layout = {

    'F017':          {button: 18, display: 'Reset Panel(s)'},
    'F018':          {button: 25, display: 'Preset ALL Cams'},

    [gvFstop]:       {dial: 53, display: 53, label: 'F',      color: colorWhite, setter: gvIris, setScale: 10, setUpScale: 100},      // Iris fine / coarse
    [gvGain]:        {dial: 54, display: 54, label: 'Gain ',  color: colorWhite, setScale: 1, setUpScale: 10},    
    [gvSensitivity]: {dial: 55, display: 55, label: 'Sens ',  color: colorWhite, range:true, rangeLow:1, rangeHi:2},            
    [gvNDFilter]:    {dial: 56, display: 56, label: 'ND ',    color: colorWhite, range:true, rangeLow:1, rangeHi:4},
}

const f2Layout = {


    'F017':          {button: 18, label: 'Reset Panel(s)'},
    'F018':          {button: 25, label: 'ALL'},
    'F030':          {button: 26, label: 'Preset 1'},
    'F031':          {button: 27, label: 'Preset 2'},
    'F032':          {button: 28, label: 'Preset 3'},
    'F033':          {button: 29, label: 'Preset 4'},


    [gvFstop]:       {dial: 37, display: 37, label: 'F',      color: colorWhite, setter: gvIris, setScale: 10, setUpScale: 100},      // Iris fine / coarse
    [gvGain]:        {dial: 38, display: 38, label: 'Gain ',  color: colorWhite, setScale: 1, setUpScale: 10},    
    [gvSensitivity]: {dial: 39, display: 39, label: 'Sens ',  color: colorWhite, range:true, rangeLow:1, rangeHi:2},            
    [gvNDFilter]:    {dial: 40, display: 40, label: 'ND ',    color: colorWhite, range:true, rangeLow:1, rangeHi:4},
}


const recallSinglePresetF1 = 49;
const recallSinglePresetF2 = 26;
const recallAllPresetF1 = 28;
const rebootF1 = 18;

                //
                // ARGV Procerssing
                //

const { program } = require('commander');
program
    .option('-f1, --fusion1Ip [ip]')
    .option('-f2, --fusion2Ip [ip]')
    .option('-r,  --rcpIp [ip]')
    .option('-m,  --monitorId [monitorId]')
    .requiredOption('-g,  --grassValleyIp [grassValleyIp]')
    .requiredOption('-b,  --birchIp [birchIp]');
program.parse(process.argv);
const options = program.opts();

if (options.fusion1Ip == undefined && options.fusion2Ip == undefined && options.rcpIp == undefined){
    console.log('error: required option -f1, --fusion1Ip [ip] OR -f2, --fusion2Ip [ip] OR -r,  --rcpIp [ip] not specified');
    process.exit(1);
}

                //
                // Grass Valley connect
                //
grassValley = require('./grass.js');
grassValleyEmitter = grassValley.connect(options.grassValleyIp);
grassValley.cameraMap = [];
grassValley.cameraCache=[];



                //
                // Birch init
                //
birch = require('./birch.js');
birchEmitter = birch.init(options.birchIp);
birchEmitter.on('initialized', () => {

    serverInit();

    birch.destinations.forEach (obj => {        
        if (options.monitorId == obj.name)
            birch.myMonitor = obj;    // Save the object that refers to monitor from command line.
    });

    if (birch.myMonitor == undefined){
        console.log('*** Monitor NOT found: ', options.monitorId )
    }
});


                //
                // Skaarhoj init
                //
const Skaarhoj = require('./skaarhoj.js');

                                            // skaarhojFusion = new Skaarhoj('10.1.43.37');
                                            // skaarhojRcp = new Skaarhoj('10.1.45.54');
if (options.fusion1Ip != undefined){
    var skaarhojFusion = new Skaarhoj(options.fusion1Ip);
    skaarhojFusion.panelVersion = 1;
    skaarhojFusion.panelLayout = f1Layout;
}

if (options.rcpIp != undefined){
    var skaarhojRcp = new Skaarhoj(options.rcpIp);
    skaarhojRcp.shiftSoloDepressed = false;
    skaarhojRcp.shiftAllDepressed = false;
}

if (options.fusion2Ip != undefined){
    var skaarhojFusion = new Skaarhoj(options.fusion2Ip);       // Fusion 1 and 2 run same code for now
    skaarhojFusion.panelVersion = 2;
    skaarhojFusion.panelLayout = f2Layout;
}

if (skaarhojFusion != undefined){
    skaarhojFusion.on('dial', (dial, movement) => {
        onDialFunction (skaarhojFusion.panelLayout, dial, movement);
    });

    skaarhojFusion.panelDialUpscaleMap = [];
    skaarhojFusion.fusionButtonMap = [];
    skaarhojFusion.fusionCamSelectButton = 0;
}

function getLayEntByHWC (layout, pressed, hwc)
{
    var layEnt = -1;

    Object.entries(layout).forEach(item => { 
        // console.log('pressed:', pressed, 'hwc:', hwc, 'item[1][hwc]:', item[1][hwc], 'item:', item);
        if (item[1][hwc] === pressed){
            layEnt = item;
            // console.log('Matched!');
        }
    });

    return layEnt;
}

skaarhojFusion.on('error', () => {           // "pressed" verb ONLY pertains to dials!
    console.log('skaarhojFusion threw error ... exiting');
    process.exit(1);        // Docker will restart this process
});

skaarhojFusion.on('press', (pressed) => {           // "pressed" verb ONLY pertains to dials!

    var layEnt = getLayEntByHWC (skaarhojFusion.panelLayout, pressed, 'dial');

    if (layEnt == -1)
        return;             // Dial not found

    if (layEnt[1].setUpScale != undefined){ // UpScale Press !!!!  Amber!
        if (skaarhojFusion.panelDialUpscaleMap[pressed] == true ){
            skaarhojFusion.panelDialUpscaleMap[pressed] = false;
            skaarhojFusion.hwcColor(pressed, layEnt[1].color);
        }
        else{
            skaarhojFusion.panelDialUpscaleMap[pressed] = true;
            skaarhojFusion.hwcColor(pressed, colorAmber);
        }
    }
});



function switchCamera()
{
        // Send GV OCP camera name to shade
        // console.log('GV OCP ' +fusionButtonMap[pressed].camera);

    if (skaarhojRcp != undefined)
        grassValley.ocpSetCamera(skaarhojFusion.fusionButtonMap[skaarhojFusion.fusionCamSelectButton].camera);

        // Send birch request route camera to shader monitor
    if (birch.myMonitor != undefined){
        birch.take(grassValley.cameraMap[skaarhojFusion.fusionButtonMap[skaarhojFusion.fusionCamSelectButton].camera].birchObj, birch.myMonitor);
    }

    grassValley.subscribe2Camera(skaarhojFusion.fusionButtonMap[skaarhojFusion.fusionCamSelectButton].camera);        // Subscribe to camera changes in iris, gain, nd, ...

        // Set button colors   red=2, green=3
    skaarhojFusion.hwcMode(skaarhojFusion.fusionCamSelectButton, modeWhite);          // set "pushed" to white
    
    if (skaarhojRcp != undefined)
        paintRCP(rcpCurrentLayout);


}

skaarhojFusion.on('button', (pressed, position) => {


            // skaarhojFusion.fusionCamSelectButton =1;
            // paintFusion(); 


    if (skaarhojFusion.fusionButtonMap[pressed]){      // Camera select button pressed ?

        if (position == 'Up'){          // Ignore button Up's on Fusion One
            return;                 
        }

        skaarhojFusion.fusionCamSelectButton = pressed;            // save the live button

        paintFusion(); 

        switchCamera();

    }
    else
    {
        if (skaarhojFusion.panelVersion == 1){

            if (position == 'Up'){          // Ignore button Up's on Fusion One
                return;                 
            }

            switch (pressed){          
                                    // Recall Single Camera Preset
                case recallSinglePresetF1:
                case recallSinglePresetF1 +1:
                case recallSinglePresetF1 +2:
                case recallSinglePresetF1 +3:

                    if (skaarhojFusion.fusionCamSelectButton){
                        grassValley.sendPresetRecall(currentCamera(), pressed -recallSinglePresetF1 +2);      // 2 => File 1
                        cameraPresetLEDs(pressed);
                    }
                    break;
                                    // Recall All CamerasPreset
                case recallAllPresetF1:
                case recallAllPresetF1 +1:
                case recallAllPresetF1 +2:
                case recallAllPresetF1 +3:

                    grassValley.cameraMap.forEach(function(obj){
                        grassValley.sendPresetRecall(obj.cameraNum, pressed -recallAllPresetF1 +2);   // 2 => File 1
                        obj.presetButton = 0;                           // Clear the camera's individual Preset
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
        else {          // skaarhojFusion.panelVersion != 1  ==> Version 2 !
            
            switch (pressed){

                case 25:
                    if (position === 'Down'){
                        skaarhojFusion.shiftAllDepressed = true;
                        skaarhojFusion.hwcMode(pressed,modeWhite);
                    }
                    else{
                        skaarhojFusion.shiftAllDepressed = false;
                        skaarhojFusion.hwcMode(pressed,modeOff);
                    }
                    break;

                case recallSinglePresetF2:
                case recallSinglePresetF2 +1:
                case recallSinglePresetF2 +2:
                case recallSinglePresetF2 +3:
                    if (skaarhojFusion.shiftAllDepressed){
                        grassValley.cameraMap.forEach(function(obj){
                            grassValley.sendPresetRecall(obj.cameraNum, pressed -recallSinglePresetF2 +2);   // 2 => File 1
                        });
                    }
                    else{
                        grassValley.sendPresetRecall(currentCamera(), pressed -recallSinglePresetF2 +2);      // 2 => File 1
                    }
                    break;
                
                case rebootF1:            // RESET ALL ... exit()
                    process.exit(1);    // program exit will cause docker to restart this
                    break;

                default:
                    console.log('Unmapped button pressed: ' +pressed);
            }
        }
    }
});


function onDialFunction(layout, dial, movement)
{

    if (!skaarhojFusion.fusionCamSelectButton)    // No camera selected ?
        return;

    Object.entries(layout).forEach(item => {  // Loop through currentLayout looking for this dial #

        var gvFuncNum = item[0];
        var layEnt = item[1];
        var cacheValue = 0;

        if (currentCamera())
            cacheValue = grassValley.cameraCache[currentCamera()][gvFuncNum];

        if (dial === layEnt.dial){         // Is the Dial that was turned?

            var setter = item[0];             // Default GV setter function code same as getter function code
            if (layEnt.setter)
                var setter = layEnt.setter;

            mult = 1;                   // default to "no" multiplier                                
            if ( ((layout === skaarhojFusion.panelLayout && skaarhojFusion.panelDialUpscaleMap[dial]) || (layout != skaarhojFusion.panelLayout && rcpDialUpscaleMap[dial]))  && layEnt.setUpScale){   // If operator pushes dial while turning - setUpScale!
                if (layEnt.setUpScale)
                    mult = layEnt.setUpScale;
            }
            else if (layEnt.setScale){
                mult = layEnt.setScale;
            }

            if (layEnt.range != undefined){        // Any special handling  level?
                                            // range? && previous/cached values ?
                if (layEnt.range && cacheValue != undefined){  
                    
                    var inc = layEnt.rangeInc;
                    if (inc == undefined)
                        inc =1;

                    var newValue = parseInt(cacheValue) +inc;
                    
                    if (newValue > layEnt.rangeHi) // Range of values like 1-4
                        newValue=layEnt.rangeLow;
                    else if (newValue < layEnt.rangeLow)
                        newValue=layEnt.rangeHi;

                    if (layEnt.displayAdjust)
                        grassValley.sendFunctionValue(setter, currentCamera(), false, newValue, +layEnt.displayAdjust);   
                    else
                        grassValley.sendFunctionValue(setter, currentCamera(), false, newValue);   

                }
            }
            else{
                // Normal "relative" Dial - incremental
                grassValley.sendFunctionValue(setter, currentCamera(), true, movement *mult );   
            }
        }
    });
}


function currentCamera()
{
    return skaarhojFusion.fusionButtonMap[skaarhojFusion.fusionCamSelectButton].camera;
}


grassValleyEmitter.on('func', (func, camera, value) => {
    if (func == gvTally)
        console.log('GV sent <== camera: ' +camera +' func: ' +func + ' value:' +value);

    if (grassValley.cameraCache[camera] == undefined)
        grassValley.cameraCache[camera] = [];

    grassValley.cameraCache[camera][func] = value;          // Save incoming GV values by camera/function code


    if (func == gvTally){           // GV sent tally change
        if (value == 1)
            skaarhojFusion.hwcMode(grassValley.cameraMap[camera].button+6, modeRed);
        else
            skaarhojFusion.hwcMode(grassValley.cameraMap[camera].button+6, modeOff);
    }

    if (func == gvActiveScene && camera == currentCamera()){        // Light up Active Scene (Preset) for displayed camera
        if (skaarhojFusion.panelVersion == 2){
            skaarhojFusion.hwcMode(recallSinglePresetF2, modeOff);
            skaarhojFusion.hwcMode(recallSinglePresetF2 +1, modeOff);
            skaarhojFusion.hwcMode(recallSinglePresetF2 +2, modeOff);
            skaarhojFusion.hwcMode(recallSinglePresetF2 +3, modeOff);
            skaarhojFusion.hwcMode(recallSinglePresetF2 + value -2, modeWhite);
        }

        if (skaarhojFusion.panelVersion == 1){
            skaarhojFusion.hwcMode(recallSinglePresetF1, modeOff);
            skaarhojFusion.hwcMode(recallSinglePresetF1 +1, modeOff);
            skaarhojFusion.hwcMode(recallSinglePresetF1 +2, modeOff);
            skaarhojFusion.hwcMode(recallSinglePresetF1 +3, modeOff);
            skaarhojFusion.hwcMode(recallSinglePresetF1 + value -2, modeWhite);
        }
    }



    if (skaarhojRcp != undefined)
        layEnt = rcpCurrentLayout[func];

    if (skaarhojFusion.fusionCamSelectButton && camera == currentCamera()){     // If this pertains to the "live" camera ...

        // console.log ('grassValleyEmitter.on', 'func', func, 'skaarhojFusion.panelLayout', skaarhojFusion.panelLayout);
        if (skaarhojFusion.panelLayout[func] != undefined){           // Update the Fusion 1 panel if this function is defined there
            skaarhojFusion.hwcLabel(skaarhojFusion.panelLayout[func].display, skaarhojFusion.panelLayout[func].label +value);
        }
        if (skaarhojRcp != undefined && layEnt != undefined){           // RCP - Does this GV function code have an entry on this screen layout?

            if (layEnt.screenTrigger != undefined){
                var newHash = layEnt.screenTrigger +value;
                paintRCP (rcpLayouts[newHash]);
            }
            else if (layEnt.press != undefined){    // Dial on/off toggle set color
                if (value == layEnt.on) {
                    skaarhojRcp.hwcColor(layEnt.press, layEnt.onColor);
                    if (layEnt.label != undefined && layEnt.display != undefined)
                        skaarhojRcp.hwcLabel(layEnt.display, layEnt.label, 'On');    
                }
                else if (value == layEnt.off) {   
                    skaarhojRcp.hwcColor(layEnt.press, layEnt.offColor);
                    if (layEnt.label != undefined && layEnt.display != undefined)
                        skaarhojRcp.hwcLabel(layEnt.display, layEnt.label, 'Off');    
                }

            }
            else if (layEnt.led != undefined){            // LED Indicator
                if (layEnt[value] != undefined){   // Is there a color corresponding to GV value?
                    skaarhojRcp.hwcMode(layEnt.led, layEnt[value]);
                }
            }
            else{                                       // Not a special Field
                if (layEnt.displayScaling){
                    skaarhojRcp.hwcLabel(layEnt.display, layEnt.label, +Math.trunc(value *layEnt.displayScaling));
                    if (layEnt.display_2)
                        skaarhojRcp.hwcLabel(layEnt.display_2, layEnt.label, +Math.trunc(value *layEnt.displayScaling));

                }
                else{
                    if (layEnt.displayAdjust){
                        skaarhojRcp.hwcLabel(layEnt.display, layEnt.label, +(parseInt(value) +layEnt.displayAdjust) );
                        if (layEnt.display_2)
                            skaarhojRcp.hwcLabel(layEnt.display_2, layEnt.label, +(parseInt(value) +layEnt.displayAdjust) );
                    }
                    else{
                        skaarhojRcp.hwcLabel(layEnt.display, layEnt.label, +value);
                        if (layEnt.display_2)
                            skaarhojRcp.hwcLabel(layEnt.display_2, layEnt.label, +value);
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

    console.log('birch sources');
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

        grassValley.cameraMap[camera] = new Object();
        grassValley.cameraMap[camera].button = button;
        grassValley.cameraMap[camera].birchObj = birch.sources[i];
        grassValley.cameraMap[camera].ndFilter = 1;    // ND filters 1-4 on GrassValley
        grassValley.cameraMap[camera].cameraNum = camera;
        grassValley.cameraMap[camera].presetButton = 0;

        skaarhojFusion.fusionButtonMap[button] = new Object();
        skaarhojFusion.fusionButtonMap[button].camera = camera;
        skaarhojFusion.fusionButtonMap[button].name = birch.sources[i].name;

        grassValley.subscribe2Camera(camera);        // Subscribe to camera changes in iris, gain, nd, ...

    } // for loop


    console.log('birch.destinations');
    console.dir(birch.destinations);

    paintFusion();

}


function paintFusion()
{
    for(i=0;i<skaarhojFusion.fusionButtonMap.length;i++){
        if(skaarhojFusion.fusionButtonMap[i]){
            skaarhojFusion.hwcMode(i, modeOff);      // set all to off
            skaarhojFusion.hwcLabel(i, skaarhojFusion.fusionButtonMap[i].camera);
        }
    }


    skaarhojFusion.hwcLabel(18, 'Reset Panel');

    if (skaarhojFusion.panelVersion == 1){
        skaarhojFusion.hwcLabel(25, 'Preset ALL Cams');
        skaarhojFusion.hwcLabel(47, 'Preset');
    }

    if (skaarhojFusion.panelVersion == 2){
        skaarhojFusion.hwcLabel(25, 'Shift ALL');
        skaarhojFusion.hwcLabel(recallSinglePresetF2, 'Preset 1');
        skaarhojFusion.hwcLabel(recallSinglePresetF2 +1, 'Preset 2');
        skaarhojFusion.hwcLabel(recallSinglePresetF2 +2, 'Preset 3');
        skaarhojFusion.hwcLabel(recallSinglePresetF2 +3, 'Preset 4');
    }

    if (skaarhojFusion.fusionCamSelectButton){
        cameraPresetLEDs(0);    // Clear all 4 then light single below
        skaarhojFusion.hwcLabel(48, skaarhojFusion.fusionButtonMap[skaarhojFusion.fusionCamSelectButton].name);
        if (grassValley.cameraMap[currentCamera()].presetButton)
            skaarhojFusion.hwcMode(grassValley.cameraMap[currentCamera()].presetButton, modeWhite);       //  White is 4
    }

    if (!skaarhojFusion.fusionCamSelectButton){    // We just started up - no camera selected
        allCamerasPresetLEDs(0);     // Clear "All Camera" preset buttons
        cameraPresetLEDs(0);        // Clear individual camera preset buttons
    }
    else{        
        Object.entries(skaarhojFusion.panelLayout).forEach(layEnt => { 
            if (grassValley.cameraCache[currentCamera()] != undefined)
                skaarhojFusion.hwcLabel(layEnt[1].display, layEnt[1].label + grassValley.cameraCache[currentCamera()][layEnt[0]]);
            if (layEnt[1].color)
                skaarhojFusion.hwcColor(layEnt[1].display, layEnt[1].color);
        });
    }
}

function cameraPresetLEDs(pressed)
{
    if (skaarhojFusion.panelVersion == 1){

        for (i=49;i<53;i++)                 // Individual Camera Preset LEDs
            skaarhojFusion.hwcMode(i, modeOff);

        if (pressed){
            skaarhojFusion.hwcMode(pressed, modeWhite);       
            grassValley.cameraMap[currentCamera()].presetButton = pressed;
        }
    } 
    else{
        for (i=recallSinglePresetF2;i<recallSinglePresetF2 +4;i++)                 // Individual Camera Preset LEDs
            skaarhojFusion.hwcMode(i, modeOff);

        if (pressed){
            skaarhojFusion.hwcMode(pressed, modeWhite);       
            grassValley.cameraMap[currentCamera()].presetButton = pressed;
        }
    }
}

function allCamerasPresetLEDs(pressed)
{
    if (skaarhojFusion.panelVersion == 1){

        for (i=28;i<32;i++){                 // All Cameras Preset LEDs
            skaarhojFusion.hwcMode(i, modeOff);
        }

        if (pressed)
            skaarhojFusion.hwcMode(pressed, modeWhite);

        cameraPresetLEDs(0);   // All cameras Profile ... clear this cameras individual Profile LEDs
    }
}


                        //
                        //
                        //
                        //
                        //
                        //  RCP  ????????????????????????????????
                        //


if (skaarhojRcp != undefined){

    var rcpCurrentLayout = {};
    var rcpDialUpscaleMap = [];               // Store Skaarhoj 'Press' state for each dial (only dials generate press events)


    function paintRCP(layout)
    {
        rcpDialUpscaleMapClear();            // Clear any dials that are in "upScale" mode

        var paintLayout = layout;

        if (layout != rcpLayouts[screenShift]){          // Don't display "common" menu on shift key
            rcpCurrentLayout = {};
            Object.assign(rcpCurrentLayout, commonLayout, layout);         // rcpCurrentLayout tells us what is on the RCP excluding Shift.
            paintLayout = rcpCurrentLayout;
        }

        Object.entries(paintLayout).forEach(item => {

            var gvFuncNum = item[0];
            var layEnt = item[1];
            if (grassValley.cameraCache[currentCamera()] == undefined)
                return;
            var cacheValue = grassValley.cameraCache[currentCamera()][gvFuncNum];

            if (layEnt.led){            // Just light up an LED with color (not a display w/label)
                if (cacheValue != undefined)
                    skaarhojRcp.hwcMode(layEnt.led, layEnt[cacheValue]);
            }
            else if (layEnt.press){            // Just light up an LED with color (not a display w/label)

                // console.log(layEnt.press);
                // console.dir(layEnt);
                // console.log(parseInt(cacheValue));

                if(parseInt(cacheValue) == layEnt.on){
                    skaarhojRcp.hwcColor(layEnt.press, layEnt.onColor);
                    if (layEnt.label != undefined && layEnt.display != undefined)
                        skaarhojRcp.hwcLabel(layEnt.display, layEnt.label, 'On');    

                }
                // else if( cacheValue == layEnt.off){
                else {
                    skaarhojRcp.hwcColor(layEnt.press, layEnt.offColor);
                    if (layEnt.label != undefined && layEnt.display != undefined){
                        if (parseInt(cacheValue) == layEnt.off)
                            skaarhojRcp.hwcLabel(layEnt.display, layEnt.label, 'Off');   
                        else 
                            skaarhojRcp.hwcLabel(layEnt.display, layEnt.label, 'Off');  
                    }

                }
            }
            else if(layEnt.dial){
                // if(layEnt.toggle != undefined){
                //     if (cacheValue === layEnt.on) 
                //         skaarhojRcp.hwcColor(layEnt.dial, layEnt.onColor);
                //     else if (cacheValue === layEnt.off)    
                //         skaarhojRcp.hwcColor(layEnt.dial, layEnt.offColor);
                // }
                if (cacheValue == undefined){
                    if (layEnt.label != undefined){
                        skaarhojRcp.hwcLabel(layEnt.display, layEnt.label, '-');    // Just a label - no value:)
                    }
                }
                else{
                    if (layEnt.displayScaling){
                        skaarhojRcp.hwcLabel(layEnt.display, layEnt.label, +Math.trunc( (cacheValue) *layEnt.displayScaling));  //???
                        if (layEnt.display_2 !=undefined)
                            skaarhojRcp.hwcLabel(layEnt.display_2, layEnt.label, +Math.trunc( (cacheValue) *layEnt.displayScaling));  //???
                    }
                    else{
                        if (layEnt.displayAdjust){
                            skaarhojRcp.hwcLabel(layEnt.display, layEnt.label, +(parseInt(cacheValue) +layEnt.displayAdjust) );
                        }
                        else{
                            skaarhojRcp.hwcLabel(layEnt.display, layEnt.label, +cacheValue);
                        }
                    }
                } 
                if (layEnt.color){
                    // console.log('calling hwcColor ' +layEnt[1].dial +' ' +layEnt[1].color +' ' +layEnt[1].label);
                    skaarhojRcp.hwcColor(layEnt.dial, layEnt.color);
                }
            }
            else if(layEnt.button){

                if (layEnt.label)
                    skaarhojRcp.hwcLabel(layEnt.button, layEnt.label);

                skaarhojRcp.hwcColor(layEnt.button, layEnt.color);
            }
        });

        skaarhojRcp.hwcLabel(buttonCamera, skaarhojFusion.fusionButtonMap[skaarhojFusion.fusionCamSelectButton].camera);

    }


    function rcpDialUpscaleMapClear()
    {
        Object.entries(rcpDialUpscaleMap).forEach(item => {  
            if (item[0] != undefined)
                skaarhojRcp.hwcColor(item[1], 129);     // Clear dial color ring
        });
        rcpDialUpscaleMap = [];
    }

                    
    skaarhojRcp.on('press', (pressed) => {      // Dial press (toggle) logic for RCP

        var layEnt = getLayEntByHWC (rcpCurrentLayout, pressed, 'press');

        if (layEnt == -1){
            layEnt = getLayEntByHWC (rcpCurrentLayout, pressed, 'dial');
            if (layEnt == -1)
                return;             
        }

        var setter = layEnt[0];

        if (layEnt[1].toggle){                       // toggle values come from GV and are sent

            var oldValue = grassValley.cameraCache[currentCamera()][setter];
            var newValue;

            if (oldValue == layEnt[1].on){
                newValue = layEnt[1].off;
            }
            else{
                newValue = layEnt[1].on;
            }

            grassValley.sendFunctionValue(setter, currentCamera(), false, newValue);   // Send newValue to GV - allow GV camera to send update
        }

        else if (layEnt[1].setUpScale != undefined){            // UpScale indicating presses

            console.log('rcpUpscale!');

            if (rcpDialUpscaleMap[pressed] == true){
                rcpDialUpscaleMap[pressed] = false;
                skaarhojRcp.hwcColor(pressed, layEnt[1].color);
            }
            else{
                rcpDialUpscaleMap[pressed] = true;
                skaarhojRcp.hwcColor(pressed, colorAmber);
            }
        }
    });



    skaarhojRcp.on('dial', (dial, movement) => {
        onDialFunction (rcpCurrentLayout, dial, movement);
    });


    skaarhojRcp.on('button', (pressed, position) => {

        if (pressed === buttonSoloShift){
            if (position === 'Down'){
                skaarhojRcp.shiftSoloDepressed = true;
                paintRCP (rcpLayouts[screenShift]);
                return;
            }
            else{
                skaarhojRcp.shiftSoloDepressed = false;
                paintRCP(rcpCurrentLayout);     // Shift key does not alter rcpCurrentLayout (see paintRCP)
                return;
            }
        }

        if (pressed === buttonAllShift){
            if (position === 'Down'){
                skaarhojRcp.shiftAllDepressed = true;
                paintRCP (rcpLayouts[screenShift]);
                return;
            }
            else{
                skaarhojRcp.shiftAllDepressed = false;
                paintRCP(rcpCurrentLayout);     // Shift key does not alter rcpCurrentLayout (see paintRCP)
                return;
            }
        }

        var layout;
        if (skaarhojRcp.shiftSoloDepressed || skaarhojRcp.shiftAllDepressed)
            layout = rcpLayouts[screenShift];
        else
            layout = rcpCurrentLayout;



        Object.entries(layout).forEach(item => {        // loop through layout to find button

            var gvFuncNum = item[0];
            var layEnt = item[1];

            if (pressed == layEnt.button){         // Is this currentLayout Button that was pressed?

                if (position === 'Down'){

                    skaarhojRcp.hwcMode(pressed, modeWhite);    // Light up the button skaarhojRcp.hwcColor(pressed, colorWhite); 

                    if (layEnt.screen){
                        paintRCP (rcpLayouts[layEnt.screen]);
                    }

                    var setter = false;

                    if (!isNaN(gvFuncNum)){        // gvFuncNum is numeric So send GV something
                        setter = gvFuncNum;
                    }
                    if (layEnt.setter){            // layout has a setter So send GV something
                        setter = layEnt.setter;
                    }

                    if (setter){
                        if (layEnt.range) {
                            var newValue = parseInt(cacheValue);

                            if (isNaN(newValue)){
                                newValue = layEnt.rangeLow;
                            }
                            else{
                                var inc = layEnt.rangeInc;
                                if (inc == undefined)
                                    inc =1;

                                newValue = newValue +inc;
                            }
                            
                            if (newValue > layEnt.rangeHi) // Range of values like 1-4
                                newValue=layEnt.rangeLow;
                            else if (newValue < layEnt.rangeLow)
                                newValue=layEnt.rangeHi;

                            console.log('button range!', 'newValue', newValue, 'layEnt', layEnt);
                            grassValley.sendFunctionValue(setter, currentCamera(), false, newValue); 
                        }
                        else{
                            if (skaarhojRcp.shiftAllDepressed){
                                grassValley.cameraMap.forEach(camera =>{
                                    grassValley.sendFunctionValue(setter, camera.cameraNum, false, layEnt.parm);  
                                });
                            }
                            else{
                                grassValley.sendFunctionValue(setter, currentCamera(), false, layEnt.parm);  
                            }
                        }
                    }
                }
            }
        });

    });

            // Let's head to Home screen at program startup
    Object.assign(rcpCurrentLayout, commonLayout, rcpLayouts[screenHome]);  

};  // End if (skaarhojRcp != undefined){


