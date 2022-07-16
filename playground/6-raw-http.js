const http = require('http');
const url = 'http://api.weatherstack.com/current?access_key=d25615dfb7c2705b373b0745bab31c88&query=23.0225,72.5714&units=m';

const request = http.request(url, (response) => {
    let data = ''


    response.on('data', (chunk) => {
        data = data + chunk.toString()
    })

    response.on('end', () => {
        const body = JSON.parse(data);
        console.log(body)
    })

})

request.on('error', (error) => {
    console.log('Error: ',error)
})

request.end();