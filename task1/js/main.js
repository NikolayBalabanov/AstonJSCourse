import Header from './components/header.js';
import createMainContainer from './components/mainContainer.js';
import Garage from './components/garage/garage.js';

const header = new Header();
const main = createMainContainer();
const garage = new Garage();
document.body.append(header.render(), main.main);
garage.render(main.mainContainer);
