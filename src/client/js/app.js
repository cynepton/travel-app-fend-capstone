import { UserInput, TripLayout, DataRequestFromAPI, TripCardView, setTrip, StoreTrip, TripInfo} from "./APIcalls";

let projectData = {};
const SubmitForm = async (event) => {
    event.preventDefault(); 
    const { location, startDate, endDate } = UserInput();
    const { locationData, WeatherData, ImagesData } = await DataRequestFromAPI(entry);
  
    projectData = TripLayout(locationData, WeatherData, ImagesData);
  };

  const onPageLoad = async () => {document.addEventListener("DOMContentLoaded", async function () {
      const trips = await TripInfo();
      if (trips.length) {
        setTrip(trips);
        TripCardView();
      }
    });
  };

  export{SubmitForm, onPageLoad }