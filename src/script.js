function newDate(timestamp) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let date = new Date(timestamp);

  let minutes = date.getMinutes();
  let hour = date.getHours();
  let day = days[date.getDay()];
  if (hour < 10) {
    hour = `0${hour}`;
  }
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${day} ${hour}:${minutes}`;
}
function showTemperature(response) {
  let degreesElement = document.querySelector("#degrees");
  let cityElement = document.querySelector("#current-city");

  let description = document.querySelector("#sky");
  let humidity = document.querySelector("#humidity");
  let wind = document.querySelector("#wind");
  let date = document.querySelector("#day-time");
  let iconElement = document.querySelector("#icon");
  celciusTemp = Math.round(response.data.main.temp);

  degreesElement.innerHTML = celciusTemp;
  cityElement.innerHTML = response.data.name;
  description.innerHTML = response.data.weather[0].description;
  humidity.innerHTML = response.data.main.humidity;
  wind.innerHTML = Math.round(response.data.wind.speed);
  date.innerHTML = newDate(response.data.dt * 1000);
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
}
function search(city) {
  let apiKey = "cfecd485617989b8f0add91581222571";

  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}
function searchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");
  search(searchInput.value);
}
function displayFarenheit(event) {
  event.preventDefault();
  let farenheitTemp = (celciusTemp * 9) / 5 + 32;
  let temp = document.querySelector("#degrees");
  temp.innerHTML = Math.round(farenheitTemp);
  cLink.classList.remove("active");
  fLink.classList.add("active");
}
function displayCelcius(event) {
  event.preventDefault();
  let temp = document.querySelector("#degrees");
  temp.innerHTML = celciusTemp;
  cLink.classList.add("active");
  fLink.classList.remove("active");
}
let celciusTemp = null;
let form = document.querySelector("#search-form");

form.addEventListener("submit", searchSubmit);
let fLink = document.querySelector("#farenheit-link");
fLink.addEventListener("click", displayFarenheit);
let cLink = document.querySelector("#celcius-link");
cLink.addEventListener("click", displayCelcius);

search("New York");
