const getNumberRadix = (number, radix) => {
  const errorMsg = 'Переданы аргументы неверного формата!';
  const valNum = +number;
  if (
    Number.isInteger(valNum) &&
    valNum > 0 &&
    radix >= 2 &&
    radix <= 16
  ) {
    return valNum.toString(radix);
  }
  throw new Error(errorMsg);
};
