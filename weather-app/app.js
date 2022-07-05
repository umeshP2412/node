const readline = require('readline');
const request = require('request')

// const r1 = readline.createInterface({
//     input: process.stdin,
//     output: process.stdout,
// });

// function getLatLong(location){
//     const urlLoc = location.replace(' ', '%20')
//     console.log(urlLoc);

// }

// r1.question("Give location: ", (location) =>{
//     const urlLoc = location.replace(new RegExp(' ', 'g'), '%20')
//     console.log(urlLoc);
//     r1.close();
// });

// const url = 'http://api.weatherstack.com/current?access_key=d25615dfb7c2705b373b0745bab31c88&query=23.0225,72.5714&units=s';


// request({url: url, json: true}, (error, response) => {
//     if(error){
//         console.log('unable to connect to weather api');
//     }
//     else if(response.body.error){
//         console.log(response.body.error.info);
//     }
//     else{
//         console.log(response.body.current.weather_descriptions[0] + '. Current Temperature of '+response.body.location.name + ' is ' +response.body.current.temperature);
//         console.log('Chance of Rain is '+ response.body.current.precip);
//     }
// })


const mapurl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/gandhinagar.json?access_token=pk.eyJ1IjoidW1lc2hwMjQiLCJhIjoiY2w1NnpzNnVwMW81ejNubzdtamxmcTc1OCJ9.sIqR7sReArOBkjha9a2sDQ&limit=1';

request({url: mapurl, json: true}, (error, response) => {
    if(error){
        console.log('Unable to connect to mapbox!');
    }
    else if(response.body.features.length){    
        const latitude = response.body.features[0].center[1];
        const longitute = response.body.features[0].center[0];
        console.log('longitute = ', longitute);
        console.log('latitude = ', latitude);
    }
    else{
        console.log('Unable to find Place! Try another Search...')
    }
})