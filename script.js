//  Paolo Calamia Weather 

var key = 'a5aebe0391eb5c24964f1368526971c0'; // API Key 

city_btn.onclick = function () {
    var city = document.getElementById('city_txt').value; // Prendo i dati da input
    var country = document.getElementById('country').value; // Necessario in caso ci siano più città con lo stesso nome
    var uri = 'http://api.openweathermap.org/data/2.5/weather?q=' + city + ',' + country + '&units=metric' + '&appid=' + key; // Call
    var request = new XMLHttpRequest();
    request.open('GET', uri, true);
    request.onload = function () {
        var data = JSON.parse(this.response);
        var temp = parseInt(data.main.temp);
        var weath = data.weather[0].main;
        var icon = data.weather[0].icon;
        var status = getStatus(icon);
        weath = translateWeather(weath);

        /* Stampo i dati nella pagina HTML */
        document.getElementById('city').innerHTML = data.name;
        document.getElementById('temp').innerHTML = temp + ' °C';
        document.getElementById('weath').innerHTML = weath + ' (' + status + ') ';
        document.getElementById('icon').innerHTML = '<img src="http://openweathermap.org/img/w/' + icon + '.png" alt="' + weath + ' icon" >';
    }
    request.send();
}


localization.onclick = function () {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) { // Acquisisco lat e lon dalla geolocalizzazione
            var lat = position.coords.latitude;
            var lon = position.coords.longitude;
            var uril = 'http://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + '&units=metric' + '&appid=' + key;
            var reql = new XMLHttpRequest();
            reql.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                    var datal = JSON.parse(this.responseText);
                    var city = datal.name;
                    var temp = parseInt(datal.main.temp);
                    var weath = datal.weather[0].main;
                    var icon = datal.weather[0].icon;
                    var status = getStatus(icon);
                    weath = translateWeather(weath);


                    document.getElementById('city').innerHTML = city;
                    document.getElementById('temp').innerHTML = temp + ' °C';
                    document.getElementById('weath').innerHTML = weath + ' (' + status + ') ';
                    document.getElementById('icon').innerHTML = '<img src="http://openweathermap.org/img/w/' + icon + '.png" alt="' + weath + ' icon" >';
                }

            };
            reql.open("GET", uril, true);
            reql.send();
        });


    }
    ;


}

function getStatus(icon) {
    if (icon[2] == 'n') {
        return 'Notte';
    }
    return 'Giorno';
}

function translateWeather(weath) {
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