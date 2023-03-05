export const carAnimation = (car, distance, animationTime) => {
  let start = null;
  const state = {};

  function step(timestamp) {
    if (!start) start = timestamp;

    const time = timestamp - start;
    const passed = Math.round(time * (distance / animationTime));
    car.style.transform = `translateX(${Math.min(passed, distance)}px)`;

    if (passed < distance) {
      state.id = window.requestAnimationFrame(step);
    }
  }
  state.id = window.requestAnimationFrame(step);

  return state;
};
