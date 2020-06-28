const dotenv = require('dotenv');
dotenv.config();

// Setup empty JS object to act as endpoint for all geoNames data
let geoNamesDataArray = [];
// Setup empty JS object to act as endpoint for all weatherBit data
let travelDataArray = [];

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
    res.send(`Geonames coordinates data successfully received by server at /addgeonames: ${requestBody}`);
    console.log('--------GeoNames POSTed-------');
}

// HTTP Routes for WeatherBit API

//GET Route
app.get('/allweatherdata', sendWeatherData);

function sendWeatherData (req, res) {
    res.send(travelDataArray);
    console.log(travelDataArray);
    console.log('--------------Weather data sent to pixabay API-----------------');
};

// POST Route
app.post('/addweatherdata', weatherBitPost);

function weatherBitPost(req, res) {
    let weatherData = {city:req.body.city, maxTemp:req.body.maxTemp, minTemp:req.body.minTemp, country:req.body.country, days:req.body.days, imageURL:'empty'};
    travelDataArray[travelDataArray.length] = weatherData;
    console.log(travelDataArray);
    res.send(`Weather Data containing:city, max temperature, min Temperature, country, days until travel date has been received by the server at /addweatherdata`)
    console.log('----------------weather data posted----------------');
}

// HTTP Routes for Pixabay API

// POST Route
app.post('/addimagelink', addPixabayLink);

function addPixabayLink(req, res) {
    let imageLink = req.body;
    let imageURL = imageLink.imageURL;
    travelDataArray[travelDataArray.length - 1].imageURL = imageURL;
    console.log(travelDataArray);
    res.send(`Image Data has been added to the travel information on the server`)
    console.log('----------------Image Link added to Server ----------------');
}

// HTTP Routes for UI Updates
app.get('/alltraveldata', sendTravelData);

function sendTravelData (req, res) {
    res.send(travelDataArray);
    console.log(travelDataArray);
    console.log('--------------Weather data sent to Trip card maker-----------------');
};

module.exports = server