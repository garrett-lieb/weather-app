/// 
// weather api key 4111bc800396525093c9185f5d31c8cb

// base url should look like: 
// https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={4111bc800396525093c9185f5d31c8cb}

//goecode url should look like:
// http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={4111bc800396525093c9185f5d31c8cb}

// get lat and lon from geocode api
// use lat and lon to get weather data from weather api
// display weather data on page

// get city name from user input
// get state from user input


const searchButton = $('#search-button');

var searchInput = document.querySelector('#search-input');
var searchHistory = document.querySelector('#search-history');
var currentWeather = document.querySelector('#current-weather');
var fivedayForecast = document.querySelector('#five-day-forecast');

var city = '';
var state = '';
var lat = '';
var lon = '';

$(document).ready(function() {

    $("#search-button").on("click", function(){
        console.log("button clicked");
    }
);

});