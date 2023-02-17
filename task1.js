const sum = (a, b) => {
  const result = +a + +b;
  if (
    (typeof a === 'number' || typeof a === 'string') &&
    (typeof b === 'number' || typeof b === 'string') &&
    (!Number.isNaN(result))
  ) {
    return Number.isInteger(result)
      ? result
      : +(result).toFixed(3);
  }
  return 'Ошибка! Аргументы функции должны быть числами.';
};
