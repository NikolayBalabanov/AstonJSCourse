import { Api } from "./js/Api.js";
import { Header } from "./js/header.js";
import { Main } from "./js/main.js";
import { Page } from "./js/page.js";



const header = new Header();
export const main = new Main();
const pageConstructor = new Page;
document.body.append(header.render());
document.body.append(main.render());
header.setHendlers();

export async function update(pageNumber = 1) {
  const page = location.href.match(/comments|posts|photos|todos/gm);
  if (!page) return;
  main.clear();
  main.addLoader();
  const response = await Api.getResourcesWithLimit(page[0], pageNumber);
  main.clear();
  if (response) {
    const props = {
      title: page[0],
      data: response.data,
      pageNumber: pageNumber,
      lastPage: response.total,
    }
    const content = pageConstructor.render(props);
    main.mainContainer.append(content);
  } else {
    main.defaultContet();
  }
}

update();

window.addEventListener('popstate', (event) => {
  update(event.state);
})
