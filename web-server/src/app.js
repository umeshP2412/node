const express = require('express');

const app = express()


app.get('/', (req, res) => {
    const list = `
    <h1 style='position: center'>************   Main page  ************</h1>
    <li>apple</li>
    <li>mango</li>
    <li>tomato</li>
    <li>orange</li>
    <li>berry</li>
    `
    res.send(list)
})

app.get('/home', (req, res) => {
    
    res.send('Hello Express!')
})

app.listen(3000, () => {
    console.log('Server is running... on port 3000')
})