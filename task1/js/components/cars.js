import { colorGenerator } from '../utils/carsColorGenerator.js';
import { carsNameGenerator } from '../utils/carsNameGenerator.js';

const DEFAULT_PRORETIES = {
  FUEL: 5,
  DURABILITY: 100,
  SPEED: 10,
  TRACK_LENGTH: 200,
};

class BaseCar {
  constructor(name = 'Unknown Car') {
    this.name = name;
    this.fuel = 0;
    this.lowFuelConsumption = 0;
    this.durability = 0;
    this.speed = 0;
  }

  getTotalStats() {
    return this.speed + this.durability + this.fuel + this.lowFuelConsumption;
  }

  setPoints(param) {
    if (this.getTotalStats() < 12) {
      this[param] += 1;
    } else {
      alert('A maximum of 12 points on the car!');
    }
  }

  removePoints(param) {
    if (this[param] > 1) {
      this[param] -= 1;
    }
  }

  _setRandomPoints() {
    const params = ['fuel', 'lowFuelConsumption', 'durability', 'speed'];
    const randParam = params[Math.floor(Math.random() * params.length)];
    this[randParam] += 1;
    return this;
  }

  addOpponents(amount) {
    const cars = [];
    for (let i = 0; i < amount; i++) {
      const newCar = new this.constructor(carsNameGenerator());
      newCar.color = colorGenerator();
      cars.push(newCar);
      cars[i]._setRandomPoints()._setRandomPoints();
    }
    return cars;
  }

  getRange() {
    const totalFuel = this.fuel + DEFAULT_PRORETIES.FUEL;
    const range =
      totalFuel * DEFAULT_PRORETIES.TRACK_LENGTH +
      totalFuel *
        0.1 *
        DEFAULT_PRORETIES.TRACK_LENGTH *
        this.lowFuelConsumption;
    return range;
  }

  getTotalDurability() {
    const totalDurability =
      DEFAULT_PRORETIES.DURABILITY +
      this.durability * 0.1 * DEFAULT_PRORETIES.DURABILITY;
    return totalDurability;
  }

  getTotalSpeed() {
    const totalSpeed =
      DEFAULT_PRORETIES.SPEED + this.speed * 0.05 * DEFAULT_PRORETIES.SPEED;
    return totalSpeed;
  }
}

export class CivilianCar extends BaseCar {
  constructor(name = 'Civil car') {
    super(name);
    this.fuel = 2;
    this.lowFuelConsumption = 2;
    this.durability = 2;
    this.speed = 4;
  }
}

export class SportCar extends BaseCar {
  constructor(name = 'Sport car') {
    super(name);
    this.fuel = 2;
    this.lowFuelConsumption = 1;
    this.durability = 1;
    this.speed = 6;
  }
}

export class MilitaryCar extends BaseCar {
  constructor(name = 'Military car') {
    super(name);
    this.fuel = 2;
    this.lowFuelConsumption = 2;
    this.durability = 4;
    this.speed = 2;
  }
}
