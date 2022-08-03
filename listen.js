
//grassValley = require('./grass2.js');
grassValley = require('./grassStream.js');
grassValleyEmitter = grassValley.connect();


function letsGo()
{
    grassValley.subscribe2Camera('7');        // Subscribe to camera changes in iris, gain, nd, ...
}

setTimeout(letsGo, 3000);
