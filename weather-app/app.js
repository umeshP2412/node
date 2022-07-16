const forecast = require('./utils/forecast');
const geocode = require('./utils/geocode');

const locationIn = process.argv[2];

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


if(locationIn !== undefined){
        geocode(locationIn, (error, {latitude = -1, longitude = -1, location} = {}) => {

        if(error){
            // console.log(latitude, longitude)
            return console.log(error);
        }

        forecast(latitude,longitude, (error, {description, location, temperature, precipation} = {}) => {

            if(error){
                return console.log(error);
            }

            if(temperature !== undefined){
                console.log('Current temperature in '+ location + ' is ' + temperature);
                console.log('Atmosephere feels like there will be '+ description);
            }
        })
    })
}
else{
    console.log('Please provice loaction in argument')
}