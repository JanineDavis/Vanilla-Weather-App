/// Date
let now = new Date();

let h6 = document.querySelector("#current-date-year");
let h7 = document.querySelector("#current-day-hour");

let date = now.getDate();
let year = now.getFullYear();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];

let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
let month = months[now.getMonth()];

console.log(now);

h6.innerHTML = `${day} ${date} ${month} ${year}`;
/// Time
function formatAMPM(date) {
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? "pm" : "am";
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? "0" + minutes : minutes;
  var strTime = hours + ":" + minutes + " " + ampm;
  return strTime;
}
let time = formatAMPM(new Date());

console.log(formatAMPM(new Date()));

h7.innerHTML = `${time}`;

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
  console.log(temperature);
  console.log(response);
  document.querySelector("#city-change").innerHTML = response.data.name;
  mainTemp.innerHTML = `${temperature}°`;
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
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

let currentTemp = document.querySelector("#search-form-current");
currentTemp.addEventListener("click", CurrentPosition);
