function deleteElementFromArray(arr, elem) {
  const new_arr = [...arr];
  const elemIndex = new_arr.indexOf(elem);
  if (elemIndex >= 0) {
    new_arr.splice(elemIndex, 1);
    return new_arr;
  }
  return arr;
}
