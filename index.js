//time
function timeDisplay() {
  let today = new Date();
  let currentDay = today.getDay();
  let currentHours = today.getHours();
  let currentMinutes = today.getMinutes();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  if (currentMinutes < 10) {
    return `${days[currentDay]} ${currentHours}:0${currentMinutes}`;
  } else {
    return `${days[currentDay]} ${currentHours}:${currentMinutes}`;
  }
}
let todayDisplay = document.querySelector(".todayInfo");
todayDisplay.innerHTML = timeDisplay();

//temp display
function currentTemp(response) {
  let temp = Math.round(response.data.main.temp);
  let currentTmp = document.querySelector("#currentTmpDisplay");
  currentTmp.innerHTML = temp;
  let weather = document.querySelector(".weather");
  weather.innerHTML = response.data.weather[0].main;
  let humidity = document.querySelector(".humidity");
  humidity.innerHTML = response.data.main.humidity;
  let wind = document.querySelector(".wind");
  wind.innerHTML = response.data.wind.speed;
}
//geolocigal weather display
function currentGeoTemp(response) {
  let temp = Math.round(response.data.main.temp);
  let currentTmp = document.querySelector("#currentTmpDisplay");
  currentTmp.innerHTML = temp;
  let city = response.data.name;
  let cityName = document.querySelector("#city-name");
  cityName.innerHTML = city;
}

function showPosition(position) {
  console.log(position);
  let currentLat = position.coords.latitude;
  let currentLon = position.coords.longitude;
  let apiKey = "cc704741e03b2d531f313a53fb4c1a23";
  let unit = "metric";
  let geoWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${currentLat}&lon=${currentLon}&appid=${apiKey}&units=${unit}`;
  axios.get(geoWeatherUrl).then(currentGeoTemp);
}
navigator.geolocation.getCurrentPosition(showPosition);
let geoButton = document.querySelector("#search-geo-weather");
geoButton.addEventListener("click", showPosition);
//city display
function searchDisplay(event) {
  event.preventDefault();
  let cityName = document.querySelector("#city-name");
  let cityInput = document.querySelector("#search-city-name");
  cityName.innerHTML = cityInput.value;
  let apiKey = "cc704741e03b2d531f313a53fb4c1a23";
  let citySearch = cityInput.value;
  let unit = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${citySearch}&appid=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(currentTemp);
}
let cityDisplay = document.querySelector(".searchForm");
cityDisplay.addEventListener("submit", searchDisplay);

//C to F conversion
function fahrenheit(event) {
  event.preventDefault();
  let currentTmp = document.querySelector("#currentTmpDisplay");
  currentTmp.innerHTML = 47;
}
function celcius(event) {
  event.preventDefault();
  let currentTmp = document.querySelector("#currentTmpDisplay");
  currentTmp.innerHTML = 8;
}

let fahrenheitDisplay = document.querySelector("#fahrenheitTmp");
fahrenheitDisplay.addEventListener("click", fahrenheit);

let celciusDisplay = document.querySelector("#celciusTmp");
celciusDisplay.addEventListener("click", celcius);
