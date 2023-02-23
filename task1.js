function deepCopyObject(obj) {
  const cloneObj = {};
  for (let key in obj) {
    if (obj[key] instanceof Object && obj[key] !== null) {
      cloneObj[key] = deepCopyObject(obj[key]);
    } else {
      cloneObj[key] = obj[key];
    }
  }
  return cloneObj;
}
