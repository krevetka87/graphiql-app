import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuthState } from 'react-firebase-hooks/auth';
import { RoutePath } from 'src/constants/common';
import { auth } from 'src/firebase';
import spinner from 'src/assets/spinner.svg';

export default function Welcome() {
  const { t } = useTranslation();

  const [user, loading] = useAuthState(auth);
  const navigation = useNavigate();

  const handleClickMain = () => navigation(RoutePath.main);

  if (loading) {
    return <img className="m-auto" src={spinner} alt="spinner" />;
  }

  return (
    <div className="px-6">
      <h1>{t('welcome.title')}</h1>
      {!loading && user && (
        <button type="button" onClick={handleClickMain}>
          {t('welcome.buttons.main')}
        </button>
      )}
    </div>
  );
}
