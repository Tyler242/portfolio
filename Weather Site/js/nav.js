function navMenu() {
  let nav = document.querySelector('#nav');
  if (nav.style.display === 'block') {
    nav.style.display = 'none';
  } else {
    nav.style.display = 'block';
  }
}
window.onresize = () => {
  let htmlElement = document.getElementsByTagName('html');
  let nav = document.querySelector('#nav');
  if (htmlElement[0].offsetWidth >= 760) {
    nav.style.display = 'flex';
  } else {
    nav.style.display = 'none';
  }
};

// Assuming that each page is built similarly, this should work the same on each page.

// Get the html title element and html nav ul element.
let currentId = document.getElementsByTagName('title')[0].id;
if (currentId.includes('-')) {
  currentPage = currentId.split('-')[0] + ' ' + currentId.split('-')[1];
} else {
  currentPage = currentId;
}
const navUl = document.querySelector('#nav');

// get the li elements inside the nav ul.
const navLi = [...navUl.children];

// get each a tag within each li tag.
let navAElements = [];
navLi.forEach((one) => {
  navAElements.push(one.firstChild);
});

// iterate through the a tags until the innerHTML matches the id of the page.
// Then apply the current class to the matching a tag.
navAElements.forEach((el) => {
  if (el.innerHTML == currentPage) {
    el.className += ' current';
  }
});
