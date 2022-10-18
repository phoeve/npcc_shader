const EventEmitter = require('events');
class MyEmitter extends EventEmitter {}
const myEmitter = new MyEmitter();

const axios = require('axios');

exports.take = take;
exports.init = init;


var isInitDone=0;

async function getBirchSources() {
  try {
    let response = await axios({
              method: 'get',
              url: 'http://172.16.3.10:4396/api/sources/',
              auth: {
                username: 'g8vpaQPS',
                password: '-ePH98SfI0Y6NgBfCLn6U'
              }
            })
              .catch(function (error) {
                // handle error
                console.log(error);
              })

              .then(function (response) {
                // handle success

                var tempArray =[];          // Filter out other campuses ??
                var lastIndex = -1;

                for (i=0; i<response.data.data.length; i++){

                    if (response.data.data[i].index == lastIndex)       // de-dup
                        continue;

                    if (response.data.data[i].index >= 100)
                        tempArray.push(response.data.data[i]);

                    lastIndex = response.data.data[i].index;
                }

                exports.sources = tempArray.sort(function(a,b){ return parseInt(a.index) - parseInt(b.index); });

                if(isInitDone++)
                    myEmitter.emit('initialized');

            });

    } catch(err) {
        console.log(err); // TypeError: failed to Get
    }
}

async function getBirchDestinations() {
  try {
    let response = await axios({
              method: 'get',
              url: 'http://172.16.3.10:4396/api/destinations/',
              auth: {
                username: 'g8vpaQPS',
                password: '-ePH98SfI0Y6NgBfCLn6U'
              }
            })
              .catch(function (error) {
                // handle error
                console.log(error);
              })

              .then(function (response) {
                // handle success

                  exports.destinations = response.data.data;
                  if(isInitDone++)
                      myEmitter.emit('initialized');

            });

    } catch(err) {
        console.log(err); // TypeError: failed to Get
    }
}


function init(){
    // console.log('birch.init()');

    isInitDone = 0;

    getBirchDestinations();
    getBirchSources();

    return myEmitter;

}


function take(source, destination){
    // console.dir('take ' +source +' to ' +destination);
    // console.dir(source);
    // console.dir(destination);

    axios({
      method: 'post',
      url: 'http://172.16.3.10:4396/api/take/',
      auth: {
        username: 'g8vpaQPS',
        password: '-ePH98SfI0Y6NgBfCLn6U'
      },
      data: {
        source: source,
        destination: destination   
      }
    })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
    
      .then(function (response) {
        // handle success
        //console.log(response);
    });
}
