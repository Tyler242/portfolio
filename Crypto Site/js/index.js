const newsUrl = 'https://api.coinstats.app/public/v1/news/handpicked';

async function getData(newsUrl) {
  let response = await fetch(newsUrl);
  let data = await response.json();
  populateNews(data.news);
}

function populateNews(news) {
  let i = 0;
  news.forEach((story) => {
    document.getElementsByClassName('title')[i].textContent = story.title;
    document.getElementsByClassName('news-image')[i].src = story.imgURL;
    document.getElementsByClassName('source')[i].textContent = story.source;
    document.getElementsByClassName('link')[i].href = story.link;
    i++;
  });
}

getData(newsUrl);
