const url = 'https://api.coinstats.app/public/v1/coins?skip=0&limit=10';

async function getApiData(url) {
  let response = await fetch(url);
  let data = await response.json();
  createScroll(data.coins);
  createLinks(data.coins);
}

getApiData(url);

// create a nav bar that will link to a page for each crypto currency
function createLinks(data) {
  // get the sect element
  const sectElem = document.querySelector('#crypto-links');
  // create the unordered list
  let ulElem = document.createElement('ul');
  ulElem.id = 'crypto-ul';
  // for each crypto create a list element
  for (let i = 0; i < data.length; i++) {
    createLI(data[i].name, data[i].symbol, data[i].id, ulElem);
  }
  // add the unordered list to the nav element
  sectElem.appendChild(ulElem);
}

function createLI(name, symbol, id, ulElem) {
  // create the list element
  let liElem = document.createElement('li');
  // create the form tag
  let formElem = document.createElement('form');
  formElem.setAttribute('action', '/final/crypto.html');
  formElem.setAttribute('method', 'get');
  // create the input tag
  let inElem = document.createElement('input');
  inElem.setAttribute('type', 'submit');
  inElem.setAttribute('value', id);
  inElem.setAttribute('name', 'submit');

  formElem.appendChild(inElem);

  liElem.appendChild(formElem);
  // add the list element to the unordered list
  ulElem.appendChild(liElem);
}

function createScroll(data) {
  let scrollTag = document.getElementsByTagName('marquee')[0];
  scrollTag.innerHTML = formatText(data);
}

function formatText(data) {
  let string = '';
  data.forEach((item) => {
    string += item.name + ': $' + item.price.toFixed(2) + ' --- ';
  });
  return string;
}
