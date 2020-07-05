
const path = require('path');
const express = require('express')
const hbs = require('hbs')

const request = require('request');

const app = express()
const port = process.env.PORT || 3003


//Define paths for Express config
const publicDirectory = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath)




//Setup static directory to serve
app.use(express.static(publicDirectory));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather Today',
        name: 'Sanjay Kannan'
    });
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Author',
        name: 'Sanjay Kannan'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        description: 'How may i help you??',
        title: 'Help',
        name: 'Sanjay Kannan'
    })
})

app.get('/weather', (req, res) => {
    console.log({ val: req.query.address });
    if (!req.query.address) {
        return res.send({
            error: 'You must provide address'
        })
    }

    const url = `http://api.weatherstack.com/current?access_key=8ab24b278f7c0a52929ee032cbf7c5e9&query=${req.query.address}`;

    request({ url: url, json: true }, (error, response, body) => {
        if (body.error) {
            //console.log('Unable to connect to weather app')
            //console.error('error:', error); // Print the error if one occurred
            return res.send({
                error: 'Provided address is not valid'
            })
        } else {
            console.log('body:', body); // Print the HTML for the Google homepage.
            res.render('weather', {
                place: body.location.name,
                weather: body.current.weather_descriptions[0],
                icon: body.current.weather_icons[0],
                address: req.query.address,
                location: body.location.country,
                state: body.location.region,
                time_zone: body.location.timezone_id,
            })
        }
    });
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404 Help',
        name: 'Sanjay Kannan',
        errorMessage: 'Help article not found'
    })
})

app.get('/about/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Sanjay Kannan',
        errorMessage: 'About page not found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Sanjay Kannan',
        errorMessage: 'Page not found'
    })
})


app.listen(port, () => {
    console.log('Server started on port ' + port);
})