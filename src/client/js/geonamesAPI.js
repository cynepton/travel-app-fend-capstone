const geonamesUrl = 'http://api.geonames.org/searchJSON?q=';
const geonamesUrl2 = '&maxRows=1&username=';
const geoNameUsername = process.env.GEONAMES_USERNAME

const destination = document.getElementById('userDestination')
const generateButton = document.getElementById('generate-button')

/**
 * async function to get coordinates data from GeoNames
 */
async function getGeoNameData(url = '') {
    const res = await fetch(url);
    try{
        let data = await res.json();
        return data;
    } catch(error){
        // send errors to JS console
        console.log("Error:", error);
    }
}

function newGeoNamesData(e){
    let userDestination = destination.value;

    getGeoNameData(`${geonamesUrl}${userDestination}${geonamesUrl2}${geoNameUsername}`).then(
        function (data){
        postData('http://localhost:3000/addgeonames', {lat:data.geonames[0].lat, lng:data.geonames[0].lng, country:data.geonames[0].countryName})
        })    
}

async function postData(url = '', data = {}) {
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
        return newPostData;
    }catch (error){
        console.log("error", error);
    }
}

async function updateUi() {
    const req = await fetch ('http://localhost:3000//allgeonames');
    try{
        const allGeoNameData = await req.json();
        // document.getElementById('date').innerHTML = allData.date;
        // document.getElementById('temp').innerHTML = 'Temperature: ' + allData.temperature;
        // document.getElementById('content').innerHTML = allData.userResponse;
        console.log(allGeoNameData);
    }catch(error){
        console.log('error', error);
    }
}

generateButton.addEventListener('click', newGeoNamesData);
