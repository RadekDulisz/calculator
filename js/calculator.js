const numbers = document.querySelectorAll(".number");
const operators = document.querySelectorAll(".operator");
const clear = document.querySelector(".clear");
const equals = document.querySelector(".equals");
const previousResult = document.querySelector(".previous-result");
const currentResult = document.querySelector(".current-result");
const calculator = document.querySelector(".calculator");
const startButton = document.querySelector(".start-button");
const startPanel = document.querySelector(".start-panel");
const homeButton = document.querySelector(".home-button");
calculator.style.display = "none";
startButton.addEventListener("click", start);

let currentOperation = "";
let previousOperation = "";
let operation = undefined;

const calculate = () => {
  let calculation;

  if (!previousOperation || !currentOperation) {
    return;
  }

  const previousNumber = parseFloat(previousOperation);
  const currentNumber = parseFloat(currentOperation);

  if (isNaN(previousNumber) || isNaN(currentNumber)) {
    return;
  }

  switch (operation) {
    case "+":
      calculation = previousNumber + currentNumber;
      break;

    case "-":
      calculation = previousNumber - currentNumber;
      break;

    case "×":
      calculation = previousNumber * currentNumber;
      break;

    case "÷":
      if (currentNumber === 0) {
        clearResult();
        return;
      }
      calculation = previousNumber / currentNumber;
      break;

    case "^":
      if (
        Number.isInteger(Number(previousNumber)) &&
        Number.isInteger(Number(currentNumber)) &&
        previousNumber >= 0 &&
        currentNumber >= 0
      ) {
        calculation = Math.pow(previousNumber, currentNumber);
      } else {
        alert("That's not a natural number");
        previousOperation = "";
        currentOperation = "";
        operation = "";
        return currentOperation;
      }
      break;

    case "n!":
      calculation = factorialize(currentNumber);
      break;

    default:
      return;
  }
  currentOperation = calculation;
  previousOperation = "";
  operation = undefined;
};

const selectOperator = (operator) => {
  if (currentOperation === "") {
    return;
  }

  if (previousOperation !== "") {
    const previousNumber = previousResult.innerText;
    if (
      currentOperation.toString() === "0" &&
      previousNumber[previousNumber.length - 1] === "÷"
    ) {
      clearResult();
      return;
    }
    calculate();
  }

  operation = operator;
  previousOperation = currentOperation;
  currentOperation = "";
};

const updateResult = () => {
  if (operation != "n!") {
    currentResult.innerText = currentOperation;

    if (operation != null) {
      previousResult.innerText =
        previousOperation + operation + currentOperation;
    } else {
      previousResult.innerText = "";
    }
  } else {
    currentResult.innerText = factorialize(previousOperation);
  }
};

const clearResult = () => {
  currentOperation = "";
  previousOperation = "";
  operation = undefined;
};

const addNumber = (number) => {
  if (number === ".") {
    if (currentOperation.includes(".")) {
      return;
    }
    number = ".";
  }

  currentOperation = currentOperation.toString() + number.toString();
};

const factorialize = (number) => {
  if (Number.isInteger(Number(number)) && number > 0) {
    if (number === 0 || number === 1) {
      return 1;
    }
    for (let i = number - 1; i >= 1; i--) {
      number *= i;
    }
    return number;
  } else {
    alert("That's not a natural number");
    previousOperation = "";
    operation = "";
    return currentOperation;
  }
};

let allowedButtons = [];
const allowedButtonsSelect = document.querySelector(".allowedButtonsSelect");
allowedButtonsSelect.addEventListener("input", (e) => {
  allowedButtons = Array.from(e.target.selectedOptions).map(
    (option) => option.innerText
  );
});

function start() {
  numbers.forEach((number) => {
    if (allowedButtons.includes(number.innerText)) {
      number.addEventListener("click", () => {
        addNumber(number.innerText);
        updateResult();
      });
    } else {
      number.disabled = true;
    }
  });

  operators.forEach((operator) => {
    if (allowedButtons.includes(operator.innerText)) {
      operator.addEventListener("click", () => {
        selectOperator(operator.innerText);
        updateResult();
      });
    } else {
      operator.disabled = true;
    }
  });
  equals.addEventListener("click", () => {
    calculate();
    updateResult();
  });
  clear.addEventListener("click", () => {
    clearResult();
    updateResult();
  });

  showCalculator();
}

homeButton.addEventListener("click", () => {
  window.location.reload(true);
});

function showCalculator() {
  calculator.style.display = "grid";
  startPanel.style.display = "none";
  homeButton.style.display = "block";
}
