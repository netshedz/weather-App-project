function refreshWeather(response) {
  let temperatureElement = document.querySelector("#temperature");
  let temperature = response.data.temperature.current;
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windSpeed = document.querySelector("#wind-speed");
  let timeElement = document.querySelector("#time");
  let date = new Date(response.data.time * 1000);
  let iconimage = document.querySelector("#icons");

  iconimage.innerHTML = `<img
                  src="${response.data.condition.icon_url}"
                  class="current-temperature-icon"
                />`;
  getForecast(response.data.city);

  cityElement.innerHTML = response.data.city;
  timeElement.innerHTML = formatDate(date);
  descriptionElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  windSpeed.innerHTML = `${response.data.wind.speed}km/h`;
  temperatureElement.innerHTML = Math.round(temperature);
}
function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "wednesday",
    "Thursday",
    "Friday",
    "Saturda",
  ];
  let day = days[date.getDay()];
  if (minutes < 18) {
    minutes = `0${minutes}`;
  }
  return `${day} ${hours}:${minutes}`;
}

function searchingCity(city) {
  let apiKey = "2f93ebcd2o4334a22af8dt6e0784500a";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(refreshWeather);
}

function searchCities(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-bar");

  searchingCity(searchInput.value);
}
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];

  return days[date.getDay()];
}

function getForecast(city) {
  let apiKey = "2f93ebcd2o4334a22af8dt6e0784500a";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function displayForecast(response) {
  let forecastHtml = "";

  response.data.daily.forEach(function (day, index) {
    if (index < 5)
      forecastHtml =
        forecastHtml +
        `<div class="weather-forecast-day">
    <div class="weather-forecast-date">${formatDay(day.time)}</div>
    <div>
    <img src="${day.condition.icon_url}"class="weather-forecast-icon"/>
    </div>
    <div class="weather-forecast-temperatures">
      <div class="weather-forecast-temperature">
        <strong>${Math.round(day.temperature.maximum)}°</strong>
      </div>
      <div class="weather-forecast-temperature">${Math.round(
        day.temperature.minimum
      )}°</div>
    </div>
  </div>`;
  });
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHtml;
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", searchCities);

searchingCity("paris");
