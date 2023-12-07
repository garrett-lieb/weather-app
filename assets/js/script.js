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

    //display search history in list on page
    var searcharray = JSON.parse(localStorage.getItem("searcharray")) ||[];
    searchHistory.innerHTML = JSON.parse(localStorage.getItem("searchHistory")) || []
    //change this to only show the last 5 searches?
    for (var i = (searcharray.length - 5); i < searcharray.length; i++) {
        var li = document.createElement("li");
        li.textContent = searcharray[i];
        searchHistory.appendChild(li);
        $(li).on("click", function(){
            textContent = $(this).text();
            console.log(textContent);
            searchInput.value = textContent;
        });
    }
    
    console.log(searcharray);
    $("#search-button").on("click", function(){
        searcharray.push(searchInput.value);
        searchInput.value = "";
        localStorage.setItem("searcharray", JSON.stringify(searcharray));
        console.log("button clicked");
        console.log(searcharray);
        console.log(searchInput.value);
        searchHistory.innerHTML = JSON.parse(localStorage.getItem("searchHistory")) || []
        
        for (var i = (searcharray.length - 5); i < searcharray.length; i++) {
            var li = document.createElement("li");
            li.textContent = searcharray[i];
            searchHistory.appendChild(li);
        }
    });

});