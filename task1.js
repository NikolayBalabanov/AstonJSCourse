Array.prototype.filterArray = function (callBack, thisArg) {
  if (this === null || this === undefined) {
    throw new Error("Can't iterate over undefined or null");
  }
  if (typeof callBack !== "function") {
    throw new Error("Callback is not a function");
  }

  let curContext = this;
  if (arguments.length > 1) {
    curContext = thisArg;
  }
  const len = curContext.length;
  const resultArray = [];

  for (const i = 0; i < len; i++) {
    if (i in targetArray) {
      if (callBack.call(curContext, curContext[i], i, this)) {
        resultArray.push(curContext[i]);
      }
    }
  }
  return resultArray;
};
