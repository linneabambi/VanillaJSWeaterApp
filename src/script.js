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
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}
function displayPrediction(response) {
  let forecast = response.data.daily;
  let predictionElement = document.querySelector("#weather-prediction");
  let predictionHTML = `<div class="row">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      predictionHTML =
        predictionHTML +
        `  
              <div class="col-2">
                <div class="prediction-day">${formatDay(forecastDay.dt)}</div>

                <img
                  id="prediction-img"
                  src="http://openweathermap.org/img/wn/${
                    forecastDay.weather[0].icon
                  }@2x.png"
                  alt=""
                />
                <br />
                <div class="temp-prediction">
                  <span class="temp-max">${Math.round(
                    forecastDay.temp.max
                  )}°</span>
                  <span class="temp-min">${Math.round(
                    forecastDay.temp.min
                  )}°</span>
                </div>
              </div>
            `;
    }
  });

  predictionHTML = predictionHTML + `</div>`;
  predictionElement.innerHTML = predictionHTML;
}
function getPrediction(coord) {
  let apiKey = "cfecd485617989b8f0add91581222571";
  apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coord.lat}&lon=${coord.lon}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayPrediction);
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

  getPrediction(response.data.coord);
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

let form = document.querySelector("#search-form");

form.addEventListener("submit", searchSubmit);

search("New York");
