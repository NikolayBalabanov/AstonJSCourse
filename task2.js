const ERROR_MESSAGE =
  "the index cannot be a negative number or a fractional number";
function addElementsToArray(arr, index) {
  if (index && (index < 0 || !Number.isInteger(index))) {
    throw new Error(ERROR_MESSAGE);
  }
  return (...elems) => {
    let result = [...arr];
    if (index <= arr.length - 1) {
      result.splice(index, 0, ...elems);
    } else {
      result = [...arr, ...elems];
    }
    return result;
  };
}
