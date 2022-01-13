// town events data
const url = 'https://byui-cit230.github.io/weather/data/towndata.json';
const titleID = document.getElementsByTagName('title')[0].id.split('-', 1)[0];
getData(url);

async function getData(url) {
  let response = await fetch(url);
  let townData = await response.json();
  townEvents(townData.towns);
}

function townEvents(townList) {
  // return the specific town data
  townList.forEach((item) => {
    // Which data list will we pull from for this page?
    if (item.name.split(' ', 1)[0] === titleID) {
      // get the parent DOM element
      let eventsElem = document.getElementById('events-list');
      let eventsList = [...item.events];

      eventsList.forEach((event) => {
        let eventElem = document.createElement('p');
        eventElem.textContent = event;
        eventsElem.appendChild(eventElem);
        return;
      });
    }
  });
}
