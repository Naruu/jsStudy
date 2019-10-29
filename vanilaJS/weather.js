const weather = document.querySelector(".js-weather");
const COORDS = "coords";
const API_KEYS = "ec18a6f19313f7a04726ddb0ea2013d2";

function getWeather(lat, lon){
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEYS}`
    ).then(function(response){
        return response.json()
    }).then(function(json){
        const temperature = json.main.temp;
        const place = json.name;
        weather.innerText = `${temperature} @ ${place}`;
    })
}

function saveCoords(coordObjs){
    localStorage.setItem(COORDS, JSON.stringify(coordObjs));
}

function handleGeoSucess(position){
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordObjs = {
        latitude,
        longitude
    };
    saveCoords(coordObjs);
    getWeather(latitude, longitude);
    
    console.log(position);
}
function handleGeoError(position){
    console.log("Eror");
}
function askForCoords(){
    navigator.geolocation.getCurrentPosition(handleGeoSucess, handleGeoError)
}

function loadCoords(){
    const loadedCoords = localStorage.getItem(COORDS);
    if(loadedCoords === null){
        askForCoords();
    }
    else{
        const parsedCoords = JSON.parse(loadedCoords);
        getWeather(parsedCoords.latitude, parsedCoords.longitude);

    }
}


function init(){
    loadCoords();
}

init();