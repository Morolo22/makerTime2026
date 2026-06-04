let weather



let information = document.getElementById('information')
let submit = document.getElementById('submit')

let searchForm = document.getElementById('searchForm')


submit.addEventListener('click', () =>{
const whatDay = document.getElementById('whatDay')
const whatHour = document.getElementById('whatHour')
const city = document.getElementById('city')
let url = `http://api.weatherapi.com/v1/current.json?key=980ca1ab957e49aa911142605262805&q=${city.value}&days=4&aqi=no&alerts=no`
console.log(whatDay.value)

    fetch(url)
    .then(async function(response) {
        weather = await response.json()
        let current = weather.current
        let location = weather.location
        console.log(location.localtime_epoch)
        draw(current, location)
    })
})



searchForm.addEventListener('submit', (e) =>{
e.preventDefault()
const whatDay = document.getElementById('whatDay')
const city = document.getElementById('searchInp')
let url = `http://api.weatherapi.com/v1/current.json?key=980ca1ab957e49aa911142605262805&q=${city.value}&days=4&aqi=no&alerts=no`
console.log(whatDay.value)

    fetch(url)
    .then(async function(response) {
        weather = await response.json()
        let current = weather.forecast.forecastday.whatDay.hour.whatHour.condition
        let location = weather.location
        console.log(location.localtime_epoch)
        draw(current, location)
    })
})





function draw(current, location){
    information.style.visibility = "visible";
    information.innerHTML = (`
    <h1>${location.name}</h1>
    <div class="getInfo">
    <h2 class="getInfoBox" >Температура</h2>
    <h3 class="getInfoBox" id="temp">${current.temp_c}°C</h3>
    <h4 class="getInfoBox" id="tempfeeling">відчувається як ${current.feelslike_c}°C</h4>
    <h2 class="getInfoBox">Погода</h2>
    <img class="getInfoBox" src="${current.condition.icon}" alt="">
    <h3 class="getInfoBox" id="weather">${current.condition.text}</h3>
    </div>
    <div class="getInfoWind">
    <h3 class="getInfoBox" id="vis">Видимість ${current.vis_km} км</h3>
    <h3 class="getInfoBox" id="windSpeed">Швидкість вітру ${current.wind_kph} км/год</h3>
    <h3 class="getInfoBox" id="gustSpeed">Швидкість поривів ${current.gust_kph} км/год</h3>
    <h3 class="getInfoBox" id="windDir">Напрям вітру ${current.wind_dir}</h3>
    </div>
    
    <h4>Час останього оновлення ${current.last_updated}</h4>
    
        `)
}
