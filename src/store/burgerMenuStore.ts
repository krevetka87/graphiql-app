import { observable } from 'mobx';

interface BurgerMenuStore {
  isOpenBurgerMenu: boolean;
  toggleIsOpenBurgerMenu: () => void;
}

const burgerMenu: BurgerMenuStore = {
  isOpenBurgerMenu: false,

  toggleIsOpenBurgerMenu() {
    this.isOpenBurgerMenu = !this.isOpenBurgerMenu;
  },
};

const burgerMenuStore = observable(burgerMenu);

export { burgerMenuStore };
