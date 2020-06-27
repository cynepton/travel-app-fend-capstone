var path = require('path')
const express = require('express')
const bodyParser =  require('body-parser')
const cors = require("cors")
const app = express();

app.use(express.static('dist'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors());

console.log(__dirname);
let Trips = [];
app.get('/', function (req, res) {
    // res.sendFile('dist/index.html')
    res.sendFile('dist/index.html')
});
// designates what port the app will listen to for incoming requests
app.listen(8000, () => {
    console.log('Travel app listening on port 8000!')
});
app.get("/trips", function (req, res){
    res.status(200).json(Trips)
});

app.post('/trips', function (req,res){
    Trips.push(req.body);
    res.status(200).json(Trips);
})