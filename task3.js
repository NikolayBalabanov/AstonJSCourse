function createLike() {
  const obj = {
    likeCnt: 0,
    like() {
      this.likeCnt++;
      return this;
    },
    dislike() {
      this.likeCnt--;
      return this;
    },
    val() {
      return this.likeCnt;
    },
  };

  return obj;
}

const liker = createLike();
// console.log(liker.like().like().like().dislike().val()); // 2
