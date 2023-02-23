const ERROR_WARN = 'В функцию getInterval были переданы невалидные параметры.';
const ERROR_ARR = 'Параметр arr должен содержать только числовые значения';
const ERROR_FROM = 'Параметр from должен быть числом';
const ERROR_TO = 'Параметр to должен быть числом';

function isNum(elem) {
  if ((typeof elem === 'number') && !Number.isNaN(elem)) {
    return true
  }
  return false
}

function getInterval(arr, from, to) {
  if (!arr.every(isNum)) {
    throw new TypeError(ERROR_WARN + '\n' + ERROR_ARR);
  }
  if (!isNum(from)) {
    throw new TypeError(ERROR_WARN + '\n' + ERROR_FROM);
  }
  if (!isNum(to)) {
    throw new TypeError(ERROR_WARN + '\n' + ERROR_TO);
  }
  const startIndex = from < to ? from : to;
  const stopIndex = from > to ? from : to;
  const result = arr.filter((elem) => elem >= startIndex && elem <= stopIndex);
  return result;
}

