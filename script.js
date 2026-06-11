let weather

let weatherTypes = ['Sunny','Clear','Partly Cloudy','Cloudy','Haze','Sandstorm','Mist','Patchy rain nearby','Patchy snow nearby','Blizzard','Fog','Light rain']
let weatherColor = ['#ebd186','#43508f','#d4dbff','#ebeeff','#ffffff','#b5b87f','#8c89ab','#a39fc7','#dedee0','#7c7c80','#999999','#9d9ec7']


let information = document.getElementById('information')
let submit = document.getElementById('submit')
let main = document.getElementById('main')

let searchForm = document.getElementById('searchForm')


submit.addEventListener('click', () =>{
const whatDay = document.getElementById('whatDay')
const whatHour = document.getElementById('whatHour')
const city = document.getElementById('city')
let url = `http://api.weatherapi.com/v1/forecast.json?key=980ca1ab957e49aa911142605262805&q=${city.value}&days=4&aqi=no&alerts=no`
console.log(whatDay.value)

    fetch(url)
    .then(async function(response) {
        weather = await response.json()
        
        
        let current = weather.forecast.forecastday[whatDay.value].hour[whatHour.value]
        let location = weather.location
        console.log(location.localtime_epoch)
        draw(current, location)
    })
})



searchForm.addEventListener('submit', (e) =>{
e.preventDefault()
const whatDay = document.getElementById('whatDay')
const city = document.getElementById('searchInp')
const whatHour = document.getElementById('whatHour')
let url = `http://api.weatherapi.com/v1/forecast.json?key=980ca1ab957e49aa911142605262805&q=${city.value}&days=4&aqi=no&alerts=no`
console.log(whatDay.value)

    fetch(url)
    .then(response => response.json())
    .then(data =>{
        if(data.error){
            alert('такої локації не знайденно')
            return
        }
    
        weather = data
        
        if(weather.error){
            alert('локацію не знайдено')
            return
        }
        let current = weather.forecast.forecastday[whatDay.value].hour[whatHour.value]
        let location = weather.location
        console.log(location.localtime_epoch)
        draw(current, location)
    })
})





function draw(current, location){
    let index = weatherTypes.indexOf(current.condition.text)
    if(index !== -1){
        main.style.backgroundColor = weatherColor[index]
        document.body.style.backgroundColor = weatherColor[index]
    }
    information.style.visibility = "visible";
    information.innerHTML = (`
    <h1>${location.name}</h1>
    <h2>${current.time}</h2>
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
        `)
}
