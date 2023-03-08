import { update } from '../script.js';

export class Header {
  constructor() {}
  render() {
    const header = document.createElement('header');
    const headerContainer = document.createElement('div');
    headerContainer.classList.add('container', 'header__container');
    header.classList.add('header');
    headerContainer.innerHTML =
      `
        <nav class="nav">
          <ul class="list-reset nav__list">
            <li class="nav__item"><a href="posts" class="btn nav__link">posts</a></li>
            <li class="nav__item"><a href="comments" class="btn nav__link">comments</a></li>
            <li class="nav__item"><a href="photos" class="btn nav__link">photos</a></li>
            <li class="nav__item"><a href="todos" class="btn nav__link">todos</a></li>
          </ul>
        </nav>
      `
    header.append(headerContainer);
    return header;
  }
  setHendlers() {
    const nav_links = document.querySelectorAll('.nav__link');
    const nav = document.querySelector('.nav');

    nav.addEventListener('click', (event) => {
      nav_links.forEach((el) => el.classList.remove('is-active'));
      event.target.classList.add('is-active');
      const target = event.target;
      if (!target.matches('a')) {
        return;
      }
      let state = {
        page: target.getAttribute('href'),
      };
      history.pushState(state, '', state.page + '?/page-1');
      update();
      event.preventDefault();
    })
  }
}
