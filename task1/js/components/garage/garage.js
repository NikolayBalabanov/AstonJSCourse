import { carAnimation } from '../../utils/carAnimation.js';
// import createMoreCars from "../../utils/createMoreCars";
import { getDistanceBetweenItems } from '../../utils/getDistanceBetweenItems.js';
// import { race } from "../../utils/race";
// import returnCars from "../../utils/returnCars";
// import { store } from "../store";
// import "./garage.scss";

import { compare } from "../../utils/compare.js";
import { CivilianCar, MilitaryCar, SportCar } from "../cars.js";

class Garage {
  constructor() {
    this.garage = null
    this.userCar = null;
    this.raceCars = [];
    this.store = {animation: {}};
    this.controls = null;
    this.oponents = null;
    this.modalCompare = null;
    this.compareList = null;
  }

  async render(container) {
    const garage = document.createElement('div');
    garage.classList.add('main__garage', 'garage');
    const controls = this.setControlsWrap();
    const oponents = this.setOpponentsControls();
    this.garage = garage;
    this.controls = controls;
    this.oponents = oponents;
    this.showCompareModal()
    // const garageInfoWrap = this.setGarageInfoWrap();
    // const garageList = this.setGarageCarsList();
    // garage.append(controls, garageInfoWrap, garageList, garagePagination);
    garage.append(controls);
    container.append(garage);
  }

  setControlsWrap() {
    const controlsWrap = document.createElement('div');
    controlsWrap.classList.add('garage__controls', 'controls');
    const createWrap = this.setCreateControls();

    controlsWrap.append(createWrap);

    return controlsWrap;
  }

  setCreateControls() {
    const civilCar = new CivilianCar();
    const sportCar = new SportCar();
    const militaryCar = new MilitaryCar();
    let pickedCarType = civilCar;
    const wrapper = document.createElement('div');
    const createWrap = document.createElement('div');
    const createTitle = document.createElement('h2');
    const contentWrap = document.createElement('div')
    const createName = document.createElement('input');
    const createColorPicker = document.createElement('input');
    const typesWrap = document.createElement('div');
    const typesContent = document.createElement('div');
    const civilItem = this.setCarStatsItem(civilCar);
    const sportItem = this.setCarStatsItem(sportCar);
    const militaryItem = this.setCarStatsItem(militaryCar);
    const typePickers = document.createElement('div');
    const civilPicker = document.createElement('input');
    const civilLabel = document.createElement('label');
    const sportPicker = document.createElement('input');
    const sportLabel = document.createElement('label');
    const militaryPicker = document.createElement('input');
    const militaryLabel = document.createElement('label');
    const createBtn = document.createElement('button');
    createWrap.classList.add('controls__wrap');
    typesWrap.classList.add('controls__types');
    contentWrap.classList.add('controls__content');
    typePickers.classList.add('controls__list');
    typesContent.classList.add('controls__list');
    createTitle.classList.add('controls__title');
    createName.classList.add('controls__input-text');
    createColorPicker.classList.add('controls__color');
    createBtn.classList.add(
      'controls__btn',
      'btn',
      'btn-reset'
    );
    createWrap.append(createTitle, contentWrap);
    contentWrap.append(createName, createColorPicker);
    wrapper.append(createWrap, typesWrap, createBtn);
    typesContent.append(civilItem, sportItem, militaryItem);
    typesWrap.append(typesContent, typePickers);
    typePickers.append(civilLabel, sportLabel, militaryLabel);
    civilLabel.textContent = 'civil';
    sportLabel.textContent = 'sport';
    militaryLabel.textContent = 'military';
    civilLabel.prepend(civilPicker);
    sportLabel.prepend(sportPicker);
    militaryLabel.prepend(militaryPicker);
    createTitle.textContent = 'Car name and color';
    createName.type = 'text';
    createName.placeholder = 'Default name';
    createColorPicker.type = 'color';
    createBtn.textContent = 'CREATE';
    civilPicker.type = 'radio';
    civilPicker.name = 'car';
    civilPicker.id = 'civil';
    sportPicker.type = 'radio';
    sportPicker.name = 'car';
    sportPicker.id = 'sport';
    militaryPicker.type = 'radio';
    militaryPicker.name = 'car';
    militaryPicker.id = 'military';
    civilPicker.value = 'civil';
    sportPicker.value = 'sport';
    militaryPicker.value = 'military';
    civilLabel.for = 'civil';
    sportLabel.for = 'sport';
    militaryLabel.for = 'military';


    const types = [civilItem, sportItem, militaryItem]
    const pickers = [civilPicker, sportPicker, militaryPicker]

    pickers.forEach((picker, index) => {
      picker.addEventListener('click', () => {
        types.forEach((type) => type.classList.remove('picked'));
        types[index].classList.add('picked');
        switch(picker.value) {
          case 'civil':
            pickedCarType = civilCar;
            break;
          case 'sport':
            pickedCarType = sportCar;
            break;
          case 'military':
            pickedCarType = militaryCar;
            break;
          default:
            pickedCarType = civilCar;
            break;
        }
      })
    })

    createColorPicker.addEventListener('change', () => {
      civilCar.color = createColorPicker.value;
      sportCar.color = createColorPicker.value;
      militaryCar.color = createColorPicker.value;
    })

    createBtn.addEventListener('click', () => {
      createName.disabled = true;
      createColorPicker.disabled = true;
      createBtn.disabled = true;
      pickedCarType.name = createName.value.trim() || pickedCarType.name;
      pickedCarType.color = createColorPicker.value;
      this.userCar = pickedCarType;
      console.log(this.userCar);
      this.controls.innerHTML = '';
      this.controls.append(this.oponents);
    });

    return wrapper;
  }

  setCarStatsItem(car) {
    const wrap = document.createElement('div');
    const carType = document.createElement('h3');
    const carInfo = document.createElement('ul');
    const liFuel = document.createElement('li');
    const liConsumption = document.createElement('li');
    const liDurability = document.createElement('li');
    const liSpeed = document.createElement('li');
    const liDistance = document.createElement('li');
    const fuelBtns = document.createElement('div');
    const fuelAddBtn = document.createElement('button');
    const fuelRemoveBtn = document.createElement('button');
    const speedBtns = document.createElement('div');
    const speedAddBtn = document.createElement('button');
    const speedRemoveBtn = document.createElement('button');
    const consumptionBtns = document.createElement('div');
    const consumptionAddBtn = document.createElement('button');
    const consumptionRemoveBtn = document.createElement('button');
    const durabilityBtns = document.createElement('div');
    const durabilityAddBtn = document.createElement('button');
    const durabilityRemoveBtn = document.createElement('button');
    const fuel = document.createElement('span');
    const consumption = document.createElement('span');
    const durability = document.createElement('span');
    const speed = document.createElement('span');
    const distance = document.createElement('span');

    wrap.classList.add('car-stats');
    carType.classList.add('car-stats__title');
    carInfo.classList.add('car-stats__wrap', 'list-reset');
    fuel.classList.add('car-stats__text');
    consumption.classList.add('car-stats__text');
    durability.classList.add('car-stats__text');
    speed.classList.add('car-stats__text');
    distance.classList.add('car-stats__text');

    wrap.append(carType, carInfo);
    carType.textContent = car.name;
    carInfo.append(liFuel, liConsumption, liDurability, liSpeed, liDistance);

    liFuel.append(fuel, fuelBtns);
    liSpeed.append(speed, speedBtns);
    liConsumption.append(consumption, consumptionBtns);
    liDurability.append(durability, durabilityBtns);
    liDistance.append(distance);

    fuelBtns.append(fuelAddBtn, fuelRemoveBtn);
    consumptionBtns.append(consumptionAddBtn, consumptionRemoveBtn);
    speedBtns.append(speedAddBtn, speedRemoveBtn);
    durabilityBtns.append(durabilityAddBtn, durabilityRemoveBtn);
    fuelAddBtn.dataset.name = 'fuel';
    speedAddBtn.dataset.name = 'speed';
    consumptionAddBtn.dataset.name = 'lowFuelConsumption';
    durabilityAddBtn.dataset.name = 'durability';
    fuelRemoveBtn.dataset.name = 'fuel';
    speedRemoveBtn.dataset.name = 'speed';
    consumptionRemoveBtn.dataset.name = 'lowFuelConsumption';
    durabilityRemoveBtn.dataset.name = 'durability';

    const addBtns = [fuelAddBtn, speedAddBtn, consumptionAddBtn, durabilityAddBtn];
    const removeBtns = [fuelRemoveBtn, speedRemoveBtn, consumptionRemoveBtn, durabilityRemoveBtn];
    addBtns.forEach((el) => {
      el.classList.add('btn', 'btn--add');
      el.textContent = '+';
      el.addEventListener('click', () => {
        car.setPoints(el.dataset.name);
        switch(el.dataset.name) {
          case 'fuel':
            fuel.textContent = `Gas tank: ${car.fuel}`;
            distance.textContent = `Power reserve: ${car.getRange()}km`;
            break;
          case 'speed':
            speed.textContent = `Speed: ${car.speed}`;
            break;
          case 'lowFuelConsumption':
            consumption.textContent = `Fuel consumption: ${car.lowFuelConsumption}`;
            distance.textContent = `Power reserve: ${car.getRange()}km`;
            break;
          case 'durability':
            durability.textContent = `Durability: ${car.durability}`;
            break;
          default:
            break;
        }
      })
    });
    removeBtns.forEach((el) => {
      el.classList.add('btn', 'btn--remove');
      el.textContent = '-';
      el.addEventListener('click', () => {
        car.removePoints(el.dataset.name);
        switch(el.dataset.name) {
          case 'fuel':
            fuel.textContent = `Gas tank: ${car.fuel}`;
            distance.textContent = `Power reserve: ${car.getRange()}km`;
            break;
          case 'speed':
            speed.textContent = `Speed: ${car.speed}`;
            break;
          case 'lowFuelConsumption':
            consumption.textContent = `Fuel consumption: ${car.lowFuelConsumption}`;
            distance.textContent = `Power reserve: ${car.getRange()}km`;
            break;
          case 'durability':
            durability.textContent = `Durability: ${car.durability}`;
            break;
          default:
            break;
        }

      })
    })

    fuel.textContent = `Gas tank: ${car.fuel}`;
    consumption.textContent = `Fuel consumption: ${car.lowFuelConsumption}`;
    durability.textContent = `Durability: ${car.durability}`;
    speed.textContent = `Speed: ${car.speed}`;
    distance.textContent = `Power reserve: ${car.getRange()}km`;

    return wrap;
  }

  setOpponentsControls() {
    const carsControlsWrap = document.createElement('div');
    const opponentsTitle = document.createElement('h3');
    const contentWrap = document.createElement('div');
    const opponentsInput = document.createElement('input');
    const generateCarsBtn = document.createElement('button');
    carsControlsWrap.classList.add('controls__wrap');
    generateCarsBtn.classList.add('controls__btn', 'btn-reset', 'btn');
    contentWrap.classList.add('controls__create');
    opponentsTitle.classList.add('controls__title');
    opponentsInput.classList.add('controls__input-text')
    carsControlsWrap.append(opponentsTitle, contentWrap);
    contentWrap.append(opponentsInput, generateCarsBtn)
    opponentsTitle.textContent = 'How many race opponents will there be? (1-9)';
    opponentsInput.type = 'text';
    opponentsInput.placeholder = 'Enter the number of opponents';
    generateCarsBtn.textContent = 'Generate';
    generateCarsBtn.disabled = true;
    opponentsInput.addEventListener('keypress', (e) => {
      if(!/\d/.test(e.key)) e.preventDefault()
    })
    opponentsInput.addEventListener('input', () => {
      if (
        opponentsInput.value.length === 1
        && Number(opponentsInput.value) !== 0
      ) {
        generateCarsBtn.disabled = false;
      } else {
        generateCarsBtn.disabled = true;
      }
    })

    generateCarsBtn.addEventListener('click', () => {
      generateCarsBtn.disabled = true;
      const newCars = this.userCar.addOpponents(Number(opponentsInput.value));
      this.raceCars = [this.userCar, ...newCars];
      const garageInfoWrap = this.setGarageInfoWrap();
      const garageList = this.setGarageCarsList();
      this.garageList = garageList;
      this.controls.innerHTML = '';
      this.controls.append(this.setRaceControls());
      this.garage.append(this.controls, garageInfoWrap, garageList);
      this.updateGarage();
      generateCarsBtn.disabled = false;
    });

    return carsControlsWrap;
  }

  setRaceControls() {
    const carsControlsWrap = document.createElement('div');
    const raceBtn = document.createElement('button');
    const resetBtn = document.createElement('button');
    const compareBtn = document.createElement('button');
    carsControlsWrap.classList.add('controls__wrap', 'controls__race');
    raceBtn.classList.add('controls__btn', 'btn-reset', 'btn');
    resetBtn.classList.add('controls__btn', 'btn-reset', 'btn');
    compareBtn.classList.add('controls__btn', 'btn-reset', 'btn');
    carsControlsWrap.append(raceBtn, resetBtn, compareBtn);
    raceBtn.textContent = 'RACE';
    resetBtn.textContent = 'RESET';
    compareBtn.textContent = 'SHOW COMPARE';
    resetBtn.disabled = true;

    raceBtn.addEventListener('click', () => {
      raceBtn.disabled = true;
      const raceArr = this.raceCars.map((car) => this.startDrive(car));
      resetBtn.disabled = false;
    });

    resetBtn.addEventListener('click', () => {
      const raceArr = this.raceCars.map((car) => this.stopDrive(car));
      raceBtn.disabled = false;
      resetBtn.disabled = true;
    });

    compareBtn.addEventListener('click', () => {
      compareBtn.disabled = true;
      const compareArr = compare(this.raceCars);
      this.compareList.innerHTML = '';
      this.compareList.append(...compareArr.map((car) => this.setCompareItem(car)));
      this.modalCompare.classList.add('is-shown');
      compareBtn.disabled = false;
    });

    return carsControlsWrap;
  }

  showCompareModal() {
    const modal = document.createElement('div');
    const compareList = document.createElement('ul');
    const confirmBtn = document.createElement('button');
    modal.classList.add('modal');
    compareList.classList.add('list-reset', 'models');
    confirmBtn.classList.add('modal__btn', 'btn-reset', 'btn');
    modal.append(compareList, confirmBtn);
    confirmBtn.textContent = 'Okey!';
    document.body.append(modal);

    this.modalCompare = modal;
    this.compareList = compareList;

    confirmBtn.addEventListener('click', () => {
      modal.classList.remove('is-shown');
    });
  }

  setCompareItem(car) {
    const item = document.createElement('li');
    item.classList.add('model');
    item.innerHTML =
      `
        <h2 class="model__name">${car.name}</h2>
        <div class="model__stats">
          <div class="model__stat">
            <span class="model__power-reserve-name">Power reserve</span>
            <span class="model__power-reserve-value">${car.range}</span>
          </div>
          <div class="model__stat">
            <span class="model__durability-name">Durability</span>
            <span class="model__durability-value">${car.durability}</span>
          </div>
          <div class="model__stat">
            <span class="model__speed-name">Speed</span>
            <span class="model__speed-value">${car.speed}</span>
          </div>
        </div>
      `
    return item;
  }

  setGarageInfoWrap() {
    const infoWrap = document.createElement("div");
    const carsCnt = document.createElement("div");
    const pagesCnt = document.createElement("div");
    infoWrap.classList.add("garage__info");
    carsCnt.classList.add("garage__cnt");
    pagesCnt.classList.add("garage__cnt");
    carsCnt.textContent = `Garage (${this.raceCars.length})`;
    infoWrap.append(carsCnt, pagesCnt);

    return infoWrap;
  }

  setGarageCarsList() {
    const carsList = document.createElement("ul");
    carsList.classList.add("list-reset", "garage__list");

    return carsList;
  }

  setCarItem(car) {
    const carItemWrap = document.createElement('li');
    const carChangeControls = document.createElement('div');
    const carName = document.createElement('span');
    const carWrap = document.createElement('div');
    const carTrack = document.createElement('div');
    const carEngineControls = document.createElement('div');
    const carStart = document.createElement('button');
    const carStop = document.createElement('button');
    carItemWrap.classList.add('garage__car', 'car');
    carChangeControls.classList.add('car__change-btns');
    carName.classList.add('car__name');
    carWrap.classList.add('car__wrap');
    carTrack.classList.add('car__track');
    carEngineControls.classList.add('car__engine-btns');
    carStart.classList.add('car__start', 'btn', 'btn-reset');
    carStop.classList.add('car__stop', 'btn', 'btn-reset');
    carItemWrap.append(carChangeControls, carWrap);
    carChangeControls.append(carName);
    carWrap.append(carEngineControls, carTrack);

    carEngineControls.append(carStart, carStop);
    carName.textContent = `${car.name}`;
    carStart.textContent = 'START';
    carStop.textContent = 'STOP';
    carStop.disabled = true;
    carTrack.id = `track-${car.name}`;
    carTrack.innerHTML = `
      <svg id="car-${car.name}" version="1.0" xmlns="http://www.w3.org/2000/svg" width="1280.000000pt" height="640.000000pt" viewBox="0 0 1280.000000 10.000000" preserveAspectRatio="xMidYMid meet">
        <g transform="translate(0.000000,640.000000) scale(0.100000,-0.100000)" fill="${car.color}" stroke="none">
          <path d="M3525 5341 c-72 -18 -79 -28 -90 -121 -4 -30 -11 -62 -16 -71 -4 -9 -97 -51 -206 -94 -774 -304 -1348 -540 -1603 -661 -163 -77 -222 -91 -421 -104 -85 -5 -170 -14 -189 -20 -101 -32 -362 -58 -620 -63 l-115 -2 -47 -80 c-47 -78 -47 -80 -29 -100 34 -36 35 -77 5 -177 -30 -99 -34 -178 -19 -370 5 -67 4 -88 -6 -88 -29 0 -83 -56 -110 -114 -50 -106 -74 -343 -48 -467 13 -58 13 -62 3 -159 -5 -54 16 -238 28 -244 2 -1 29 -20 61 -41 73 -49 123 -103 132 -143 17 -79 167 -155 355 -181 104 -15 969 -97 1087 -104 l32 -2 5 160 c7 230 50 394 146 559 281 479 917 673 1405 429 316 -159 530 -424 598 -742 22 -106 29 -365 13 -519 l-8 -82 3002 0 c2855 0 3002 1 2995 18 -33 87 -56 325 -45 461 28 320 177 567 459 759 399 273 847 282 1243 24 239 -157 397 -392 460 -687 18 -84 15 -341 -5 -430 -8 -38 -14 -71 -12 -73 7 -8 386 20 478 34 180 28 253 65 304 152 24 41 28 57 28 127 -1 44 -9 117 -20 163 -18 79 -18 88 -2 190 31 199 40 306 41 497 1 176 -1 195 -23 260 -46 135 -103 190 -283 274 -222 104 -633 220 -1168 330 -523 108 -1524 210 -2054 211 l-229 0 -236 139 c-813 477 -1593 884 -1852 966 -498 157 -1598 195 -2892 100 l-188 -14 -47 30 c-92 58 -223 89 -297 70z m1912 -311 c13 -45 58 -305 88 -515 33 -226 74 -539 71 -542 -7 -7 -1672 40 -2054 58 -357 16 -464 56 -573 215 -62 91 -87 225 -59 326 12 40 56 74 192 148 369 198 799 289 1618 340 246 15 290 16 510 16 l194 -1 13 -45z m649 10 c383 -36 717 -86 934 -139 210 -52 451 -163 720 -332 141 -88 379 -259 380 -271 0 -5 -14 -8 -32 -8 -48 0 -114 -37 -140 -78 -24 -39 -30 -113 -15 -189 l9 -43 -904 0 -904 0 -176 540 -175 540 47 0 c25 0 141 -9 256 -20z"/> <path d="M2617 3125 c-431 -82 -774 -440 -838 -875 -17 -117 -7 -292 24 -410 113 -436 497 -751 947 -777 507 -29 959 313 1076 813 28 117 26 348 -4 467 -94 378 -383 670 -760 768 -105 27 -336 34 -445 14z m378 -310 c84 -21 209 -85 280 -142 116 -94 210 -242 251 -393 23 -87 24 -260 0 -355 -58 -237 -242 -439 -473 -519 -531 -186 -1074 277 -969 828 30 152 94 274 206 386 111 110 237 178 385 206 84 16 235 11 320 -11z"/> <path d="M2918 2568 c2 -90 7 -167 12 -172 17 -17 108 58 201 166 l51 57 -48 31 c-52 33 -131 65 -185 75 l-34 6 3 -163z"/> <path d="M2591 2700 c-62 -22 -167 -82 -164 -94 3 -13 237 -216 249 -216 7 0 15 7 18 16 8 20 8 127 -1 232 -7 95 -8 96 -102 62z"/> <path d="M3209 2355 c-57 -64 -105 -123 -107 -131 -6 -25 46 -35 157 -29 58 3 121 8 139 11 33 5 34 6 27 42 -7 44 -64 167 -92 201 l-19 24 -105 -118z"/> <path d="M2260 2409 c-31 -44 -68 -133 -77 -186 l-6 -33 155 0 c165 0 201 9 181 44 -13 24 -204 216 -214 216 -5 0 -22 -18 -39 -41z"/> <path d="M2786 2354 c-36 -35 0 -87 44 -64 26 14 26 56 1 70 -25 13 -27 13 -45 -6z"/> <path d="M2751 2186 c-57 -32 -68 -111 -22 -157 43 -42 101 -43 143 -1 42 42 41 100 -1 143 -33 32 -78 38 -120 15z"/> <path d="M2560 2136 c-19 -23 -8 -61 18 -64 44 -7 67 32 36 62 -19 20 -38 20 -54 2z"/> <path d="M3002 2124 c-27 -19 -28 -36 -3 -58 25 -23 61 -6 61 29 0 33 -30 49 -58 29z"/> <path d="M2245 1993 c-77 -6 -76 -5 -59 -65 16 -55 61 -146 92 -186 l18 -23 103 122 c57 67 104 129 105 138 1 14 -14 16 -104 17 -58 0 -127 -1 -155 -3z"/> <path d="M3165 1981 c-44 -4 -61 -10 -63 -22 -3 -16 210 -229 228 -229 22 0 86 141 105 228 l7 32 -109 -2 c-59 -1 -135 -4 -168 -7z"/> <path d="M2776 1914 c-19 -18 -19 -20 -6 -45 6 -11 21 -19 35 -19 20 0 45 24 45 44 0 10 -32 36 -45 36 -7 0 -21 -7 -29 -16z"/><path d="M2589 1743 c-86 -90 -139 -151 -139 -162 0 -25 179 -101 236 -101 l27 0 -7 143 c-9 166 -13 187 -35 187 -9 0 -46 -30 -82 -67z"/><path d="M2936 1801 c-6 -10 -24 -168 -29 -258 -3 -60 -2 -63 19 -63 79 0 262 68 248 92 -5 7 -53 64 -108 126 -93 105 -117 124 -130 103z"/><path d="M10723 3125 c-318 -58 -597 -266 -743 -555 -223 -441 -98 -996 289 -1288 112 -84 188 -125 311 -166 274 -91 545 -70 802 61 552 282 735 983 392 1500 -225 339 -651 521 -1051 448z m385 -315 c348 -98 579 -443 532 -796 -67 -508 -596 -796 -1055 -574 -239 116 -396 352 -412 620 -20 335 192 640 516 745 122 40 289 42 419 5z"/><path d="M11017 2568 c3 -90 9 -167 14 -172 13 -14 53 18 155 122 l95 97 -23 18 c-50 40 -189 97 -235 97 -10 0 -11 -33 -6 -162z"/><path d="M10705 2706 c-50 -16 -133 -58 -163 -82 l-23 -19 121 -107 c67 -60 128 -108 135 -108 23 0 27 39 20 186 -8 162 -4 157 -90 130z"/><path d="M11307 2354 c-59 -65 -107 -126 -107 -136 0 -11 11 -18 38 -22 44 -7 278 7 289 17 15 16 -51 183 -94 236 l-19 24 -107 -119z"/><path d="M10362 2413 c-39 -62 -70 -134 -78 -184 l-7 -39 152 0 c86 0 161 5 172 10 17 10 18 13 5 38 -8 15 -59 71 -114 125 l-99 99 -31 -49z"/><path d="M10888 2359 c-24 -14 -23 -56 2 -69 44 -23 80 29 44 64 -18 19 -23 19 -46 5z"/><path d="M10851 2187 c-49 -29 -66 -101 -35 -146 9 -13 32 -29 50 -37 29 -12 39 -12 68 0 99 41 85 180 -19 192 -24 3 -50 -1 -64 -9z"/><path d="M10660 2136 c-19 -23 -8 -61 18 -64 44 -7 67 32 36 62 -19 20 -38 20 -54 2z"/><path d="M11096 2124 c-9 -8 -16 -22 -16 -29 0 -13 26 -45 36 -45 20 0 44 25 44 45 0 14 -8 29 -19 35 -25 13 -27 13 -45 -6z"/><path d="M10335 1991 c-60 -6 -60 -6 -57 -36 9 -69 104 -248 122 -229 57 61 210 250 207 258 -4 12 -176 17 -272 7z"/><path d="M11267 1983 c-68 -5 -79 -19 -47 -60 23 -31 200 -193 210 -193 3 0 20 24 37 53 29 48 52 111 67 180 l6 27 -107 -2 c-60 -1 -134 -3 -166 -5z"/><path d="M10870 1910 c-16 -31 4 -62 38 -58 21 2 28 9 30 32 5 45 -47 65 -68 26z"/><path d="M10651 1703 c-56 -59 -101 -113 -101 -120 0 -28 172 -103 237 -103 l26 0 -7 123 c-10 179 -15 207 -36 207 -10 0 -63 -48 -119 -107z"/><path d="M11035 1801 c-7 -12 -23 -144 -29 -243 -4 -77 -4 -78 19 -78 45 0 130 22 193 51 l64 29 -19 23 c-65 82 -198 227 -209 227 -7 0 -15 -4 -19 -9z"/>
        </g>
      </svg>
      <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 22" xml:space="preserve">
        <polyline style="fill:none;stroke:#000000;stroke-width:2;stroke-miterlimit:10;" points="6,28 6,5 26,5 26,19 6,19 "/>
        <rect x="22" y="5" width="4" height="4"/>
        <rect x="19" y="15" width="3" height="4"/>
        <rect x="19" y="9" width="3" height="3"/>
        <rect x="13" y="15" width="3" height="4"/>
        <rect x="13" y="9" width="3" height="3"/>
        <rect x="6" y="15" width="4" height="4"/>
        <rect x="6" y="9" width="4" height="3"/>
        <rect x="22" y="12" width="4" height="3"/>
        <rect x="16" y="12" width="3" height="3"/>
        <rect x="10" y="12" width="3" height="3"/>
        <rect x="16" y="5" width="3" height="4"/>
        <rect x="10" y="5" width="3" height="4"/>
      </svg>
    `;
    carStart.addEventListener('click', () => {
      carStart.disabled = true;
      this.startDrive(car);
      carStop.disabled = false;
    });
    carStop.addEventListener('click', () => {
      carStop.disabled = true;
      this.stopDrive(car);
      carStart.disabled = false;
    });
    return carItemWrap;
  }

  startDrive = (carInfo) => {
    const time = 5000 / carInfo.speed;
    const car = document.getElementById(`car-${carInfo.name}`);
    const track = document.getElementById(`track-${carInfo.name}`);
    const raceDistance = Math.floor(getDistanceBetweenItems(car, track) - 50);
    this.store.animation[carInfo.name] = carAnimation(car, raceDistance, time);
  };

  stopDrive(carInfo) {
    const car = document.getElementById(`car-${carInfo.name}`);
    car.style.transform = 'translateX(0)';
    if (this.store.animation[carInfo.name]) {
      window.cancelAnimationFrame(this.store.animation[carInfo.name][carInfo.name]);
    }
  }

  fillCarsList(cars) {
    if (this.garageList) {
      this.garageList.innerHTML = '';
    }
    if (cars.length > 0) {
      cars.forEach((el) => {
        const car = this.setCarItem(el);
        this.garageList?.append(car);
      });
    }
  }

  updateGarage() {
    this.fillCarsList(this.raceCars);
  }

  setWinModal = () => {
    const modal = document.createElement('div');
    const message = document.createElement('span');
    const confirmBtn = document.createElement('button');
    modal.classList.add('modal');
    message.classList.add('modal__message');
    confirmBtn.classList.add('modal__btn', 'btn-reset', 'btn');
    modal.append(message, confirmBtn);
    confirmBtn.textContent = 'Hooray!';
    document.body.append(modal);

    this.modal = modal;
    this.message = message;
    this.confirmBtn = confirmBtn;

    confirmBtn.addEventListener('click', () => {
      modal.classList.remove('is-shown');
    });
  };
}

export default Garage;
