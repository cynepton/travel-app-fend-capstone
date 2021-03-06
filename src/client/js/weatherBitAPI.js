function weatherBitAPI() {
    console.log(`Geoname sucessfully called the weatherBit function`);
    const weatherBitURLFore ='https://api.weatherbit.io/v2.0/forecast/daily?';
    const weatherBitURLHist = 'https://api.weatherbit.io/v2.0/history/daily?';
    const weatherBitAPI_KEY = `&key=9d252e08a94748fe8fb6a4471704085c`;

    /**
     * This function returns a date certain days later than the initial date
     * 
     * @param {string} date - initial Date initiated with parameter = new Date() in format: Thu Jul 01 1999 00:00:00 GMT+0100 (West Africa Standard Time
     * @param {number} days - number of days to add
     * 
     * Source: https://codewithhugo.com/add-date-days-js/
     */
    function addDays(date, days) {
        const copy = new Date(Number(date));
        copy.setDate(date.getDate() + days);
        return copy;
    }

    const travelDate = document.getElementById('travel-date');
    let startDate = travelDate.value;
    let startDateString = new Date(startDate);

    const generateButton = document.getElementById('generate-button');


    async function fetchGeoNamesData() {
        const req = await fetch ('http://localhost:3000/allgeonames');
        try{
            let allGeoNameData = await req.json();
            let geoArrayLength = allGeoNameData.length;
            let lastEntry = allGeoNameData[geoArrayLength - 1];
            let lat = lastEntry.lat;
            let lon = lastEntry.lon;
            let country = lastEntry.country;
            console.log('Latitude, Longitude: ' + [lat, lon]);
            console.log(`Sucessfully recieved longitue and Latitude values from server`)
            return {lat, lon, country};
        } catch(error){
            console.log('error', error);
        };
    };

    /**
         * POSTs the data body to the url server
         * @param {string} url - URL http://localhost:3000/addweatherdata that sends the data body as an HTTP POST request to the serverside `server.js` file
         * @param {json} data - JSON data containing {city, maxTemp, minTemp, country}
        */
    async function postWeatherData(url = '', data = {}) {
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
            let serverResponse = await res.text();
            console.log(serverResponse);
            // return serverResponse;
        }catch (error){
            console.log("error", error);
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
    function newWeatherBitData(e){
        
        let d = new Date();
        let currentWeekDay = d.getDay();
        let currentDay = d.getDate();
        let currentMonth = d.getMonth() + 1;
        let currentYear = d.getFullYear();
        let currentTime = d.getTime();

        let userDepartureDate = new Date(startDate);
        let userTime = userDepartureDate.getTime();
        
        let diffInMilSec = Math.abs(userTime - currentTime);
        let diffInDays = Math.ceil(diffInMilSec/(1000*60*60*24));

        let endDateString = addDays(startDateString, 1);
        let endDay = endDateString.getDate();
        let endMonth = endDateString.getMonth() + 1;
        let endYear = endDateString.getFullYear();

        let endDate = `${endYear}-${endMonth}-${endDay}`;
        console.log(startDate, endDate);

        /**
         * Async function to get coordinates data from WeatherBit.
         * This function receives the concatenated URL as input and returns the JSON Object from WeatherBit
         * @param {string} url - concatenated url for weatherbit api
         * @param {string} countryName - countryname received from geoNames data
        */
        async function getWeatherBitData(url = '', countryName = '') {
            // wait for response from weatherbit
            const res = await fetch(url);
            try{
                // store response in variable data
                let weather = await res.json();
                console.log('weather from weather bit: ' + weather);
                console.log(`weather information received from WeatherBit API`)
                let city = weather.city_name;
                let country = countryName
                let maxTemp;
                let minTemp;
                if (diffInDays < 17) {
                    maxTemp = weather.data[diffInDays - 1].max_temp;
                    minTemp = weather.data[diffInDays - 1].min_temp; 
                } else {
                    maxTemp = weather.data[0].max_temp;
                    minTemp = weather.data[0].min_temp;
                }

                let weatherData = {"city":city, "maxTemp":maxTemp, "minTemp":minTemp, "country":country, "days":diffInDays}
                postWeatherData('http://localhost:3000/addweatherdata', weatherData).then(function (data) {
                    Client.pixabayAPI();
                });
            } catch(error){
                // send errors to JS console
                console.log("Error:", error);
            }
        }

        if (diffInDays < 17) {
            fetchGeoNamesData().then(function(coordinates) {
                getWeatherBitData(`${weatherBitURLFore}lat=${coordinates.lat}&lon=${coordinates.lon}${weatherBitAPI_KEY}`, coordinates.country)
            })
        } else {
            fetchGeoNamesData().then(function(coordinates) {
                getWeatherBitData(`${weatherBitURLHist}lat=${coordinates.lat}&lon=${coordinates.lon}&start_date=${startDate}&end_date=${endDate}${weatherBitAPI_KEY}`, coordinates.country)
            })
        }
    }

    newWeatherBitData();
}

export {weatherBitAPI};