function createTripCard() {
    
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
            let fullData = {city, maxTemp, minTemp, country, daysLeft, imageURL};
            console.log(fullData);
            console.log(`Sucessfully recieved all travel data from server`)
            return {fullData};
        } catch(error){
            console.log('error', error);
        };
    };

    function updateTripCard (city, maxTemp, minTemp, country, daysLeft, imageURL) {
        
    }
}

export { createTripCard};