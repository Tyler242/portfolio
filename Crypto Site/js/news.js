const URL1 = 'https://api.coinstats.app/public/v1/news/';
const URL2 = '?skip=0&limit=20';

async function getData(url) {
  let response = await fetch(url);
  let data = await response.json();
  populateNews(data.news);
}

// enable the user to get different news depending on the button they press.
let buttons = document.getElementsByTagName('button');
let buttonList = [...buttons];

buttonList.forEach((button) => {
  button.addEventListener('click', () => {
    let url = URL1 + button.innerHTML.toLowerCase() + URL2;
    getData(url);
  });
});

function populateNews(news) {
  // Get the news section
  computeDisplayGrid();
  let i = 0;
  news.forEach((listing) => {
    // Do not display any news articles from Reddit as the content is sometimes
    // innapropriate and is not in a readable format.
    if (
      (listing.source.split(' ')[0] == 'Reddit') |
      (listing.source.split(' ')[1] == 'Twitter')
    ) {
      document.getElementsByClassName('news-article')[i].style.display = 'none';
    } else {
      document.getElementsByClassName('news-article')[i].style.display =
        'block';
    }
    // update each news section
    document.querySelectorAll('.title')[i].textContent = listing.title;
    document.querySelectorAll('.source')[i].textContent = listing.source;
    document.querySelectorAll('.description')[i].textContent =
      listing.description;
    document.querySelectorAll('.link')[i].href = listing.link;
    document.querySelectorAll('.news-icon')[i].src = listing.imgURL;
    i++;
  });
}

function computeDisplayGrid() {
  let newsDisplay = document.querySelector('#news');
  let htmlElem = document.getElementsByTagName('html');
  if (htmlElem[0].offsetWidth >= 768 && htmlElem[0].offsetWidth < 1024) {
    newsDisplay.style.display = 'flex';
  } else if (htmlElem[0].offsetWidth >= 1024) {
    newsDisplay.style.display = 'grid';
  } else {
    newsDisplay.style.display = 'block';
  }
}

window.addEventListener('resize', computeDisplayGrid);
