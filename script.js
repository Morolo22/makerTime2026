let weather



let information = document.getElementById('information')
let submit = document.getElementById('submit')


submit.addEventListener('click', () =>{
const city = document.getElementById('city')
let url = `http://api.weatherapi.com/v1/current.json?key=980ca1ab957e49aa911142605262805&q=${city.value}&aqi=no`


    fetch(url)
    .then(async function(response) {
        weather = await response.json()
        let current = weather.current
        let location = weather.location
        draw(current, location)
    })
})





function draw(current, location){
    information.innerHTML = (`
    <h1>${location.name}</h1>

    <h2>Температура</h2>
    <h3 id="temp">${current.temp_c}°C</h3>
    <h4 id="tempfeeling">відчувається як ${current.feelslike_c}°C</h4>
    <h2>Погода</h2>
    <img src="${current.condition.icon}" alt="">
    <h3 id="weather">${current.condition.text}</h3>
    <h3 id="windSpeed">Швидкість вітру ${current.wind_kph} км/год</h3>
    <h4>Час останього оновлення ${current.last_updated}</h4>
        `)
}