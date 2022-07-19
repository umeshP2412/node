const path = require('path')
const express = require('express');
const hbs = require('hbs')

console.log(__dirname)
console.log(path.join(__dirname, '../public/'))

const app = express()

//Define Paths for Express config
const pubDirectoryPath = path.join(__dirname, '../public/');
const viewsPath = path.join(__dirname,'../templates/views');
const partialPath = path.join(__dirname,'../templates/partials');

//Setup handlebar engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialPath)

//Setup static directory to serve
app.use(express.static(pubDirectoryPath))

app.get('', (req, res) => {
    res.render('index',{
        title: 'Weather',
        name: 'Umesh'
    })
})

app.get('/about', (req, res) => {
    res.render('about',{
        title: 'About',
        name: 'Umesh',
        imgPath: 'img/1.jpg'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        name: 'Umesh',
        title: 'Help',
        mobileNum: +91-9558829646,
        email: 'umeshpatil2412@gmail.com',
        msg: 'Cutomer Satisfaction is our top most priority!'
    })
})


app.get('/weather', (req, res) => {
    
    res.send({
        forecast: 35,
        location: 'Ahmedabad'
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Umesh',
        errorMsg: 'Help article not found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Umesh',
        errorMsg: 'Page not found'
    })
})

app.listen(3000, () => {
    console.log('Server is running... on port 3000')
})