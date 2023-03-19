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
function search(city) {
  let apiKey = "8944afa6845bd7c413a687258d3211ef";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(showTemp);
}

function changeCity(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#enterCity");
  let cityInput = document.querySelector("#city-change");
  cityInput.innerHTML = `${searchInput.value}`;
  search(searchInput.value);
}

search("Sydney");
displayForecast();

let submit = document.querySelector("form");
submit.addEventListener("submit", changeCity);

/// Search city temp API

function showTemp(response) {
  let temperature = Math.round(response.data.main.temp);
  let mainTemp = document.querySelector("#temperature");
  let descriptionElement = document.querySelector("#weatherDescription");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#windSpeed");
  let currentDate = document.querySelector("#current-date-year");
  let iconElement = document.querySelector("#icon");

  document.querySelector("#city-change").innerHTML = response.data.name;
  displayForecast();
  celsiusTemp = response.data.main.temp;
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

///Current location API

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

let currentTemp = document.querySelector("#search-form-current");
currentTemp.addEventListener("click", CurrentPosition);

/// C | F conversion

function showFahrenheitTemp(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  let fahreinheitTemp = (celsiusTemp * 9) / 5 + 32;
  celsiusLink.classList.remove("active");
  fahreinheitLink.classList.add("active");
  temperatureElement.innerHTML = Math.round(fahreinheitTemp);
}
function showCelsiusTemp(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahreinheitLink.classList.remove("active");
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemp);
}

let fahreinheitLink = document.querySelector("#fahrenheit-link");
fahreinheitLink.addEventListener("click", showFahrenheitTemp);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", showCelsiusTemp);

let celsiusTemp = null;

///Display forecast

function displayForecast() {
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  let days = ["Thursday", "Friday", "Saturday"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
  <div class="col-2">
                  <div class="weather-forecast-date">${day}</div>
                  <img
                    src="http://openweathermap.org/img/wn/04d@2x.png"
                    alt=""
                    width="42"
                  />
                  <div class="weather-forecast-temperatures">
                    <span class="weather-forecast-temp-max">18°</span>
                    <span class="weather-forecast-temp-min">12°</span>
                  </div>`;

    console.log(forecastHTML);
    forecastHTML = `</div>`;
    forecastElement.innerHTML = forecastHTML;
  });
}
