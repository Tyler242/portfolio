// Get all the figure elements.
const figElements = document.getElementsByTagName('figure');
const figArray = [...figElements];

// place the alt text from each image into each p tag.
figArray.forEach((element) => {
  element.children[1].innerHTML +=
    ' ' + element.children[0].getAttribute('alt');
});
