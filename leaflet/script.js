document.getElementById("map").style.height = window.innerHeight * 0.97 + "px";
document.getElementById("map").style.width = window.innerWidth * 0.97 + "px";
document.getElementById("map").style.position = "relative";
document.getElementById("map").style.margin = "auto";

var map = L.map("map").setView([50, 0], 4);

L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 10,
  minZoom: 2,
  attribution: "© OpenStreetMap",
}).addTo(map);

var seborga = L.marker([43.83, 7.69]).addTo(map);
seborga.bindPopup("<b>Seborga</b><br><a href='https://en.wikipedia.org/wiki/Seborga'>Wikipedia</a><br><a href='https://www.google.com/maps/place/Seborga'>Google Maps</a>");
var triora = L.marker([44.0, 7.76]).addTo(map);
triora.bindPopup("<b>Triora</b><br><a href='https://en.wikipedia.org/wiki/Triora'>Wikipedia</a><br><a href='https://www.google.com/maps/place/Triora'>Google Maps</a>");
var rose = L.marker([44.18, 12.62]).addTo(map);
rose.bindPopup("<b>Rose</b><br><a href='https://en.wikipedia.org/wiki/Republic_of_Rose_Island'>Wikipedia</a><br><a href='https://maps.app.goo.gl/BvCfBbZCEmVWGsZVA'>Google Maps</a>");
var chiapporato = L.marker([44.09, 11.62]).addTo(map);
chiapporato.bindPopup("<b>Chiapporato</b><br><a href='https://it.wikipedia.org/wiki/Chiapporato'>Wikipedia</a><br><a href='https://www.google.com/maps/place/Chiapporato'>Google Maps</a>");
var bunny = L.marker([44.24, 7.76]).addTo(map);
bunny.bindPopup("<b>Bunny</b><br><a href='https://www.atlasobscura.com/places/colletto-fava'>Atlas Obscura</a><br><a href='https://maps.app.goo.gl/DwU3AHcbA87cU1ak9'>Google Maps</a>");
var sandhamn = L.marker([59.29, 18.92]).addTo(map);
sandhamn.bindPopup("<b>Sandhamn</b><br><a href='https://en.wikipedia.org/wiki/Sandhamn'>Wikipedia</a><br><a href='https://www.google.com/maps/place/Sandhamn'>Google Maps</a>");
var lemnos = L.marker([39.91, 25.25]).addTo(map);
lemnos.bindPopup("<b>Lemnos</b><br><a href='https://en.wikipedia.org/wiki/Lemnos'>Wikipedia</a><br><a href='https://www.google.com/maps/place/Lemnos'>Google Maps</a>");

function onMapClickAlert(e) {
  alert("You clicked the map at " + e.latlng);
}

/*
var popup = L.popup();

function onMapClick(e) {
  popup
    .setLatLng(e.latlng)
    .setContent("You clicked the map at " + e.latlng.toString())
    .openOn(map);
}

map.on("click", onMapClick);*/

function getCoordinatesFromCity(city){
    fetch(`https://nominatim.openstreetmap.org/search?city=${city}&format=json`)
    .then(response => {
        if(!response.ok){
            throw Error("ERROR");
        }
        return response.json();
    })
    .then(data => {
        console.log(data);
    })
    .catch(error => {
        console.log(error);
    });
}

function getCityFromCoordinates(lat, lon){
    fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`)
    .then(response => {
        if(!response.ok){
            throw Error("ERROR");
        }
        return response.json();
    })
    .then(data => {
        console.log(data);
    })
    .catch(error => {
        console.log(error);
    });
}