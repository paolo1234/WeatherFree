//  Paolo Calamia Weather 

import {getKey} from './API_KEY.js';

const API_KEY = getKey();

const getData = uri => {
    fetch(uri)
    .then((response) => response.json())
    .then((data) => {
        const {main, weather} = data;
        let temp = parseInt(main.temp);
        let weath = weather[0].main;
        let icon = weather[0].icon;
        let status = getStatus(icon);
        weath = translateWeather(weath);
        document.getElementById('city').innerHTML = data.name;
        document.getElementById('temp').innerHTML = `${temp} °C`;
        document.getElementById('weath').innerHTML = `${weath} (${status})`;
        document.getElementById('icon').innerHTML = `<img src="https://openweathermap.org/img/w/${icon}.png" alt="${weath}icon" >`;
    });
};

city_btn.onclick = () => {
    const city = document.getElementById('city_txt').value; 
    const country = document.getElementById('country').value;
    const uri = `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&units=metric&appid=${API_KEY}`;
    getData(uri);
};

localization.onclick =  () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => { 
            const {latitude, longitude} = position.coords;
            const uri = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_KEY}`;
            getData(uri);
        });
    }
};

const getStatus = icon => (icon[2] == 'n') ? 'Notte' : 'Giorno';

const translateWeather = weath => {
    switch (weath) {
        case 'Clouds' :
            return 'Nuvoloso';
        case 'Rain' :
            return 'Piovoso';
        case 'Clear' :
            return 'Sereno';
        case 'Sun' :
            return 'Soleggiato';
        case 'Snow' :
            return 'Neve';
            break;
        case 'Thunderstorm' :
            return 'Tempesta';
        case 'Drizzle' :
            return 'Pioggia leggera';
        default:
            return weath;
    }
}