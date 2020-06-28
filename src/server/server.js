const dotenv = require('dotenv');
dotenv.config();

// Setup empty JS object to act as endpoint for all geoNames data
let geoNamesDataArray = [];
// Setup empty JS object to act as endpoint for all weatherBit data
let weatherBitDataArray = [];

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

console.log(__dirname);

function listening(){
    // console.log(server);
    console.log(`running on localhost: ${port}`);
    console.log(`---------------------------------------------------`);
    console.log(`***************************************************`);
    console.log(`---------------------------------------------------`)
};

// HTTP Routes for GeoNames API

//GET Route
app.get('/allgeonames', sendGeoData);

function sendGeoData (req, res) {
    res.send(geoNamesDataArray);
    console.log(geoNamesDataArray);
    console.log('------GeoNames GET request sucessful-------');
};

// POST Route
app.post('/addgeonames', geoNamesPost);
function geoNamesPost(req, res) {
    // console.log(req.body);
    let requestBodyJSON = req.body.geonames[0];
    let requestBody = {lat:requestBodyJSON.lat, lon:requestBodyJSON.lng, country:requestBodyJSON.countryName};
    console.log(requestBody);
    geoNamesDataArray[geoNamesDataArray.length] = requestBody;
    console.log(geoNamesDataArray);
    console.log('--------GeoNames POSTed-------');
}

// HTTP Routes for WeatherBit API

//GET Route
app.get('/allweatherdata', sendWeatherData);

function sendWeatherData (req, res) {
    res.send(weatherBitDataArray);
    console.log(weatherBitDataArray);
    console.log('GeoNames logged');
};

// POST Route
app.post('/addweatherdata', weatherBitPost);

function weatherBitPost(req, res) {
    weatherBitDataArray[weatherBitDataArray.length].city = req.body.city;
    weatherBitDataArray[weatherBitDataArray.length].maxTemp = req.body.maxTemp;
    weatherBitDataArray[weatherBitDataArray.length].minTemp = req.body.minTemp;
    weatherBitDataArray[weatherBitDataArray.length].country = req.body.country;
    console.log('weather data posted');
}

module.exports = server