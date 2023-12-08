

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

$(document).ready(function () {

    //display search history in list on page
    var searcharray = JSON.parse(localStorage.getItem("searcharray")) || [];
    searchHistory.innerHTML = JSON.parse(localStorage.getItem("searchHistory")) || []

    function displayTime() {
        var rightNow = dayjs().format('hh:mm A MMM DD, YYYY');
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
        $(li).on("click", function () {
            textContent = $(this).text();
            console.log(textContent);
            searchInput.value = textContent;
        });
    }
    console.log(searcharray);

    // get city name from user input
    $("#search-button").on("click", function () {
        searcharray.push(searchInput.value);
        let city = searchInput.value;
        console.log(city);
        if (searchInput.value === "") {
            return;
        }
        console.log(searchInput.value);
        searchInput.value = "";
        localStorage.setItem("searcharray", JSON.stringify(searcharray));
        console.log("button clicked");
        console.log(searcharray);
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
        function getWeather() {
            // define response
            var requestURL = 'https://api.openweathermap.org/geo/1.0/direct?q='+city+'&limit=5&appid=4111bc800396525093c9185f5d31c8cb'
            // 'http://api.openweathermap.org/geo/1.0/zip?zip=searchInput&appid=4111bc800396525093c9185f5d31c8cb'

            fetch(requestURL)
                .then(function (response) {
                    return response.json();
                })
                .then(function (data) {

                    console.log(data);

                    // get lat and lon from geocode api
                    let lat = data[0].lat;
                    let lon = data[0].lon;
                    console.log(lat);
                    console.log(lon);
                    // use lat and lon to get weather data from weather api
                    let requestURL2 = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=4111bc800396525093c9185f5d31c8cb`
                    fetch(requestURL2)
                        .then(function (response) {
                            return response.json();
                        })
                        .then (function(data){
                            console.log(data);
                        })
                    
                    // assign data [0] to current weather field
                    // assign data [5] to day 1 field
                    // assign data [13] to day 2 field
                    // assign data [21] to day 3 field
                    // assign data [29] to day 4 field
                    // assign data [37] to day 5 field
                    
                });

        }
        getWeather();
    });

});


// base url should look like: 
// 'http://api.openweathermap.org/geo/1.0/direct?q={searchInput}&limit=5&appid=4111bc800396525093c9185f5d31c8cb' 

// goecode url should look like:
// 'http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid=4111bc800396525093c9185f5d31c8cb'

// five day forecast url should look like:
// 'api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid=4111bc800396525093c9185f5d31c8cb'
