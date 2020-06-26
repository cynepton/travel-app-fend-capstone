const dotenv = require('dotenv')
dotenv.config();

// Setup empty JS object to act as endpoint for all routes
geoNamesDataArray = [];

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

// GET Route
app.get('/allgeonames', sendData);

function sendData (req, res) {
    res.send(JSON.stringify(geoNamesDataArray));
    console.log(geoNamesDataArray);
};

// POST Route
app.post('/addgeonames', geoNamesPost);
function geoNamesPost(req, res) {
    geoNamesDataArray[geoNamesDataArray.length].lat = req.body.lat;
    geoNamesDataArray[geoNamesDataArray.length].lng = req.body.lng;
    geoNamesDataArray[geoNamesDataArray.length].country = req.body.country;
}