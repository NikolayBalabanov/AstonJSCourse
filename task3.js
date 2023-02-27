function createPerson({name = 'New User', skills = []}) {
  return {
    name,
    skills,
    addName(value) {
      this.name = value;
      return this;
    },
    addSkill(skill) {
      if (!this.skills.includes(skill)) {
        this.skills.push(skill);
      }
      return this;
    },
    removeSkill(skill) {
      this.skills = this.skills.filter((el) => el !== skill);
      return this;
    },
  };
}
