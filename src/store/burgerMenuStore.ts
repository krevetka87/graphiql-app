import { makeAutoObservable } from 'mobx';

class BurgerMenu {
  isOpenBurgerMenu = false;

  constructor() {
    makeAutoObservable(this);
  }

  toggleIsOpenBurgerMenu() {
    this.isOpenBurgerMenu = !this.isOpenBurgerMenu;
  }
}

const burgerMenuStore = new BurgerMenu();

export { burgerMenuStore };
