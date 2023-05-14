import { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { burgerMenuStore } from 'src/store/burgerMenuStore';
import BurgerButton from '../UI/BurgerButton';
import MenuContent from '../MenuContent';

const Header = observer(() => {
  const [isSticky, setIsSticky] = useState(false);

  const { isOpenBurgerMenu } = burgerMenuStore;

  const handleScroll = () => {
    if (window.scrollY > 1) {
      setIsSticky(true);
    } else {
      setIsSticky(false);
    }
  };

  const handleClickBurgerMenu = () => {
    burgerMenuStore.toggleIsOpenBurgerMenu();
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`flex px-6 w-full justify-between top-0 z-30 transition-all duration-300 ${
        isSticky ? 'sticky py-3 bg-white' : 'py-7'
      } ${isSticky && !isOpenBurgerMenu && 'shadow-xl'} max-md:justify-end`}
    >
      <MenuContent type="header" />
      <BurgerButton isOpen={isOpenBurgerMenu} onClick={handleClickBurgerMenu} />
    </header>
  );
});

export default Header;
