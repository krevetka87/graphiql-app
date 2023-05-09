import { observer } from 'mobx-react-lite';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useTranslation } from 'react-i18next';
import { Languages, RoutePath } from 'src/constants/common';
import { auth, logout } from 'src/firebase';
import { formsStore } from 'src/store/formsStore';
import ButtonWithBorder from 'src/components/UI/ButtonWithBorder';
import LinkWithBorder from 'src/components/UI/LinkWithBorder';
import { burgerMenuStore } from 'src/store/burgerMenuStore';

interface MenuContentProps {
  type: 'header' | 'burger';
}

const MenuContent = observer(({ type }: MenuContentProps) => {
  const { t, i18n } = useTranslation();

  const [user, loading] = useAuthState(auth);

  const burgerTrigger = () => {
    if (type === 'burger') {
      burgerMenuStore.toggleIsOpenBurgerMenu();
    }
  };

  const handleClickWelcome = () => {
    burgerTrigger();
  };

  const handleClickLogin = () => {
    formsStore.setIsSignUp(false);
    burgerTrigger();
  };

  const handleClickRegister = () => {
    formsStore.setIsSignUp(true);
    burgerTrigger();
  };

  const handleToggleLanguage = () => {
    i18n.changeLanguage(i18n.language === Languages.ru ? Languages.en : Languages.ru);
    burgerTrigger();
  };

  const handleLogoutClick = async () => {
    await logout();
    burgerTrigger();
  };

  return (
    <>
      <ul
        className={`flex gap-6 ${type === 'header' && 'max-md:hidden'} ${
          type === 'burger' && 'flex-col'
        }`}
      >
        <LinkWithBorder to={RoutePath.welcome} onClick={handleClickWelcome}>
          {t('header.buttons.welcome')}
        </LinkWithBorder>
        {!loading && !user && (
          <>
            <LinkWithBorder to={RoutePath.login} onClick={handleClickLogin}>
              {t('header.buttons.login')}
            </LinkWithBorder>
            <LinkWithBorder to={RoutePath.login} onClick={handleClickRegister}>
              {t('header.buttons.register')}
            </LinkWithBorder>
          </>
        )}
      </ul>

      <ul
        className={`flex gap-6 ${type === 'header' && 'max-md:hidden'} ${
          type === 'burger' && 'flex-col'
        }`}
      >
        <ButtonWithBorder onClick={handleToggleLanguage}>
          {t('header.buttons.language')}
        </ButtonWithBorder>
        {user && (
          <ButtonWithBorder onClick={handleLogoutClick}>
            {t('header.buttons.logout')}
          </ButtonWithBorder>
        )}
      </ul>
    </>
  );
});

export default MenuContent;
