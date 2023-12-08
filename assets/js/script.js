

// get city name from user input
// get state from user input?


const searchButton = $('#search-button');

var searchInput = document.querySelector('#search-input');
var searchHistory = document.querySelector('#search-history');
var currentWeather = document.querySelector('#current-weather');
var fivedayForecast = document.querySelector('#five-day-forecast');
var currentHour = dayjs().format("H");
var currentDay = $('#current-day');

var city = '';
var state = '';
var lat = '';
var lon = '';

$(document).ready(function() {

    //display search history in list on page
    var searcharray = JSON.parse(localStorage.getItem("searcharray")) ||[];
    searchHistory.innerHTML = JSON.parse(localStorage.getItem("searchHistory")) || []

    function displayTime() {
        var rightNow = dayjs().format('MMM DD, YYYY [at] hh:mm A');
        var dayofweek = dayjs().format('dddd');
        currentDay.text(rightNow + " " + dayofweek);
      }
      displayTime();
      setInterval(displayTime, 1000);
      
   
    for (var i = 0; i < searcharray.length; i++) {
        var li = document.createElement("li");
        li.textContent = searcharray[i];
        searchHistory.appendChild(li);
        li.style.cursor = "pointer";
        li.style.backgroundColor = "lightgrey";
        li.style.margin = "5px";
        li.style.padding = "10px";
        li.style.borderRadius = "5px";
        li.style.textAlign = "center";
        li.style.boxShadow = "5px 5px 10px grey";
        $(li).on("click", function(){
            textContent = $(this).text();
            console.log(textContent);
            searchInput.value = textContent;
        });
    }
    console.log(searcharray);

    // get city name from user input
    $("#search-button").on("click", function(){
        searcharray.push(searchInput.value);
        let city = searchInput.value;
        console.log(city);
        if (searchInput.value === "") {
            return;
        }
        searchInput.value = "";
        localStorage.setItem("searcharray", JSON.stringify(searcharray));
        console.log("button clicked");
        console.log(searcharray);
        console.log(searchInput.value);
        searchHistory.innerHTML = JSON.parse(localStorage.getItem("searchHistory")) || []
        
        for (var i = 0; i < searcharray.length; i++) {
            var li = document.createElement("li");
            li.textContent = searcharray[i];
            searchHistory.appendChild(li);
            li.style.cursor = "pointer";
            li.style.backgroundColor = "lightgrey";
            li.style.margin = "5px";
            li.style.padding = "10px";
            li.style.borderRadius = "5px";
            li.style.textAlign = "center";
            li.style.boxShadow = "5px 5px 10px grey";
        }
        
    // get city name from user input
    // get state from user input?
    // get lat and lon from geocode api
    // use lat and lon to get weather data from weather api
    // display weather data on page
    });
 

// base url should look like: 
// 'http://api.openweathermap.org/geo/1.0/direct?q={CITY}&limit=5&appid=4111bc800396525093c9185f5d31c8cb' 

// goecode url should look like:
// 'http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid=4111bc800396525093c9185f5d31c8cb'

// five day forecast url should look like:
// 'api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid=4111bc800396525093c9185f5d31c8cb'






});