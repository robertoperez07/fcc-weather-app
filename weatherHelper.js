// var x = document.getElementById("demo");
var parsedTemp, checked;
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(getWeather);
    } else {
        $("#location").html("Geolocation is not supported by this browser.");
    }
}

function getWeather(position){
    var weatherJson = "https://api.darksky.net/forecast/2317c7c7592305dd737c5a7af4d8465d/" + position.coords.latitude + "," + position.coords.longitude;
    getBackground(weatherJson);
    getWeatherJson(weatherJson);
}

function getBackground(weatherJson){
    $.getJSON(weatherJson, function(response) {
        // Changing background based on current weather
        switch(response.currently.icon) {
            case "clear-day":
                $('body').css('background-image', 'url(Backgrounds/clear-day.jpg)');
                break;
            case "clear-night":
                $('body').css('background-image', 'url(Backgrounds/clear-night.jpg)');
                break;
            case "partly-cloudy-day":
                $('body').css('background-image', 'url(Backgrounds/partly-cloudy-day.jpg)');
                break;
            case "partly-cloudy-night":
                $('body').css('background-image', 'url(Backgrounds/partly-cloudy-night.jpg)');
                break;
            case "cloudy":
                $('body').css('background-image', 'url(Backgrounds/cloudy.jpg)');
                break;
            case "rain":
                $('body').css('background-image', 'url(Backgrounds/rain.jpg)');
                break;
            case "sleet":
                $('body').css('background-image', 'url(Backgrounds/sleet.jpg)');
                break;
            case "snow":
                $('body').css('background-image', 'url(Backgrounds/snow.jpg)');
                break;
            case "wind":
                $('body').css('background-image', 'url(Backgrounds/wind.jpg)');
                break;
            case "fog":
                $('body').css('background-image', 'url(Backgrounds/fog.jpg)');
                break;
            // default:
            //     $('body').css('background-image', 'url(Backgrounds/clear-night.jpg)');
        }
    });
}

function getWeatherJson(weatherJson) {

    $.getJSON(weatherJson, function(response) {
        $("#location").text("Current location: " + response.timezone);
        $("#summary").text(response.currently.summary);

        // Parsing and rounding the temperature
        parsedTemp = Math.round(parseFloat(response.currently.temperature));
        $("#temperature").text(parsedTemp + "°F");

        // Adding icon based on current weather
        var iconRequest = response.currently.icon;
        var icons = new Skycons({"color": "white"});
        icons.add("icon", iconRequest);
        icons.play();
    });

}

function changeUnit() {
    if(checked) {
        $("#temperature").text(parsedTemp + "°F");
    } else {
        var newTemp = Math.round((parsedTemp - 32) * .5556);
        $("#temperature").text(newTemp + "°C");
    }
    checked = !checked;
}