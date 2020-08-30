const calculator = document.querySelector('.calculator');
const calculatorButtonsDiv = calculator.querySelector('.calculator__keys');
const display = document.querySelector('.calculator__display');

calculatorButtonsDiv.addEventListener('click', e => {
  if (!event.target.closest('button')) return;
  // Adding event listener to the whole buttons div
  //   const { action } = button.dataset

  const button = event.target;
  const { buttonType, key } = button.dataset;
  const result = display.textContent;
  //   defining button to keys and result to display
  const { previousButtonType } = calculator.dataset;
  calculator.dataset.previousButtonType = buttonType;
  //  creating a custom dataset 'previous button type to clear selection to 0

  // NUMBER SECTION

  if (buttonType === 'number') {
    if (result === '0') {
      display.textContent = key;
      // If result is 0, then display the key that was pressed
    } else {
      display.textContent = result + key;
      // displaying the result with the current key pressed so larger numbers can be used
      if (previousButtonType === 'operator') {
        display.textContent = key;
        // if action was an operator, show the next clicked number
      }
    }
  }
  // DECIMAL SECTION

  if (buttonType === 'decimal') {
    if (!result.includes('.')) {
      display.textContent = result + '.';
      // This loop prevents another decimal from being entered into the display
      // LOGIC:  If the result does NOT include a decimal, then display result plus decimal
    }
  }

  // OPERATOR SECTION

  if (buttonType === 'operator') {
    // console.log('Pressed operator');
    button.classList.add('is-pressed');
    // highlights key that is pressed and adds the pressed state
    calculator.dataset.firstValue = result;
    // creates custom data-set known as 'data-first-value', to save first value entered declared under Equals section
    calculator.dataset.operator = button.dataset.key;
    // saves the first operator key pressed declared under Equals section
    const operatorKeys = [...calculatorButtonsDiv.children].filter(button => button.dataset.buttonType === 'operator');
    operatorKeys.forEach(button => button.classList.remove('is-pressed'));
    // removes the operator and highlight from its pressed state
  }

  // EQUALS SECTION

  if (buttonType === 'equal') {
    const firstValue = parseFloat(calculator.dataset.firstValue);
    const operator = calculator.dataset.operator;
    const secondValue = parseFloat(result);

    if (firstValue && operator) {
      let newResult;
      if (operator === 'plus') newResult = firstValue + secondValue;
      if (operator === 'minus') newResult = firstValue - secondValue;
      if (operator === 'times') newResult = firstValue * secondValue;
      if (operator === 'divide') newResult = firstValue / secondValue;

      display.textContent = newResult;
    }
  }

  // CLEAR SECTION

  if (buttonType !== 'clear') {
    const clearButton = calculator.querySelector('[data-button-type=clear]');
    clearButton.textContent = 'CE';
    // if button pressed is not the "clear" key, set text in clear key to "CE"
  }

  if (buttonType === 'clear') {
    if (button.textContent === 'AC') {
      delete calculator.dataset.firstValue;
      delete calculator.dataset.operator;
      //  this block clears firstValue and the Operator when AC is pressed
      // if clear button is pressed, clear first vale and the operator
      // when AC is pressed, memory is cleared of all values
    }

    display.textContent = '0';
    button.textContent = 'AC';
    // resets display 0 and changes the text content back to 'AC'
  }
});
