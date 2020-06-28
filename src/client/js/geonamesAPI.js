/**
 * Main function that cntains operations on GeoNamesAPI
*/

import { weatherBitAPI } from "./weatherBitAPI";

function geoNamesAPI() {
    
    //Variables for the api URL
    const geonamesUrl = 'http://api.geonames.org/searchJSON?q=';
    const geonamesUrl2 = '&maxRows=1&username=';
    const geoNameUsername = 'cynepton';

    // Global variables for HTML Elements
    const destinationCity = document.getElementById('destination-city');
    const generateButton = document.getElementById('generate-button');

    /**
     * Async function to get coordinates data from GeoNames.
     * This function receives the concatenated URL as input and returns the JSON Object from Geonames
     * @param {string} url - concatenated url for geonames api
     */
    async function getGeoNameData(url = '') {
        // wait for response from geonames
        const res = await fetch(url);
        try{
            // store response in variable data
            let data = await res.json();
            console.log(`Geonames API link works, data has been received`);
            console.log(data);
           /*let lati = data.geonames[0].lat;
            let long = data.geonames[0].lng
            let count = data.geonames[0].countryName
            let geoData = {"lat":lati, "lng":long, "country":count}*/

            postData('http://localhost:3000/addgeonames', data)
        } catch(error){
            // send errors to JS console
            console.log("Error:", error);
        }
    }

    /**
     * This function receives the value from the users destination city input on the webpage.
     * 
     * Then ensures it is all in lowercase
     * 
     * It then calls the getGeoNameData function to collect the JSON object containing the location longitude, latitude and other information fron the api.
     * 
     * It singles out the latitude, longitude and country.
     * 
     * Then it passes the data to the postData function which then posts the Data to the server 
     * @param {*} e 
     */
    function newGeoNamesData(e){
        let destinationCityV = `${destinationCity.value}`
        let userDestination = destinationCityV.toLowerCase();

        getGeoNameData(`${geonamesUrl}${userDestination}${geonamesUrl2}${geoNameUsername}`).then(function () {
            weatherBitAPI
        })
    }

    /**
     * POSTs the data body to the url server
     * @param {string} url - URL http://localhost:3000/addgeonames that sends the data body as an HTTP POST request to the serverside `server.js` file
     * @param {json} data - JSON data containing {latitude value,longitute value,country} from newGeoNamesData function
    */
    async function postData(url = '', data) {
        const res = await fetch(url, {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': 'http://localhost:3000/'
            },
            body: JSON.stringify(data),
        });
        try{
            let newPostData = await res.json();
            console.log(newPostData);
            // console.log(`Geonames POST request works. Data has been posted to Geonames array at the server`);
            return newPostData;
        }catch (error){
            console.log("error", error);
        }
    }

    /**
     * This adds an event listener to the generate button on the website, to start calling the APIs
     */
    generateButton.addEventListener('click', newGeoNamesData);
}

/**exports the main function it will be imported by the clientside index.js */
export {geoNamesAPI};