import getCenterElem from './getCenterElem.js';
import getFinishPosition from './getFinishPosition.js';

export const getDistanceBetweenItems = (first, second) => {
  const firstPosition = getCenterElem(first);
  const secondPosition = getFinishPosition(second);

  return Math.hypot(
    firstPosition.x - secondPosition.x,
    firstPosition.y - secondPosition.y
  );
};

export default getDistanceBetweenItems;
