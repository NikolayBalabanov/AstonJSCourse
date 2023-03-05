const getCenterElem = (item) => {
  const { top, left, width, height } = item.getBoundingClientRect();
  return {
    x: left + width / 2,
    y: top + height / 2,
  };
};

export default getCenterElem;
