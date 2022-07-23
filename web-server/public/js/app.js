
console.log('client side');

fetch('https://puzzle.mead.io/puzzle').then((response) => {
    response.json().then((data) => {
        console.log(data)
    })
})
const address = 'ahmedabad'
fetch('https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoidW1lc2hwMjQiLCJhIjoiY2w1NnpzNnVwMW81ejNubzdtamxmcTc1OCJ9.sIqR7sReArOBkjha9a2sDQ&limit=1').then((response) => {
    response.json().then((data) => {
        const latitude = data.features[0].center[0];
        const longitude = data.features[0].center[1];
    })
}).then( () => {
    fetch("'http://api.weatherstack.com/current?access_key=d25615dfb7c2705b373b0745bab31c88&query='+ latitude +','+ longitude +'&units=m'").then((response) => {
        response.json().then((data) => {
            console.log(data)
        })
    })
})