// API Url
const url = 'https://byui-cit230.github.io/weather/data/towndata.json';
// Use the fetch api to get the town data
fetch(url)
  .then((response) => {
    // make sure we get a good response
    if (response.ok) {
      return response.json();
    } else {
      console.alert("ERROR: couldn't recieve data.");
    }
  })
  .then((response) => {
    //  Keep just the data we need.
    const townsArray = [
      response.towns[6],
      response.towns[0],
      response.towns[2],
    ];

    // Get the document elements.
    const section1 = document.querySelector('.t-one');
    const section2 = document.querySelector('.t-two');
    const section3 = document.querySelector('.t-three');
    const listSections = [section1, section2, section3];

    // Create the new elements
    let i = 0;
    townsArray.forEach((item) => {

      let h3Elem = document.createElement('h3');
      h3Elem.textContent = item.name;

      let mottoElem = document.createElement('p');
      mottoElem.setAttribute('class', 'motto');
      mottoElem.textContent = item.motto;

      let yearElem = document.createElement('p');
      yearElem.setAttribute('class', 'info');
      yearElem.textContent = 'Year Founded: ' + item.yearFounded;

      let popElem = document.createElement('p');
      popElem.setAttribute('class', 'info');
      popElem.textContent = 'Population: ' + item.currentPopulation;

      let rainElem = document.createElement('p');
      rainElem.setAttribute('class', 'info');
      rainElem.textContent = 'Average Rainfall: ' + item.averageRainfall;

      listSections[i].appendChild(h3Elem);
      listSections[i].appendChild(mottoElem);
      listSections[i].appendChild(yearElem);
      listSections[i].appendChild(popElem);
      listSections[i].appendChild(rainElem);

      i++;
    });
  });

// The following code is for the carousel and was taken from:
// https://engineertodeveloper.com/create-a-carousel-with-vanilla-javascript/

class Slider {
  constructor(sliderElem) {
    this.slider = sliderElem;
    this.sliderItems = sliderElem.getElementsByClassName('slider-item');
    this.nextBtn = sliderElem.querySelector('.slider-control-next');
    this.prevBtn = sliderElem.querySelector('.slider-control-prev');
    this.currentIndex = 0;
    this.prevItemIndex = this.sliderItems.length - 1;
    this.nextItemIndex = 1;
    this.isSliding = false;
    this.setEventListeners();
  }
  setEventListeners() {
    this.prevBtn.addEventListener('click', () => {
      this.prev();
    });
    this.nextBtn.addEventListener('click', () => {
      this.next();
    });
  }
  next() {
    if (this.isSliding) return;
    this.isSliding = true;
    this.sliderItems[this.nextItemIndex].classList.add('next-item');
    setTimeout(() => {
      this.sliderItems[this.currentIndex].classList.add('slide-next');
      this.sliderItems[this.nextItemIndex].classList.add('slide-end');
      this.sliderItems[this.nextItemIndex].classList.add('active');
    }, 20);
    setTimeout(() => {
      this.sliderItems[this.nextItemIndex].classList.remove(
        'next-item',
        'slide-end'
      );
      this.sliderItems[this.currentIndex].classList.remove(
        'slide-next',
        'active'
      );
      this.isSliding = false;
      this.setIndices('NEXT');
    }, 400);
  }
  prev() {
    if (this.isSliding) return;
    this.isSliding = true;
    this.sliderItems[this.prevItemIndex].classList.add('prev-item');
    setTimeout(() => {
      this.sliderItems[this.currentIndex].classList.add('slide-prev');
      this.sliderItems[this.prevItemIndex].classList.add('slide-end');
      this.sliderItems[this.prevItemIndex].classList.add('active');
    }, 20);
    setTimeout(() => {
      this.sliderItems[this.prevItemIndex].classList.remove(
        'prev-item',
        'slide-end'
      );
      this.sliderItems[this.currentIndex].classList.remove(
        'slide-prev',
        'active'
      );
      this.isSliding = false;
      this.setIndices('PREV');
    }, 400);
  }
  setIndices(direction) {
    let index;
    if (direction === 'NEXT') {
      index =
        this.currentIndex === this.sliderItems.length - 1
          ? 0
          : this.currentIndex + 1;
    }
    if (direction === 'PREV') {
      index =
        this.currentIndex === 0
          ? this.sliderItems.length - 1
          : this.currentIndex - 1;
    }
    if (index === 0) {
      this.currentIndex = index;
      this.nextItemIndex = index + 1;
      this.prevItemIndex = this.sliderItems.length - 1;
    } else if (index === this.sliderItems.length - 1) {
      this.currentIndex = this.sliderItems.length - 1;
      this.nextItemIndex = 0;
      this.prevItemIndex = this.currentIndex - 1;
    } else {
      this.currentIndex = index;
      this.nextItemIndex = index + 1;
      this.prevItemIndex = index - 1;
    }
  }
}

const slider = new Slider(document.querySelector('.slider'));
