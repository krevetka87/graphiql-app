import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuthState } from 'react-firebase-hooks/auth';
import { observer } from 'mobx-react-lite';
import { RoutePath } from 'src/constants/common';
import { auth } from 'src/firebase';
import { formsStore } from 'src/store/formsStore';

const Welcome = observer(() => {
  const { t } = useTranslation();

  const [user, loading] = useAuthState(auth);
  const navigation = useNavigate();

  const handleClickLogin = () => {
    formsStore.setIsSignUp(false);
    navigation(RoutePath.login);
  };

  const handleClickRegister = () => {
    formsStore.setIsSignUp(true);
    navigation(RoutePath.login);
  };

  const handleClickMain = () => navigation(RoutePath.main);

  return (
    <>
      <h2>{t('welcome.title')}</h2>
      {loading && <h3>Loading...</h3>}
      {!loading && !user && (
        <div>
          <button type="button" onClick={handleClickLogin}>
            {t('welcome.buttons.login')}
          </button>
          <button type="button" onClick={handleClickRegister}>
            {t('welcome.buttons.register')}
          </button>
        </div>
      )}
      {!loading && user && (
        <button type="button" onClick={handleClickMain}>
          {t('welcome.buttons.main')}
        </button>
      )}
    </>
  );
});

export default Welcome;
