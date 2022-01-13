let date = new Date();

let daysInWeek = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

let months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

document.querySelector('#date-p').textContent =
  daysInWeek[date.getDay()] +
  ', ' +
  String(date.getDate()) +
  ' ' +
  months[date.getMonth()] +
  ' ' +
  String(date.getFullYear());
