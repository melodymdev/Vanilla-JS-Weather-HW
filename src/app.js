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

    fahrTemp = response.data.main.temp

    //takes that variable that is located in the html and replaces it with the object specified that is located in the apiUrl
    temperatureElement.innerHTML = Math.round(fahrTemp)
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


//makes an ajax call and displays the city
function search(city) {
let apiKey ="5f472b7acba333cd8a035ea85a0d4d4c"
let apiUrl =`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`
axios.get(apiUrl).then(displayWeatherData)
}


//The event argument is used to pass information about the event that has happened (the form submit in this case), which can be used to retrieve data about the event or manipulate it.
function handleSubmit(event) {
    //prevents page from reloading
    event.preventDefault()
    let cityInputElement = document.querySelector("#city-input")
    //searches through the api for the value of whatever city name was input into the form
    search(cityInputElement.value)
}


//when celsiusLink is clicked it will take the current F temp, plug it into the math formula, and replace it with the new answer
function displayCelsiusTemp(event) {
    event.preventDefault()
    //remove the active class from the F link
    fahrLink.classList.remove("active")
    //add the active class to the C link
    celsiusLink.classList.add("active")
    let celsiusTemp = (fahrTemp - 32) * 5 / 9 
    let temperatureElement = document.querySelector("#temperature")
    temperatureElement.innerHTML = Math.round(celsiusTemp)
}


//when fahrLink is clicked on it will replace whatever temp is displayed with the global variable fahrTemp (response.data.main.temp)
function displayFahrTemp(event) {
    event.preventDefault()
    //add the active class from the F link
    fahrLink.classList.add("active")
    //remove the active class to the C link
    celsiusLink.classList.remove("active")
    let temperatureElement = document.querySelector("#temperature")
    temperatureElement.innerHTML = Math.round(fahrTemp)
}

//Global variables - variables not created inside a function. Can still access from inside a function - - ↓

//variable is being created with nothing in it, then search is called which plugs in response.data.main.temp and allows it to be accessed in other functions
let fahrTemp = null

let form = document.querySelector("#search-form")
form.addEventListener("submit", handleSubmit)

let celsiusLink = document.querySelector("#celsius-link")
celsiusLink.addEventListener("click", displayCelsiusTemp)

let fahrLink = document.querySelector("#fahr-link")
fahrLink.addEventListener("click", displayFahrTemp)

//calls the search function and inputs into city parameter 
search("San Francisco")