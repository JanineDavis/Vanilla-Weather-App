/// Date

function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    minutes = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}

/// Change city

function changeCity(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#enterCity");
  let cityInput = document.querySelector("#city-change");
  cityInput.innerHTML = `${searchInput.value}`;
  let city = searchInput.value;
  let apiKey = "8944afa6845bd7c413a687258d3211ef";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(showTemp);
}

let submit = document.querySelector("form");
submit.addEventListener("submit", changeCity);

/// current city temp API

function showTemp(response) {
  let temperature = Math.round(response.data.main.temp);
  let mainTemp = document.querySelector("#temperature");
  let descriptionElement = document.querySelector("#weatherDescription");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#windSpeed");
  let currentDate = document.querySelector("#current-date-year");
  let iconElement = document.querySelector("#icon");

  console.log(temperature);
  console.log(response);
  document.querySelector("#city-change").innerHTML = response.data.name;
  mainTemp.innerHTML = `${temperature}°`;
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
  windElement.innerHTML = Math.round(response.data.wind.speed);
  currentDate.innerHTML = formatDate(response.data.dt * 1000);
}

function showLocation(position) {
  let apiKey = "8944afa6845bd7c413a687258d3211ef";
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(showTemp);
}
function CurrentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showLocation);
}
/// City
let apiKey = "8944afa6845bd7c413a687258d3211ef";
let city = "Christchurch";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

axios.get(apiURL).then(showTemp);

let currentTemp = document.querySelector("#search-form-current");
currentTemp.addEventListener("click", CurrentPosition);
