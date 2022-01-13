// Get the coin name from the url and format it to call the api
const queryString = window.location.search.split('=')[1].toLowerCase();

// The formatted and completed apiUrl
const apiUrl = 'https://api.coinstats.app/public/v1/coins/' + queryString;
getApiData(apiUrl);

async function getApiData(url) {
  // The api url
  let response = await fetch(url);
  let data = await response.json();

  generatePage(data.coin);
}

function generatePage(coinInfo) {
  const mainElem = document.querySelector('#main');

  // create a div element
  let divElem = document.createElement('div');
  divElem.id = 'main-container';
  mainElem.appendChild(divElem);

  // Create the intro widget
  let headElem = createHeadWidget(
    coinInfo.name,
    coinInfo.icon,
    coinInfo.symbol
  );
  divElem.appendChild(headElem);

  // Create the data widget
  const data = [
    coinInfo.price,
    coinInfo.priceBtc,
    coinInfo.priceChange1d,
    coinInfo.priceChange1h,
    coinInfo.priceChange1w,
  ];
  let dataWidget = createDataWidget(coinInfo.name, data);
  divElem.appendChild(dataWidget);

  // Create the additional data widget
  const addData = [
    coinInfo.availableSupply,
    coinInfo.marketCap,
    coinInfo.rank,
    coinInfo.volume,
  ];
  let addDataWidget = createAddDataWidget(coinInfo.name, addData);
  divElem.appendChild(addDataWidget);

  // Create the additional links widget
  let linksWidget = createLinksWidget(
    coinInfo.name,
    coinInfo.exp,
    coinInfo.websiteUrl,
    coinInfo.twitterUrl
  );
  divElem.appendChild(linksWidget);
}

function createHeadWidget(name, icon, symbol) {
  // parent element
  let section = document.createElement('section');
  section.id = 'head';
  let divElem = document.createElement('div');
  divElem.id = 'container';

  // img element
  let div = document.createElement('div');
  let imgElem = document.createElement('img');
  imgElem.src = icon;
  imgElem.alt = name + ' icon';
  div.appendChild(imgElem);
  divElem.appendChild(div);

  // header element
  let h2Elem = document.createElement('h2');
  h2Elem.textContent = name;
  divElem.appendChild(h2Elem);

  // symbol
  let symElem = document.createElement('p');
  symElem.textContent = 'Symbol: ' + symbol;
  divElem.appendChild(symElem);
  section.appendChild(divElem);

  return section;
}

function createDataWidget(name, data) {
  // parent element
  let section = document.createElement('section');
  section.id = 'data';

  // header element
  let h2Elem = document.createElement('h2');
  h2Elem.textContent = 'Financial Data';
  section.appendChild(h2Elem);

  // format the data
  // price element
  let priceElem = document.createElement('p');
  priceElem.setAttribute('id', 'price');
  priceElem.textContent = 'Price (USD): $' + data[0].toFixed(2);
  section.appendChild(priceElem);

  // price compared to bitcoin
  let pToBTC = document.createElement('p');
  pToBTC.textContent =
    'Compared to Bitcoin (Price/Bitcoin): $' + data[1].toFixed(4);
  section.appendChild(pToBTC);

  // change over last hour
  let pChange1h = document.createElement('p');
  pChange1h.textContent = 'Change Last Hour: $' + data[3];
  section.appendChild(pChange1h);

  // change over last day
  let pChange1d = document.createElement('p');
  pChange1d.textContent = 'Change Last Day: $' + data[2];
  section.appendChild(pChange1d);

  // change over last week
  let pChange1w = document.createElement('p');
  pChange1w.textContent = 'Change Last Week: $' + data[4];
  section.appendChild(pChange1w);

  return section;
}

function createAddDataWidget(name, data) {
  // parent element
  let section = document.createElement('section');
  section.id = 'addData';

  // header element
  let h2Elem = document.createElement('h2');
  h2Elem.textContent = 'Additional Data';
  section.appendChild(h2Elem);

  // rank
  let rank = document.createElement('p');
  rank.id = 'rank';
  rank.textContent = 'Rank in Top 10: ' + data[2];
  section.appendChild(rank);

  // available supply
  let supplyElem = document.createElement('p');
  supplyElem.textContent = 'Available Supply: ' + data[0];
  section.appendChild(supplyElem);

  // market cap
  let marketCap = document.createElement('p');
  marketCap.textContent = 'Market Cap: ' + data[1];
  section.appendChild(marketCap);

  // volume
  let volume = document.createElement('p');
  volume.textContent = 'Volume: ' + data[3];
  section.appendChild(volume);

  return section;
}

function createLinksWidget(name, listLinks, webUrl, twitterUrl) {
  // parent element
  let section = document.createElement('section');
  section.id = 'links';

  // header element
  let h2 = document.createElement('h2');
  h2.textContent = 'Useful Links:';
  section.appendChild(h2);

  // website URL
  let webUrlElem = document.createElement('a');
  webUrl.class = 'useful-link';
  webUrlElem.href = webUrl;
  webUrlElem.textContent = name + ' Website';
  section.appendChild(webUrlElem);

  // twitter URL
  let twitterUrlElem = document.createElement('a');
  twitterUrlElem.class = 'useful-link';
  twitterUrlElem.href = twitterUrl;
  twitterUrlElem.textContent = name + ' Twitter';
  section.appendChild(twitterUrlElem);

  // other useful links
  urlDiv = document.createElement('div');
  urlDiv.id = 'url-div';
  listLinks.forEach((link) => {
    let a = document.createElement('a');
    a.class = 'useful-link';
    a.href = link;
    a.textContent = textFromUrl(link);
    urlDiv.appendChild(a);
  });
  section.appendChild(urlDiv);

  return section;
}

function textFromUrl(url) {
  let addr = new URL(url);
  return addr.host;
}
