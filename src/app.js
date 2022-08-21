//function that you want to call when you get the response back from the api
function displayWeatherData(response) {
    //selects the element with the id indicated and puts it into a variable 
    let temperatureElement = document.querySelector("#temperature")
    let cityElement = document.querySelector("#city")
    let descriptionElement = document.querySelector("#description")
    let humidityElement = document.querySelector("#humidity")
    let windElement = document.querySelector("#wind")
    //takes that variable that is located in the html and replaces it with the object specified that is located in the apiUrl
    temperatureElement.innerHTML = Math.round(response.data.main.temp)
    cityElement.innerHTML = response.data.name
    descriptionElement.innerHTML = response.data.weather[0].description
    humidityElement.innerHTML = response.data.main.humidity
    windElement.innerHTML = Math.round(response.data.wind.speed)
    console.log(response)
}


let apiKey ="5f472b7acba333cd8a035ea85a0d4d4c"

let apiUrl =`https://api.openweathermap.org/data/2.5/weather?q=San Francisco&appid=${apiKey}&units=imperial`

axios.get(apiUrl).then(displayWeatherData)