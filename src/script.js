function showTemperature(response) {
  let degreesElement = document.querySelector("#degrees");
  cityElement = document.querySelector("#current-city");
  let temperature = Math.round(response.data.main.temp);
  degreesElement.innerHTML = temperature;
  console.log(degreesElement);
  cityElement = response.data.name;
  let description = document.querySelector("#sky");
  description.innerHTML = response.data.weather[0].description;
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = response.data.main.humidity;
  let wind = document.querySelector("#wind");
  wind.innerHTML = Math.round(response.data.wind.speed);
}

let apiKey = "cfecd485617989b8f0add91581222571";
let city = "London";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
axios.get(apiUrl).then(showTemperature);
