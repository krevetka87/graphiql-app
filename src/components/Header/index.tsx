import { useTranslation } from 'react-i18next';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, logout } from '../../firebase';

export default function Header() {
  const { t } = useTranslation();

  const [user] = useAuthState(auth);

  const handleLogoutClick = async () => {
    await logout();
  };

  return (
    <header className="flex">
      {user && (
        <button type="button" onClick={handleLogoutClick}>
          {t('header.buttons.logout')}
        </button>
      )}
    </header>
  );
}
