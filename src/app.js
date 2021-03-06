const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils.js/geocode')
const forecast = require('./utils.js/forecast')

const app = express()
const port = process.env.PORT || 3000

//Define paths for Express config
const PublicDiractoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static diractory to serve
app.use(express.static(PublicDiractoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        p_name: 'Sagor'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        p_name: 'Sagor'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        p_name: 'Sagor',
        message: 'This is some helpful text'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide the address!'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {

        if (error) {
            return res.send({error})
        }

        forecast(latitude, longitude, (error, forcastdata) => {

            if (error) {
                return res.send({error})
            }
            res.send({
                forecast: forcastdata,
                location,
                address: req.query.address
            })

        })
    })
})

app.get('/products', (req, res) => {

    if (!req.query.search) {
        return res.send({
            error: 'You must provide the search term'
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        p_name: 'Sagor',
        errormsg: 'Help artical not found'
    })
})
app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        p_name: 'Sagor',
        errormsg: 'Page not found'
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})