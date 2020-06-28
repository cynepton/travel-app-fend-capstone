function createTripCard() {

    console.log(`creating trip card ...`)
    const mainTag = document.querySelector('main');
    const eldest = document.querySelector('#header-fix');
    
    async function fetchAllTravelData() {
        const req = await fetch ('http://localhost:3000/alltraveldata');
        try{
            let allTravelData = await req.json();
            let arrayLength = allTravelData.length;
            let lastEntry = allTravelData[arrayLength - 1];
            let city = lastEntry.city;
            let maxTemp = lastEntry.maxTemp;
            let minTemp = lastEntry.minTemp;
            let country = lastEntry.country;
            let daysLeft = lastEntry.days;
            let imageURL = lastEntry.imageURL;
            let fullData = {city, maxTemp, minTemp, country, daysLeft, imageURL, arrayLength};
            console.log(fullData);
            console.log(`Sucessfully recieved all travel data from server`);
            
            console.log(`Updating UI.....`);
            updateTripCard(city, maxTemp, minTemp, country, daysLeft, imageURL, arrayLength);
            return {fullData};
        } catch(error){
            console.log('error', error);
        };
    };

    function updateTripCard (city, maxTemp, minTemp, country, daysLeft, imageURL, arrayLength) {
        let makeSection = document.createElement('section');
        makeSection.setAttribute('class', 'trip-card');
        makeSection.setAttribute('id', `trip-card${arrayLength}`);
        mainTag.appendChild(makeSection);
        

        makeSection.innerHTML = `<div class="trip-image"><img src="${imageURL}" alt="An Image of the Location" class="trip-location-image"></div><div class="trip-info"><h3 class="user-destination">Destination: ${city},${country}</h3><p class="user-travel-date">Days Left until Departure: ${daysLeft} Days</p><p class="user-weather-information">Weather Information:</p><p class="user-temperature">High: ${maxTemp} degree celsius, Low: ${minTemp} degree celsius</p><div class="trip-actions"><button>Save Trip</button><button>Remove Trip</button></div></div>`;

        /*
        `
        <div class="trip-image">
            <img src="${imageURL}" alt="An Image of the Location" class="trip-location-image">
        </div>
        <div class="trip-info">
            <h3 class="user-destination">Destination: ${city},${country}</h3>
            <p class="user-travel-date">Days Left until Departure: ${daysLeft} Days</p>
            <p class="user-weather-information">Weather Information:</p>
            <p class="user-temperature">High: ${maxTemp} degree celsius, Low: ${minTemp} degree celsius</p>
            <div class="trip-actions">
                <button>Save Trip</button>
                <button>Remove Trip</button>
            </div>

        </div>`
        */

    }
    fetchAllTravelData();
}

export { createTripCard};