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
  let temperature = Math.round(response.data.main.temp);
  degreesElement.innerHTML = temperature;

  cityElement.innerHTML = response.data.name;
  let description = document.querySelector("#sky");
  description.innerHTML = response.data.weather[0].description;
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = response.data.main.humidity;
  let wind = document.querySelector("#wind");
  wind.innerHTML = Math.round(response.data.wind.speed);
  let date = document.querySelector("#day-time");
  date.innerHTML = newDate(response.data.dt * 1000);
}

let apiKey = "cfecd485617989b8f0add91581222571";
let city = "London";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
axios.get(apiUrl).then(showTemperature);
