export const limitChecker = (function checkLimit() {
  let currentDigitsString;
  return function (value, limit, type) {
    if (value === null || type === "operator") {
      currentDigitsString = "";
      return;
    }

    if (currentDigitsString === undefined) {
      currentDigitsString = value;
    } else {
      currentDigitsString = `${currentDigitsString}` + value;
    }

    return Number(currentDigitsString) > limit;
  };
})();
