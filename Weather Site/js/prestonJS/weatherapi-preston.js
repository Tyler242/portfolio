const apiURL =
  'https://api.openweathermap.org/data/2.5/forecast?id=5604473&units=imperial&appid=744fe90a723fbf1d7ad8053159c6a1d5';

const dofW = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

fetch(apiURL)
  .then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      alert('Error with api call/response');
    }
  })
  .then((jsObject) => {
    let weatherData = jsObject.list[0];

    document.getElementById('current').textContent =
      weatherData.weather[0].main;
    document.getElementById('temp').textContent = weatherData.main.temp_max;
    document.getElementById('humidity').textContent = weatherData.main.humidity;
    document.getElementById('windSpeed').textContent = weatherData.wind.speed;
    document.getElementById('windChill').textContent = computeWindChill(
      weatherData.main.temp,
      weatherData.wind.speed
    );

    let forecast = jsObject.list;
    const size = forecast.length;

    let fDCol = document.getElementsByClassName('5-day');
    let fDElems = [...fDCol];

    let fICol = document.getElementsByClassName('weather-img');
    let fIElems = [...fICol];

    let fTCol = document.getElementsByClassName('5-temp');
    let fTElems = [...fTCol];

    let i2 = 0;
    for (let i = 0; i < size; i++) {
      if (forecast[i].dt_txt.includes('18:00:00')) {
        // Get and put the day of the week
        let dt = new Date(forecast[i].dt_txt);
        fDElems[i2].textContent = dofW[dt.getDay()];

        // Get and put the image src and alt
        let imagesrc =
          'https://openweathermap.org/img/w/' +
          forecast[i].weather[0].icon +
          '.png';
        let alt = forecast[i].weather[0].description;
        fIElems[i2].setAttribute('src', imagesrc);
        fIElems[i2].setAttribute('alt', alt);

        // Get and put the high temp
        let highTemp = forecast[i].main.temp_max;
        fTElems[i2].textContent = highTemp;
        i2++;
      }
    }
  });

function computeWindChill(cTemp, wSpeed) {
  if (cTemp <= 50 && wSpeed >= 3) {
    const wTemp =
      35.74 +
      0.6215 * cTemp -
      35.75 * Math.pow(wSpeed, 0.16) +
      0.4275 * cTemp * Math.pow(wSpeed, 0.16);
    return wTemp.toFixed(1);
  } else {
    return 'NaN';
  }
}
