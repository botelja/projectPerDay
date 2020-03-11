const buttons = document.querySelectorAll('.btn');
const display = document.getElementById('display');

let operation = '';

buttons.forEach((button) => {
  button.addEventListener('click', () => {
    switch (button.classList.contains('action')) {
      case true:
        if (button.classList.contains('operator')) {
          concatOperation(button);
        } else {
          callAction(button);
        }
        break;
      case false:
        concatOperation(button);
        break;
    }
  });
});

function concatOperation(button) {
  if (button.classList.contains('operator')) {
    if (!operation) {
      return;
    }
  }

  operation += button.dataset.value;

  display.innerHTML = operation;
}

function callAction(button) {
  switch (button.dataset.value) {
    case 'calculate':
      operation = eval(operation).toString();

      display.innerHTML = operation;

      break;
    case 'clear':
      operation = '';
      display.innerHTML = operation;
      break;
    case 'backspace':
      operation = operation.slice(0, 1);
      display.innerHTML = operation;

    default:
      break;
  }
}
