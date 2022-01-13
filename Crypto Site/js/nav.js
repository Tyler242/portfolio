function navMenu() {
  let navUl = document.querySelector('#nav-ul');
  if (navUl.style.display === 'block') {
    navUl.style.display = 'none';
  } else {
    navUl.style.display = 'block';
  }
}
window.onresize = () => {
  let htmlElement = document.getElementsByTagName('html');
  let navUl = document.querySelector('#nav-ul');
  if (htmlElement[0].offsetWidth >= 900) {
    navUl.style.display = 'flex';
  } else {
    navUl.style.display = 'none';
  }
};
