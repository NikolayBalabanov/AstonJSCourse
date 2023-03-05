const findMaxValue = (arr, parametr) => {
  const max = arr.reduce((acc, item) => {
    if (item[parametr] >= acc) {
      acc = item[parametr];
    }
    return acc;
  }, 0);

  return max;
};

export const compare = (carsArray) => {
  const carsStatsArr = carsArray.map((car) => {
    return {
    range: car.getRange(),
    durability: car.getTotalDurability(),
    speed: car.getTotalSpeed(),
    name: car.name,
  }});
  return carsStatsArr.map((item) => {
    const comparedCarsObj = {};

    Object.keys(item).forEach((key) => {
      const comparedStatsObj = {};
      const maxValue = findMaxValue(carsStatsArr, key);
      const currentValue = item[key];

      if (key === 'name') {
        comparedStatsObj[key] = currentValue;
      } else if (currentValue === maxValue) {
        comparedStatsObj[key] = 100 + '%';
      } else {
        comparedStatsObj[key] =
          Math.floor((currentValue / maxValue) * 100) + '%';
      }

      comparedCarsObj[key] = comparedStatsObj[key];
    });

    return comparedCarsObj;
  });
}

