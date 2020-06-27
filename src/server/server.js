const dotenv = require('dotenv')
dotenv.config();

// Setup empty JS object to act as endpoint for all geoNames data
geoNamesDataArray = [];
// Setup empty JS object to act as endpoint for all weatherBit data
weatherBitDataArray = [];

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Middleware*/
const bodyParser = require('body-parser')
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('dist'));

// Setup Server
const port = 3000;
const server = app.listen(port, listening);

function listening(){
    console.log(server);
    console.log(`running on localhost: ${port}`);
};

// HTTP Routes for GeoNames API

//GET Route
app.get('/allgeonames', sendGeoData);

function sendGeoData (req, res) {
    res.send(geoNamesDataArray);
    console.log(geoNamesDataArray);
    alert('GeoNames logged');
};

// POST Route
app.post('/addgeonames', geoNamesPost);
function geoNamesPost(req, res) {
    geoNamesDataArray[geoNamesDataArray.length].lat = req.body.lat;
    geoNamesDataArray[geoNamesDataArray.length].lon = req.body.lng;
    geoNamesDataArray[geoNamesDataArray.length].country = req.body.country;
    alert('GeoNames posted');
}

// HTTP Routes for WeatherBit API

//GET Route
app.get('/allweatherdata', sendWeatherData);

function sendWeatherData (req, res) {
    res.send(geoNamesDataArray);
    console.log(geoNamesDataArray);
    console.log('GeoNames logged');
};

// POST Route
app.post('/addweatherdata', weatherBitPost);

function weatherBitPost(req, res) {
    geoNamesDataArray[geoNamesDataArray.length].city = req.body.city;
    geoNamesDataArray[geoNamesDataArray.length].maxTemp = req.body.maxTemp;
    geoNamesDataArray[geoNamesDataArray.length].minTemp = req.body.minTemp;
    geoNamesDataArray[geoNamesDataArray.length].country = req.body.country;
    console.log('weather data posted');
}