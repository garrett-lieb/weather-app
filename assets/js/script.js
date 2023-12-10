const searchButton = $('#search-button');

var searchInput = document.querySelector('#search-input');
var searchHistory = document.querySelector('#search-history');
var currentWeather = document.querySelector('#current-weather');
var fivedayForecast = document.querySelector('#five-day-forecast');
var currentHour = dayjs().format("H");
var currentDay = $('#current-day');


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

    // display search history in list on page
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
            $(searchButton).trigger("click");
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
            // when the user clicks on a city in search history, search for that city
            $(li).on("click", function () {
                textContent = $(this).text();
                console.log(textContent);
                searchInput.value = textContent;
                $(searchButton).trigger("click");
            });
        }

        // get city name from user input
        function getWeather() {
            // define response
            var requestURLcity = 'https://api.openweathermap.org/geo/1.0/direct?q=' + city + '&limit=5&appid=4111bc800396525093c9185f5d31c8cb'

            fetch(requestURLcity)
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
                    let requestURLcurrent = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=4111bc800396525093c9185f5d31c8cb&units=imperial`
                    fetch(requestURLcurrent)
                        .then(function (response) {
                            return response.json();
                        })
                        .then(function (data) {
                            console.log(data);

                            // ------today's weather------
                           function getCurrentWeather() {
                            $("#current-weather").empty();
                            var city = data.name;
                            // ------current weather icon------
                            var iconcode = data.weather[0].icon;
                            console.log(iconcode);
                            var icon = "<img src='http://openweathermap.org/img/w/" + iconcode + ".png'>";
                            // ------current weather data------
                            var condition = data.weather[0].description;
                            var temp = data.main.temp;
                            var temp_min = data.main.temp_min;
                            var temp_max = data.main.temp_max;
                            var wind = data.wind.speed;
                            var humidity = data.main.humidity;
                            
                            $("#current-weather").append("<li>" + "City: " + city + icon + "</li>");
                            $("#current-weather").append("<li>" + "Condition: " + condition + "</li>");
                            $("#current-weather").append("<li>" + "Temp: " + temp + " deg F" + "</li>");
                            $("#current-weather").append("<li>" + "Temp Min: " + temp_min + " deg F" + "</li>");
                            $("#current-weather").append("<li>" + "Temp Max: " + temp_max + " deg F" + "</li>");
                            $("#current-weather").append("<li>" + "Windspeed: " + wind + " mph" + "</li>");
                            $("#current-weather").append("<li>" + "Humidity: " + humidity + " %" + "</li>");
                           }
                           getCurrentWeather();
                        })

                    let requestURL5day = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=4111bc800396525093c9185f5d31c8cb&units=imperial`
                    fetch(requestURL5day)
                        .then(function (response) {
                            return response.json();
                        })
                        .then(function (data) {
                            // ------five day forecast------
                            console.log(data);
                            $("#day1").empty();  
                            $("#day2").empty();
                            $("#day3").empty();
                            $("#day4").empty();
                            $("#day5").empty();                     
                    // assign data [4] to day 1 field
                    function getDay1() {
                    var city = data.city.name
                    var iconcode = data.list[4].weather[0].icon;
                    console.log(iconcode);
                    var icon = "<img src='http://openweathermap.org/img/w/" + iconcode + ".png'>";
                    var date = data.list[4].dt_txt;
                    var condition = data.list[4].weather[0].description;
                    var temp = data.list[4].main.temp;
                    var temp_min = data.list[4].main.temp_min;
                    var temp_max = data.list[4].main.temp_max;
                    var wind = data.list[4].wind.speed;
                    var humidity = data.list[4].main.humidity;

                    $("#day1").append("<li>" + "City: " + city + icon + "</li>");
                    $("#day1").append("<li>" + "Date: " + date + "</li>");
                    $("#day1").append("<li>" + "Condition: " + condition + "</li>");
                    $("#day1").append("<li>" + "Temp: " + temp + " deg F" + "</li>");
                    $("#day1").append("<li>" + "Temp Min: " + temp_min + " deg F" + "</li>");
                    $("#day1").append("<li>" + "Temp Max: " + temp_max + " deg F" + "</li>");
                    $("#day1").append("<li>" + "Windspeed: " + wind + " mph" + "</li>");
                    $("#day1").append("<li>" + "Humidity: " + humidity + " %" + "</li>");
                    }
                    getDay1();
                    
                    // assign data [12] to day 2 field
                    function getDay2() {
                    var city = data.city.name
                    var iconcode = data.list[12].weather[0].icon;
                    console.log(iconcode);
                    var icon = "<img src='http://openweathermap.org/img/w/" + iconcode + ".png'>";
                    var date = data.list[12].dt_txt;
                    var condition = data.list[12].weather[0].description;
                    var temp = data.list[12].main.temp;
                    var temp_min = data.list[12].main.temp_min;
                    var temp_max = data.list[12].main.temp_max;
                    var wind = data.list[12].wind.speed;
                    var humidity = data.list[12].main.humidity;

                    $("#day2").append("<li>" + "City: " + city + icon + "</li>");
                    $("#day2").append("<li>" + "Date: " + date + "</li>");
                    $("#day2").append("<li>" + "Condition: " + condition + "</li>");
                    $("#day2").append("<li>" + "Temp: " + temp + " deg F" + "</li>");
                    $("#day2").append("<li>" + "Temp Min: " + temp_min + " deg F" + "</li>");
                    $("#day2").append("<li>" + "Temp Max: " + temp_max + " deg F" + "</li>");
                    $("#day2").append("<li>" + "Windspeed: " + wind + " mph" + "</li>");
                    $("#day2").append("<li>" + "Humidity: " + humidity + " %" + "</li>");
                    }
                    getDay2();

                    // // assign data [20] to day 3 field
                    function getDay3() {
                    var city = data.city.name
                    var iconcode = data.list[20].weather[0].icon;
                    console.log(iconcode);
                    var icon = "<img src='http://openweathermap.org/img/w/" + iconcode + ".png'>";
                    var date = data.list[20].dt_txt;
                    var condition = data.list[20].weather[0].description;
                    var temp = data.list[20].main.temp;
                    var temp_min = data.list[20].main.temp_min;
                    var temp_max = data.list[20].main.temp_max;
                    var wind = data.list[20].wind.speed;
                    var humidity = data.list[20].main.humidity;

                    $("#day3").append("<li>" + "City: " + city + icon + "</li>");
                    $("#day3").append("<li>" + "Date: " + date + "</li>");
                    $("#day3").append("<li>" + "Condition: " + condition + "</li>");
                    $("#day3").append("<li>" + "Temp: " + temp + " deg F" + "</li>");
                    $("#day3").append("<li>" + "Temp Min: " + temp_min + " deg F" + "</li>");
                    $("#day3").append("<li>" + "Temp Max: " + temp_max + " deg F" + "</li>");
                    $("#day3").append("<li>" + "Windspeed: " + wind + " mph" + "</li>");
                    $("#day3").append("<li>" + "Humidity: " + humidity + " %" + "</li>");
                    }
                    getDay3();

                    // // assign data [28] to day 4 field
                    function getDay4() {
                    var city = data.city.name
                    var iconcode = data.list[28].weather[0].icon;
                    console.log(iconcode);
                    var icon = "<img src='http://openweathermap.org/img/w/" + iconcode + ".png'>";
                    var date = data.list[28].dt_txt;
                    var condition = data.list[28].weather[0].description;
                    var temp = data.list[28].main.temp;
                    var temp_min = data.list[28].main.temp_min;
                    var temp_max = data.list[28].main.temp_max;
                    var wind = data.list[28].wind.speed;
                    var humidity = data.list[28].main.humidity;

                    $("#day4").append("<li>" + "City: " + city + icon + "</li>");
                    $("#day4").append("<li>" + "Date: " + date + "</li>");
                    $("#day4").append("<li>" + "Condition: " + condition + "</li>");
                    $("#day4").append("<li>" + "Temp: " + temp + " deg F" + "</li>");
                    $("#day4").append("<li>" + "Temp Min: " + temp_min + " deg F" + "</li>");
                    $("#day4").append("<li>" + "Temp Max: " + temp_max + " deg F" + "</li>");
                    $("#day4").append("<li>" + "Windspeed: " + wind + " mph" + "</li>");
                    $("#day4").append("<li>" + "Humidity: " + humidity + " %" + "</li>");

                    }
                    getDay4();

                    // // assign data [36] to day 5 field
                    function getDay5() {
                    var city = data.city.name
                    var iconcode = data.list[36].weather[0].icon;
                    console.log(iconcode);
                    var icon = "<img src='http://openweathermap.org/img/w/" + iconcode + ".png'>";
                    var date = data.list[36].dt_txt;
                    var condition = data.list[36].weather[0].description;
                    var temp = data.list[36].main.temp;
                    var temp_min = data.list[36].main.temp_min;
                    var temp_max = data.list[36].main.temp_max;
                    var wind = data.list[36].wind.speed;
                    var humidity = data.list[36].main.humidity;

                    $("#day5").append("<li>" + "City: " + city + icon + "</li>");
                    $("#day5").append("<li>" + "Date: " + date + "</li>");
                    $("#day5").append("<li>" + "Condition: " + condition + "</li>");
                    $("#day5").append("<li>" + "Temp: " + temp + " deg F" + "</li>");
                    $("#day5").append("<li>" + "Temp Min: " + temp_min + " deg F" + "</li>");
                    $("#day5").append("<li>" + "Temp Max: " + temp_max + " deg F" + "</li>");
                    $("#day5").append("<li>" + "Windspeed: " + wind + " mph" + "</li>");
                    $("#day5").append("<li>" + "Humidity: " + humidity + " %" + "</li>");

                    }
                    getDay5();


                        })

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
