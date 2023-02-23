const ERROR_WARN = 'В getUniqArray был передан невалидный параметр';
const ERROR_BODY = 'Аргумент arrдолжен быть массивом чисел';
function getUniqArray(arr) {
  if (!arr.every((elem) => typeof elem === 'number' && !Number.isNaN(elem))) {
    throw new Error(ERROR_WARN + '\n' + ERROR_BODY);
  }
  return Array.from(new Set(arr));
}
