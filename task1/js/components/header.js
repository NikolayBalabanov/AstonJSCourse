class Header {
  render() {
    const header = document.createElement('header');
    const container = this.createContainer();
    header.classList.add('header');
    header.append(container);
    return header;
  }

  createLogo() {
    const logo = document.createElement('h1');
    logo.classList.add('header__logo');
    logo.textContent = 'Death Race';
    return logo;
  }

  createNav() {
    const nav = document.createElement('nav');
    const navList = document.createElement('ul');
    const garageItem = document.createElement('li');
    const garageBtn = document.createElement('button');
    const winnersItem = document.createElement('li');
    const winnersBTN = document.createElement('button');

    nav.classList.add('header__nav', 'nav');
    navList.classList.add('nav__list', 'list-reset');
    garageItem.classList.add('nav__item');
    garageBtn.classList.add('nav__btn', 'btn-reset');
    winnersItem.classList.add('nav__item');
    winnersBTN.classList.add('nav__btn', 'btn-reset');

    nav.append(navList);
    navList.append(garageItem, winnersItem);
    garageItem.append(garageBtn);
    winnersItem.append(winnersBTN);
    garageBtn.textContent = 'GARAGE';
    winnersBTN.textContent = 'WINNERS';
    garageBtn.addEventListener('click', () => {
      const garageWrapper = document.querySelector('.main__garage');
      const winnesWrapper = document.querySelector('.main__winners');
      if (garageWrapper && winnesWrapper) {
        garageWrapper.classList.remove('is-hidden');
        winnesWrapper.classList.add('is-hidden');
      }
    });
    winnersBTN.addEventListener('click', () => {
      const garageWrapper = document.querySelector('.main__garage');
      const winnesWrapper = document.querySelector('.main__winners');
      if (garageWrapper && winnesWrapper) {
        garageWrapper.classList.add('is-hidden');
        winnesWrapper.classList.remove('is-hidden');
      }
    });

    return nav;
  }

  createContainer() {
    const container = document.createElement('div');
    container.classList.add('header__container', 'container');
    container.append(this.createLogo(), this.createNav());

    return container;
  }
}

export default Header;
