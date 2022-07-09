const request = require('request')

const forecast = (latitude, longitude, callback) => {

    const url = 'http://api.weatherstack.com/current?access_key=d25615dfb7c2705b373b0745bab31c88&query='+ latitude +','+ longitude +'&units=f';

    request({url: url, json: true}, (error, response) => {
        if(error){
            callback('Unable to connect weather Service!', undefined);
        }
        else if(response.body.error){
            callback(response.body.error.info, undefined);
        }
        else{
            callback(undefined, {
                description: response.body.current.weather_descriptions[0],
                location: response.body.location.name,
                temperature: response.body.current.temperature,
                precipation: response.body.current.precip 
            })
        }
    })
}

module.exports = forecast