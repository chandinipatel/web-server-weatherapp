const express = require('express');
const hbs = require('hbs');
const path = require('path');
const { forecast } = require('./utils/forecast');
const { geocode } = require('./utils/geocode');
require('./utils/forecast');
require('./utils/geocode');

const app = express();
//define paths for express configuration
const publicDirectoryPath =path.join(__dirname, '..', 'public');
const viewsPath = path.join(__dirname, '..', 'templates', 'views');
const partialsPath = path.join(__dirname, '..', 'templates', 'partials');

//setup static directory to serve
app
.set('view engine', 'hbs')
.set('views', viewsPath)
hbs.registerPartials(partialsPath);

app
.use(express.static(publicDirectoryPath)) //if we dont use this then
.get('', (req, res) => {
    res.render('index', {
        title: "weather app",
        name: "Chandini patel"
    });
})
app
.get('/help', (req, res) => {
    res.render('help', {
        name: "Nrupen Patel!",
        title:'Please help!'
    });

})

.get('/about', (req, res) => {
    res.render('about', {
        title:'About',
        name: "Nrupen Patel!",
        FooterMessage: `Created by ${this.name}`
    });
})

.get('/weather', (req, res) => {
    debugger;
    if(!req.query.address) {
        return res.send({
            error: 'you must provide a valid address'
        })

    }
    geocode(req.query.address, (err, {lat, lon, loc} = {}) => {
        if(err){
           return res.send({
                err
            })
        }
        forecast(lat, lon, (err, forecastdata) => {
            if(err){
                return res.send({
                    err
                })
            }
            res.send({
                forecastdata,
                loc,
                address:req.query.address
            })
        })
    })
})

.get('/product', (req, res) => {
    if(!req.query.search) {
        return res.send({
            error: 'you must provide a search term'
        })

    }

    console.log(req.query.search)
    res.send({
        product: []
})
})



.get('/help/*', (req, res) => {
    res.render('404', {
        error_message: 'Help article not found!',
        name: 'Nrupen patel'
    })
})

.get('*', (req, res) => {
    res.render('404', {
        error_message: 'Page not found!',
        name: 'Nrupen patel'
    });
})

app.listen(3000, () => {
    console.log('server is up and running on port');
});


