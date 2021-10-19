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
const currentPage = document.getElementsByTagName('title');
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
  if (el.innerHTML == currentPage[0].id) {
    el.className += ' current';
  }
});
