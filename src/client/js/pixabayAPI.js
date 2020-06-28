const pixabayAPIURL = `https://pixabay.com/api/?key=`;
const pixabayAPIKey = `17236736-80509b302fa2b0c65e5207a1d`;
const pixabayAPIImageType = `&image_type=photo`;
const pixabayAPIOrient = `&orientation=horizontal`;
const pixabayAPICateg = `&category=travel`;
const pixabayAPIPerPage = `&per_page=3`;
const pixabaySetOptions = `${pixabayAPIImageType}${pixabayAPIOrient}${pixabayAPICateg}${pixabayAPIPerPage}`;
const sampleFullUrl = `https://pixabay.com/api/?key=17236736-80509b302fa2b0c65e5207a1d&q=paris+france&image_type=photo&orientation=horizontal&category=travel&per_page=3`;

/**
 * Async function to get images from Pixabay.
 * This function receives the concatenated URL as input and returns the JSON Object from Pixabay
 * @param {string} url - concatenated url for pixabay api
 */
async function getPixabayImage(url = '') {
    // wait for response from geonames
    const res = await fetch(url);
    try{
        // store response in variable data
        let imageData = await res.json();
        console.log(`Pixabay API link works, data has been received`);
        console.log(imageData);
        let imageCount = imageData.totalHits;
        let imageURL;
        if (imageCount > 0) {
            imageURL = imageData.hits[0].webformatURL     
        } else {
            imageURL = `https://isaac-adedoyin-personal.s3.amazonaws.com/travel-default.jpg`
        }
        console.log(`attempting to post image data to server at /addimagelink...`)
        postImage('http://localhost:3000/addimagelink', imageURL);
        return imageURL;
    } catch(error){
        // send errors to JS console
        console.log("Error:", error);
    }
}

async function fetchWeatherData() {
    const req = await fetch ('http://localhost:3000/allweatherdata');
    try{
        let allWeatherData = await req.json();
        let weatherArrayLength = allWeatherData.length;
        let lastEntry = allWeatherData[weatherArrayLength - 1];
        let city = lastEntry.lat.toLowerCase();
        let country = lastEntry.country.toLowerCase();
        console.log(city, country);
        console.log(`Sucessfully received city and country data from server`);
        return {city, country};
    } catch(error){
        console.log('error', error);
    };
};

async function postImage(url = '', imageLink) {
    const res = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'text/strings',
            'Access-Control-Allow-Origin': 'http://localhost:3000/'
        },
        body: imageLink,
    });
    try{
        let serverMessage = await res.text();
        console.log(serverMessage);
    }catch (error){
        console.log("error", error);
    }
}

function newClientData(){
    let cityCountry = fetchWeatherData();
    let city = cityCountry.city;
    let country = cityCountry.country;
    getPixabayImage(`${pixabayAPIURL}${pixabayAPIKey}&q=${city}+${country}${pixabaySetOptions}`)/*.then(function (data) {
        Client.weatherBitAPI();
    })*/
}