import { loader } from "./loader.js";

export class Main {
  constructor() {
    this.mainContainer = null;
  }

  render() {
    const main = document.createElement('main');
    const mainContainer = document.createElement('div');
    main.classList.add('main');
    mainContainer.classList.add('main__container', 'container');
    main.append(mainContainer);
    this.mainContainer = mainContainer;
    this.defaultContet();
    return main;
  }

  addLoader() {
    if (this.mainContainer) {
      this.mainContainer.append(loader());
    }
  }

  clear() {
    if (this.mainContainer) {
      this.mainContainer.innerHTML = '';
    }
  }

  defaultContet() {
    if (this.mainContainer) {
      const h1 = document.createElement('h1');
      h1.textContent = 'Привет, когда нажмешь на кнопки навигации, тут появится контент...';
      this.mainContainer.append(h1);
    }
  }
}
