// All API requests URL and key
const pixabayURL = "https://pixabay.com/api/";
const pixabayAPIKey = "16720558-a74c05b79d6778335e53df2a0";
const weatherbitURL = "https://api.weatherbit.io/v2.0/current?city=";
const weatherbitAPIKey = "d6d5d918300c4b47a97e55f28d5ddcad";
const geonamesURL = "https://secure.geonames.org/searchJSON?formatted=true&q=";
const geonamesUsername = "Idreez";

// Get Image data from Pixabay
const ImageFromPixabay = async (picture) => {
    try{
        const ImageEndPoint = `${pixabayURL}?key=${pixabayAPIKey}&q=${picture}&image_type=photo&pretty=true&category=places`;
        const res = await fetch(ImageEndPoint);
        return res.json();
    }catch(error){
        console.log("error", error);
    }
};
// Get weather Information from WeatherBit
const WeatherInfo = async (entry) => {
    if (!entry) alert("Enter a valid city");
    const WeatherOutput = `${weatherbitURL}${entry}&key=${weatherbitAPIKey}`;
    try{
        const res = await fetch(WeatherOutput);
        return res.json();
    }catch (error){
        console.log("error", error);
    }
};
// Get Location and geographical specifics from geonames
const CityLocation = async (entry) => {
    if (!entry) alert("Enter a valid city");
    const GeoLocation = `${geonamesURL}${entry}&username=${geonamesUsername}`;
    try{
        const res = await fetch (GeoLocation);
        return res.json();
    }catch (error){
        console.log("error", error);
    }
};

// Getting an origin point for the request
let TripInfo = async (url = '', data = {}) => {
  const response = await fetch(url, {
      method: 'POST',
      credentials: 'same-origin',
      headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': "http://localhost:8081/"
      },
      body: JSON.stringify(data)
  })
  try {
      const trips = await response.json();
      return trips
    } catch (error) {
      console.log("error", error);
    }
  };
  
  //Ask for user input
  const UserInput = () => {
    const location = document.getElementById("location").value.toLowerCase();
    const startDate = document.getElementById("startDate").value.split("-").join("/");
    const endDate = document.getElementById("endDate").value.split("-").join("/");
    return { location, startDate, endDate};
  };

  // How the trip card is being built internally
const TripLayout= ( locationData, WeatherData,ImagesData ) => {
    return {
      city: locationData.geonames[0].toponymName,
      country: locationData.geonames[0].countryName,
      weather: WeatherData.data[0].weather,
      weather: {
        ...WeatherData.data[0].weather,
        temp: WeatherData.data[0].temp,
      },
      imageURL: ImagesData.hits[0].largeImageURL,
      startDate: UserInput().startDate,
      endDate: UserInput().endDate,
      duration: TripDuration(),
    }
  };

  // Data request from the web API 
  const DataRequestFromAPI = async (entry) => {
    const geonamesData = await CityLocation(entry);
  
    if (!geonamesData.totalResultsCount) alert("City is invalid!");
  
    let [weatherData, ImagesInfo] = await Promise.all([
      WeatherInfo(entry),
      ImageFromPixabay(entry),
    ]);
  
    if (!ImagesInfo.totalHits) {
      ImagesInfo = await ImageFromPixabay(geonamesData.geonames[0].countryName);
    }
  
    return { geonamesData, weatherData, ImagesInfo };
  };

  // Calculate the trip duration effectively
  const TripDuration = () => {
    const { startDate, endDate } = UserInput();
    const starting = new Date(startDate);
    const finish = new Date(endDate);
    return Math.ceil(Math.abs(finish - starting) / (1000 * 60 * 60 * 24));
  };

// Store the trips data
const setTrip = (trip) => {
    localStorage.removeItem("trip");
    localStorage.setItem("trip", JSON.stringify(trip));
  };
let StoreTrip = () => {
    return JSON.parse(localStorage.getItem("trips"));
  };

//How the trip card looks
const TripCardView = (trip) => {
  document.getElementById("new-trip").style.display = "flex";
 
  const tripCard = document.getElementById("new-trip-box");
    tripCard.textContent = "";
    const newElement = document.createElement("div");
    newElement.innerHTML = `
            <div class="trip-image-box">
              <img class="trip-image" src="${trip.imageURL}" alt="logo">
            </div>
            <div class="trip-card-box">
              <p>${trip.city}, ${trip.country} </p>
              <p> Trip duration: ${trip.duration} days</p>
              <p> Departure:${trip.startDate}</p>
              <p> Arrival: ${trip.endDate}</p>
  
            <div class="trip-weather-info">
              <h2>Weather Predictions:</h2>
                          <img class="weather-icon" src="https://www.weatherbit.io/static/img/icons/${trip.weather.icon}.png" alt="weather-icon">${trip.weather.temp.toFixed()} °C, ${trip.weather.description}
            </div>
            <button class="add-button">Add trip</button>
         `;
  
    newElement.classList.add("trip__card"); 
    tripCard.appendChild(newElement);
  };

// Export the function so they can be used elsewhere
export{ UserInput, TripLayout, DataRequestFromAPI, TripCardView,
      setTrip, StoreTrip, TripInfo
}

 

