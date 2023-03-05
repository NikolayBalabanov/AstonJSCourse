export default function createMainContainer() {
  const main = document.createElement('main')
  const mainContainer = document.createElement('div')
  main.classList.add('main')
  mainContainer.classList.add('main__container', 'container')
  main.append(mainContainer)
  return {
    main,
    mainContainer,
  }
}
