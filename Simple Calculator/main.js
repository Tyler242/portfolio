function update_equ(item) {
  // This function will update the input box as the buttons are pressed.

  // Get the current html element.
  const inputBox = document.querySelector('#input');

  // Is the user clearing the box or creating an equation.
  if (item == 'ce') {
    // Clear the box.
    inputBox.value = '';
  } else {
    // Create the equation in a way that can be easily turned
    // into an array of values and operators later.
    if (typeof item != 'number') {
      // Space on each side of every operator.
      inputBox.value += ' ' + String(item) + ' ';
    } else {
      // Make it possible for multiple digits numbers.
      inputBox.value += String(item);
    }
  }
}

function add(num1, num2) {
  // Add two numbers
  return parseInt(num1) + parseInt(num2);
}

function subtract(num1, num2) {
  // Subtract two numbers
  return parseInt(num1) - parseInt(num2);
}

function multiply(num1, num2) {
  // Multiply two numbers
  return parseInt(num1) * parseInt(num2);
}

function divide(num1, num2) {
  // Divide two numbers
  return parseInt(num1) / parseInt(num2);
}

function compute() {
  // Compute the equation entered by the user.
  const inputBox = document.querySelector('#input');

  // Split the string into a list of values and operators.
  let equationList = input.value.split(' ');

  // Resolve multiplication and division first.
  for (let index = 0; index < equationList.length; index++) {
    if ((equationList[index] == '*') | (equationList[index] == '/')) {
      switch (equationList[index]) {
        case '*':
          // Add the computed value to the string and
          // remove the operator and extra value.
          equationList[index - 1] = String(
            multiply(equationList[index - 1], equationList[index + 1])
          );
          equationList.splice(index, 2);
          index -= 1;
          break;
        case '/':
          // Add the computed value to the string and
          // remove the operator and extra value.
          equationList[index - 1] = String(
            divide(equationList[index - 1], equationList[index + 1])
          );
          equationList.splice(index, 2);
          index -= 1;
          break;
      }
    }
  }

  // Resolve addition and subtraction last.
  for (let index = 0; index < equationList.length; index++) {
    switch (equationList[index]) {
      case '+':
        // Add the computed value to the string and
        // remove the operator and extra value.
        equationList[index - 1] = String(
          add(equationList[index - 1], equationList[index + 1])
        );
        equationList.splice(index, 2);
        index -= 1;
        break;
      case '-':
        // Add the computed value to the string and
        // remove the operator and extra value.
        equationList[index - 1] = String(
          subtract(equationList[index - 1], equationList[index + 1])
        );
        equationList.splice(index, 2);
        index -= 1;
        break;
    }
  }
  // Place the answer in the input box
  inputBox.value = equationList[0];
}
