//recieves the dt number from api, calculates the date, returns current dt. takes dt in milliseconds and plugs it into parameter timestamp.
function formatDate(timestamp) {
    //constructs a date object by passing in the dt from the api for the current city in milliseconds 
    let date = new Date(timestamp)
    let hours = date.getHours()
    //adds a 0 in front of the time if it is a number smaller than 10
    if (hours < 10) {
        hours = `0${hours}`
    }
    let minutes = date.getMinutes()
    if (minutes < 10) {
        minutes = `0${minutes}`
    }
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    //searches the variable of days for whatever index number the current date is and replaces it with the cooresponding string day of the week. 
    let day = days[date.getDay()]
    return `${day} ${hours}:${minutes}`

}

//function that you want to call when you get the response back from the api
function displayWeatherData(response) {
    //selects the element with the id indicated and puts it into a variable 
    let temperatureElement = document.querySelector("#temperature")
    let cityElement = document.querySelector("#city")
    let descriptionElement = document.querySelector("#description")
    let humidityElement = document.querySelector("#humidity")
    let windElement = document.querySelector("#wind")
    let dateElement = document.querySelector("#date")
    let iconElement = document.querySelector("#icon")
    //takes that variable that is located in the html and replaces it with the object specified that is located in the apiUrl
    temperatureElement.innerHTML = Math.round(response.data.main.temp)
    cityElement.innerHTML = response.data.name
    descriptionElement.innerHTML = response.data.weather[0].description
    humidityElement.innerHTML = response.data.main.humidity
    windElement.innerHTML = Math.round(response.data.wind.speed)
    //need to convert the number of seconds since 1970. Take dt (date time) in api and multiply by 1000 to get milliseconds. 
    dateElement.innerHTML = formatDate(response.data.dt * 1000)
    //takes the element specified and replaces it with another attribute
    iconElement.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`)
    console.log(response)
    iconElement.setAttribute("alt", response.data.weather[0].description)
}

let city = "San Francisco"
let apiKey ="5f472b7acba333cd8a035ea85a0d4d4c"
let apiUrl =`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`

axios.get(apiUrl).then(displayWeatherData)