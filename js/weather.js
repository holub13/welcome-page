const api = {
    key: 'e857fcb5073ebb289cbcbec6216e9723',
    base: 'https://api.openweathermap.org/data/2.5/',
}

const search = document.querySelector('.search-box');
const t = document.querySelector('.temp');
window.addEventListener('DOMContentLoaded', setQueryGeoLocation)
search.addEventListener('keypress', setQuery);

function setQuery(e) {
    if (e.keyCode == 13) {
        getResults(search.value);
    }
}

function getResults(query) {
    fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
      .then(weather => {
          return weather.json();
      })
      .then(displayResults)
      .then(search.value = '')
}

function displayResults(weather) {
    let city = document.querySelector('.city');
    city.innerHTML = `${weather.name}, ${weather.sys.country}`;
    let temp = document.querySelector('.temp');
    temp.innerHTML = `${Math.round(weather.main.temp)}<span>&degc</span>`;
    let weatherEl = document.querySelector('.weather');
    weatherEl.innerText = `${weather.weather[0].main}`;
    let hiLow = document.querySelector('.hi-low');
    hiLow.innerHTML = `${Math.round(weather.main.temp_min)}<span>&degc</span> / ${Math.round(weather.main.temp_max)}<span>&degc</span>`;
}

function setQueryGeoLocation() {
    let lon;
    let lat;
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            lon = position.coords.longitude;
            lat = position.coords.latitude;
            fetch(`${api.base}weather?lat=${lat}&lon=${lon}&units=metric&APPID=${api.key}`)
              .then(weather => {
                  return weather.json();
              })
              .then(displayResults);
        })
    }
}