// list of the city ID's
//              Preston    Soda Spr   Fish H
const cityID = ['5604473', '5607916', '5585010'];
// api key
const apiKey = '744fe90a723fbf1d7ad8053159c6a1d5';
// days of the week
const dofW = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
// town page identifier
const domID = document.getElementsByTagName('title')[0].id.split('-', 1)[0];

async function getData() {
  // get the api url
  let url = generateURL();

  // call the api
  let response = await fetch(url);

  // convert the response to a json object
  let weatherData = await response.json();

  // generate text for the weather summary
  weatherSummary(weatherData.list[0]);

  // generate text and icon for forecast
  fiveDayForecast(weatherData.list);
}

getData();

function generateURL() {
  // create and return the api url for the given site
  if (domID == 'Preston') {
    return `https://api.openweathermap.org/data/2.5/forecast?id=${cityID[0]}&units=imperial&appid=${apiKey}`;
  } else if (titleID == 'Soda') {
    return `https://api.openweathermap.org/data/2.5/forecast?id=${cityID[1]}&units=imperial&appid=${apiKey}`;
  } else if (titleID == 'Fish') {
    return `https://api.openweathermap.org/data/2.5/forecast?id=${cityID[2]}&units=imperial&appid=${apiKey}`;
  }
}

function weatherSummary(data) {
  // set the text content on DOM elements
  document.getElementById('current').textContent = data.weather[0].main;
  document.getElementById('temp').textContent = data.main.temp_max;
  document.getElementById('humidity').textContent = data.main.humidity;
  document.getElementById('windSpeed').textContent = data.wind.speed;
  document.getElementById('windChill').textContent = computeWindChill(
    data.main.temp,
    data.wind.speed
  );
}

function computeWindChill(cTemp, wSpeed) {
  // compute the windchill if the wind speed and tempature
  // are within a valid range.
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

function fiveDayForecast(data) {
  let fDCol = document.getElementsByClassName('5-day');
  let fICol = document.getElementsByClassName('weather-img');
  let fTCol = document.getElementsByClassName('5-temp');

  let fDElems = [...fDCol];
  let fIElems = [...fICol];
  let fTElems = [...fTCol];

  // iterate through each hour and find the ones equal to 15:00:00
  let i2 = 0;
  for (let i = 0; i < data.length; i++) {
    if (data[i].dt_txt.includes('15:00:00')) {
      // Get and put the day of the week
      let dt = new Date(data[i].dt_txt);
      fDElems[i2].textContent = dofW[dt.getDay()];

      // Get and put the image src and alt
      let imageSrc =
        'https://openweathermap.org/img/w/' + data[i].weather[0].icon + '.png';
      let alt = data[i].weather[0].description;
      fIElems[i2].setAttribute('src', imageSrc);
      fIElems[i2].setAttribute('alt', alt);

      // Get and put the high temp
      let highTemp = data[i].main.temp_max;
      fTElems[i2].textContent = Math.round(highTemp);

      i2++;
    }
  }
}
