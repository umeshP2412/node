const request = require('request')

const geocode = (address, callback) => {
    const mapurl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoidW1lc2hwMjQiLCJhIjoiY2w1NnpzNnVwMW81ejNubzdtamxmcTc1OCJ9.sIqR7sReArOBkjha9a2sDQ&limit=1';

    request({url: mapurl, json: true}, (error, response) => {
        if(error){
            callback('Unable to connect to location service!', undefined);
        }
        else if(response.body.features.length == 0){
            callback('Unable to find place. Try another search.', undefined)
        }
        else{
            callback(undefined, {
                latitude: response.body.features[0].center[1],
                longitude: response.body.features[0].center[0],
                location: response.body.features[0].place_name
            })
        }
    })
}


module.exports = geocode