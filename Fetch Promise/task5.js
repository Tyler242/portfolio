/* Lesson 5 */

/* IF/ELSE IF */

// Step 1: Declare and initialize a new variable to hold the current date
let date = new Date();

// Step 2: Declare another variable to hold the day of the week
// Step 3: Using the variable declared in Step 1, assign the value of the variable declared in Step 2 to the day of the week ( hint: getDay() )
let dayOfWeek = date.getDay();

// Step 4: Declare a variable to hold a message that will be displayed
let msg;

// Step 5: Using an if statement, if the day of the week is a weekday (i.e. Monday - Friday), set the message variable to the string 'Hang in there!'
// Step 6: Using an else statement, set the message variable to 'Woohoo!  It is the weekend!'
if (dayOfWeek < 6) {
  msg = 'Hang in there!';
} else {
  msg = 'Woohoo! It is the weekend!';
}

/* SWITCH, CASE, BREAK */

// Step 1: Declare a new variable to hold another message
let msg2;

// Step 2: Use switch, case and break to set the message variable to the day of the week as a string (e.g. Sunday, Monday, etc.)
// using the day of week variable declared in Step 2 above
switch (dayOfWeek) {
  case 1:
    msg2 = 'Monday';
    break;
  case 2:
    msg2 = 'Tuesday';
    break;
  case 3:
    msg2 = 'Wednesday';
    break;
  case 4:
    msg2 = 'Thursday';
    break;
  case 5:
    msg2 = 'Friday';
    break;
  case 6:
    msg2 = 'Saturday';
    break;
  case 7:
    msg2 = 'Sunday';
    break;
  default:
    msg2 = 'Error';
    break;
}

/* OUTPUT */

// Step 1: Assign the value of the first message variable to the HTML element with an ID of message1
const msg1Element = document.querySelector('#message1');
msg1Element.innerHTML = msg;

// Step 2: Assign the value of the second message variable to the HTML element with an ID of message2
const msg2Element = document.querySelector('#message2');
msg2Element.innerHTML = msg2;

/* FETCH */

// Step 1: Declare a global empty array variable to store a list of temples
let templesArray = [];

// Step 2: Declare a function named output that accepts a list of temples as an array argument and does the following for each temple:
function output(temple) {
  // - Creates an HTML <article> element
  const articleElement = document.createElement('article');
  // - Creates an HTML <h3> element and add the temple's templeName property to it
  const h3Element = document.createElement('h3');
  h3Element.innerHTML = temple.templeName;
  // - Creates an HTML <h4> element and add the temple's location property to it
  const h4Element1 = document.createElement('h4');
  h4Element1.innerHTML = temple.location;
  // - Creates an HTML <h4> element and add the temple's dedicated property to it
  const h4Element2 = document.createElement('h4');
  h4Element2.innerHTML = temple.dedicated;
  // - Creates an HTML <img> element and add the temple's imageUrl property to the src attribute and the
  // - temple's templeName property to the alt attribute
  const imgElement = document.createElement('img');
  imgElement.setAttribute('src', temple.imageUrl);
  console.log();
  imgElement.setAttribute('alt', temple.templeName);
  // - Appends the <h3> element, the two <h4> elements, and the <img> element to the <article> element as children
  articleElement.appendChild(h3Element);
  articleElement.appendChild(h4Element1);
  articleElement.appendChild(h4Element2);
  articleElement.appendChild(imgElement);
  // - Appends the <article> element to the HTML element with an ID of temples
  document.querySelector('#temples').appendChild(articleElement);
}

// Step 3: Using the built-in fetch method, call this absolute URL: 'https://byui-cse.github.io/cse121b-course/week05/temples.json'
const url = 'https://byui-cse.github.io/cse121b-course/week05/temples.json';
fetch(url)
  // Step 4: Add a .then() method to turn the returned string into a JavaScript object ( hint: .json() )
  .then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      console.log('error:', response);
    }
  })
  // Step 5: Add another .then() method with a variable name to hold the temples and an empty arrow function
  .then((response) => {
    response.forEach((item) => {
      // Step 6: Inside of second .then() method, assign the list of temples (as a JSON object) to the temples variable
      templesArray.push(item);
    });
    // Step 7: Finally, call the output function and pass it the list of temples
    templesArray.forEach((temple) => {
      output(temple);
    });
  });

// Step 8: Declare a function named reset that clears all of the <article> elements from the HTML element with an ID of temples
function reset() {
  document.querySelector('#temples').innerHTML = '';
}

// Step 9: Declare a function named sortBy that does the following:
// - Calls the reset function
// - Sorts the global temple list by the currently selected value of the HTML element with an ID of sortBy
// - Calls the output function passing in the sorted list of temples
function sortBy() {
  reset();
  let sortOrder = document.querySelector('#sortBy').value;
  if (sortOrder == 'templeNameAscending') {
    templesArray.sort((a, b) => {
      if (a.templeName > b.templeName) {
        return 1;
      } else if (a.templeName < b.templeName) {
        return -1;
      } else {
        return 0;
      }
    });
  } else if (sortOrder == 'templeNameDescending') {
    templesArray.sort((a, b) => {
      if (a.templeName > b.templeName) {
        return -1;
      } else if (a.templeName < b.templeName) {
        return 1;
      } else {
        return 0;
      }
    });
  }
  templesArray.forEach((temple) => {
    output(temple);
  });
}

// Step 10: Add a change event listener to the HTML element with an ID of sortBy that calls the sortBy function
document.querySelector('#sortBy').addEventListener('change', sortBy);

/* STRETCH */

// Consider adding a "Filter by" feature that allows users to filter the list of temples
// This will require changes to both the HTML and the JavaScript files
