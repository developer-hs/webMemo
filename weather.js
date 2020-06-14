const weather = document.querySelector(".js-weather");

const WEATHER_API_KEY = "eba302c9974e0f1906f4c12247fa990b";
const COORDS = "coords";

function getWeather(lat, lng) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${WEATHER_API_KEY}&units=metric`
  )
    .then(function (response) {
      console.log(response);
      return response.json(); // json() : body 텍스트를 JSON으로 바꿔줌
    })
    .then(function (json) {
      const temperature = json.main.temp;
      const place = json.name;
      weather.innerText = `${temperature} @ ${place}`;
    }); // then : 데이터가 완전히 들어온 다음 함수를 호출
}
function saveCoords(coordsObj) {
  localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSucces(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  const coordsObj = {
    latitude, // === latitude : latitude
    longitude, // === longitude : longitude
  }; // 객체 변수의 이름과 객체의 key 값의 이름을 같게 저장할 때 하나의 이름만 선언해줘도 된다
  saveCoords(coordsObj);
  getWeather(latitude, longitude);
}

function handleGeoError() {
  console.log("Can't acces geo location");
}
function askForCoords() {
  navigator.geolocation.getCurrentPosition(handleGeoSucces, handleGeoError); // 첫번째 인자는 좌표를 가져오는데 성공했을 때 처리하는 함수
}

function loadCoords() {
  const loadedCoords = localStorage.getItem(COORDS);
  if (loadedCoords === null) {
    askForCoords();
  } else {
    const parseCoords = JSON.parse(loadedCoords);
    getWeather(parseCoords.latitude, parseCoords.longitude);
  }
}

function init() {
  loadCoords();
}

init();
