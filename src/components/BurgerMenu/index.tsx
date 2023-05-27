import { observer } from 'mobx-react-lite';
import { burgerMenuStore } from 'src/store/burgerMenuStore';
import MenuContent from '../MenuContent';

const BurgerMenu = observer(() => {
  const { isOpenBurgerMenu } = burgerMenuStore;

  return (
    <nav
      className={`w-full fixed top-0 left-0 bg-white h-full transition-all duration-300 z-20 flex flex-col  md:hidden gap-6 justify-center items-start px-6 shadow-lg ${
        !isOpenBurgerMenu ? '-translate-x-full' : 'translate-x-0'
      }`}
    >
      <MenuContent type="burger" />
    </nav>
  );
});

export default BurgerMenu;
