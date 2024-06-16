function refreshWeather(response) {
  let temperatureElement = document.querySelector("#temperature");
  let temperature = response.data.temperature.current;
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windSpeed = document.querySelector("#wind-speed");
  let timeElement = document.querySelector("#time");
  let date = new Date(response.data.time * 1000);

  console.log(response.data);

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
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;
  axios.get(apiUrl).then(refreshWeather);
}

function searchCities(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-bar");

  searchingCity(searchInput.value);
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", searchCities);

searchingCity("paris");
