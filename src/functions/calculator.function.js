import { limitChecker } from "./limit-checker.function";

export const calculator = createCalculator();

export const updateEquation = (input, calc, setCalc, limit, type) => {
  // validate
  if (calc.isExceedLimit || !isValid(calc, type)) return;

  if (type === "digit" && !calc.equation) {
    setCalc({ ...calc, equation: `${input}` });
  }

  // input is a digit or valid operator: if exceeds limit, notify it, if not, update equation at this place
  limitChecker(input, limit, type)
    ? setCalc({ ...calc, isExceedLimit: true })
    : setCalc({ ...calc, equation: calc.equation + `${input}` });
};

export const updateResult = (calc, setCalc, operators, LIMIT) => {
  if (calc.isExceedLimit) return;
  // press "=" will not calculate any if no equation being displayed, or if the last operand is an operator
  if (!calc.equation || operators.includes(calc.equation.slice(-1))) return;

  // as follows will get response after calculating by using calculator function
  let response = 0;

  for (let i = 0; i < calc.equation.length; i++) {
    response = calculator(calc.equation[i], LIMIT);
    if (i === calc.equation.length - 1) {
      response = calculator("=", LIMIT);
    }

    // stop calculating and show exceedlimit notification by checking each round
    if (response === "EXCEED-LIMIT") {
      setCalc({ ...calc, isExceedLimit: true });
      return;
    }
  }

  // confirm response does not exceed limit, update result at this place
  setCalc({ ...calc, result: response });
  calculator("clear");
};

export const clearAll = (calcState, setCalc) => {
  setCalc(calcState);
  calculator("clear");
  limitChecker(null);
};

function createCalculator() {
  let currentResult = 0;
  let currentVal = "";
  let currentOperator = "";

  return pressInput;

  function pressInput(input, limit) {
    if (input === "clear") {
      reset();
    }
    // input is digit: append it to result string
    else if (/\d/.test(input)) {
      currentVal += String(input);
    }
    // input is operator: if there's already operator and value being input, we can calculate a result, otherwise, current result is current value, and save the given operator
    else if (/[+-/*]/.test(input)) {
      if (currentVal !== "" && currentOperator !== "") {
        currentResult = getResult(
          currentResult,
          Number(currentVal),
          currentOperator
        );
      } else {
        currentResult = Number(currentVal);
      }
      if (isExceedLimit(Number(currentResult), limit)) {
        return "EXCEED-LIMIT";
      }
      currentOperator = input;
      currentVal = "";
    }
    // calculate the result
    else if (input === "=") {
      if (currentOperator === "") {
        currentResult += Number(currentVal);
      } else {
        currentResult = getResult(
          currentResult,
          Number(currentVal),
          currentOperator
        );
      }
      console.log({ currentResult, limit });
      if (isExceedLimit(Number(currentResult), limit)) {
        return "EXCEED-LIMIT";
      }
      currentVal = "";
      return currentResult;
    }
  }

  function isExceedLimit(val, limit) {
    return val > limit;
  }

  function getResult(prev, next, operator) {
    const operations = {
      "+": (prev, next) => prev + next,
      "-": (prev, next) => prev - next,
      "*": (prev, next) => prev * next,
      "/": (prev, next) => prev / next,
    };

    return operations[operator](prev, next);
  }

  function reset() {
    currentResult = 0;
    currentVal = "";
    currentOperator = "";
  }
}

function isValid(calc, type) {
  // 00、[+-/*]0 is not valid
  if (type === "0") {
    return (
      calc.equation &&
      (calc.equation.slice(-1) !== "0" ||
        !/[+-/*]/.test(calc.equation.slice(-2, -1)))
    );
  }
  // 0{0~9}、[+-/*]0{0~9} is not valid
  if (type === "digit") {
    return (
      calc.equation.slice(-1) !== "0" ||
      !/[+-/*]/.test(calc.equation.slice(-2, -1))
    );
  }
  // input is an operator: no action if it's the first input or the previous and current input are both operators
  else if (type === "operator") {
    return !!calc.equation && !/[+-/*]/.test(calc.equation.slice(-1));
  }
  return true;
}