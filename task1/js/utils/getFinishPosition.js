const getFinishPosition = (item) => {
  const { top, right, height } = item.getBoundingClientRect();
  return {
    x: right,
    y: top + height / 2,
  };
};

export default getFinishPosition;
