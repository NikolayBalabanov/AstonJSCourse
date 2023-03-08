import { update } from "../script.js";

export class Page {
  constructor() {
    this.body = null;
    this.list = null;
    this.title = null;
    this.pagination = null;
  }

  render({ title, data, pageNumber, lastPage }) {
    const page = document.createElement('div');
    page.classList.add('page');
    const pageTitle = this.createTitle(title);
    const pageBody = this.createBody();
    data.forEach(element => {
      this.list.append(this.createBodyItem(element, title));
    });
    const pagination = this.createPagination(pageNumber, lastPage);
    page.append(pageTitle, pageBody, pagination);
    return page;
  }

  createTitle(text) {
    const title = document.createElement('h1');
    title.classList.add('main__title');
    title.textContent = text;
    return title;
  }

  createBody() {
    const wrap = document.createElement('div');
    const list = document.createElement('ul');
    wrap.classList.add('main__content');
    list.classList.add('main__list', 'list-reset');
    this.body = wrap;
    this.list = list;
    wrap.append(list);
    return wrap;
  }

  createBodyItem(itemData, type) {
    switch(type) {
      case 'posts':
        return this.createPost(itemData);
      case 'comments':
        return this.createComment(itemData);
      case 'photos':
        return this.createPhoto(itemData);
      case 'todos':
        return this.createTodo(itemData);
      default:
        break;
    }
  }

  createPost(itemData) {
    const li = document.createElement('li');
    li.classList.add('main__item');
    li.innerHTML =
      `
        <div class="content">
          <div class="content__order">${itemData.id}</div>
          <div class="content__wrap">
            <h3 class="content__title">${itemData.title}</h3>
            <p class="content__text">${itemData.body}</p>
          </div>
        </div>
      `

    return li;
  }

  createTodo(itemData) {
    const li = document.createElement('li');
    li.classList.add('main__item');
    itemData.completed ? li.classList.add('is-complited') : '';
    li.innerHTML =
      `
        <div class="content">
          <div class="content__order">${itemData.id}</div>
          <div class="content__wrap ">
            <h3 class="content__title">${itemData.title}</h3>
            <span class="content__text">Complited${itemData.body}</span>
          </div>
        </div>
      `
    return li;
  }

  createPhoto(itemData) {
    const li = document.createElement('li');
    li.classList.add('main__item');
    li.innerHTML =
      `
        <div class="content">
          <div class="content__order">${itemData.id}</div>
          <div class="content__wrap">
            <h3 class="content__title">${itemData.title}</h3>
            <img src="${itemData.url}" alt="${itemData.title}">
          </div>
        </div>
      `
    return li;
  }

  createComment(itemData) {
    const li = document.createElement('li');
    li.classList.add('main__item');
    li.innerHTML =
      `
        <div class="content">
          <div class="content__order">${itemData.id}</div>
          <div class="content__wrap">
            <h3 class="content__title">Name: ${itemData.name}</h3>
            <h3 class="content__title">Email: ${itemData.email}</h3>
            <p class="content__text">${itemData.body}</p>
          </div>
        </div>
      `
    return li;
  }

  createPagination(page, lastId, itemsOnPage = 10) {
    const pagination = document.createElement('div');
    const lastPage = Math.ceil(+lastId / itemsOnPage);
    pagination.classList.add('pagination');
    pagination.innerHTML =
      `
        <a href="${page - 1 ? page - 1 : 1}">предыдущаяя</a>
            ${page < 3 ? '' : '<a href="1">1'}
            ${page < 4 ? '' : '</a><span>...</span>'}
            ${page < 2 ? '' : `<a href="${page - 1}">${page - 1}</a>`}
            <a href="${page}" class="current-page">${page}</a>
            ${page > lastPage - 2 ? '' : `<a href="${page + 1}">${page + 1}</a>`}
            ${page > lastPage - 3 ? '' : '<span>...</span>'}
            ${page > lastPage - 1 ? '' : `<a href="${lastPage}">${lastPage}</a>`}
        <a href="${page + 1 < lastPage ? page + 1 : lastPage}">следующаяя</a>
      `;

    pagination.addEventListener('click', (event) => {
      const target = event.target;
      if (!target.matches('a')) {
        return;
      }
      let state = {
        page: location.href.match(/comments|posts|photos|todos/gm)[0],
        pageNumber: +target.getAttribute('href'),
      };
      history.pushState(state, '', `?/page-${state.pageNumber}`);
      update(state.pageNumber);
      event.preventDefault();
    })

    return pagination;
  }
}
