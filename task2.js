function Company(name, salary) {
  const staff = {
    name,
    income: 0,
  };

  this.income = function (value) {
    Company.store.money += value - salary;
    staff.income += value - salary;
  };

  this.spend = function (value) {
    Company.store.money -= value;
    staff.income -= value;
  };

  Company.addStaff(staff);
}

Company.store = {
  staffList: [],
  countStaff: 0,
  money: 0,
};

Company.addStaff = function (staff) {
  this.store.staffList.push(staff);
  this.store.countStaff++;
};

Company.getLeaders = function () {
  const maxIncome = Math.max(
    ...Company.store.staffList.map((emp) => emp.income)
  );
  return Company.store.staffList.filter((emp) => emp.income === maxIncome);
};
