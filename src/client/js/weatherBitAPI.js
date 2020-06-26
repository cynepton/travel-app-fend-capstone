const weatherBitURLFore ='https://api.weatherbit.io/v2.0/forecast/daily?&days=1';
let sample = '&lat=30.06263&lon=31.24967';
const weatherBitURLHist = 'https://api.weatherbit.io/v2.0/history/daily?';
let sample2 = 'lat=30.06263&lon=31.24967&start_date=2020-06-24&end_date=2020-06-25';
const weatherBitAPI_KEY = `&key=${process.env.WEATHERBIT_API_KEY}`;

const travelDate = document.getElementById('travel-date');