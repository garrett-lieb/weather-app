/// 
// weather api key 4111bc800396525093c9185f5d31c8cb

// base url should look like: 
// https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={4111bc800396525093c9185f5d31c8cb}

//goecode url should look like:
// http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={4111bc800396525093c9185f5d31c8cb}

// get lat and lon from geocode api
// use lat and lon to get weather data from weather api
// display weather data on page

var location = document.querySelector("searchInput");
var searchBtn = document.querySelector("#searchBtn");