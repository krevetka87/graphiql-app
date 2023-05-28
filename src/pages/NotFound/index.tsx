import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import notFoundImage from '../../assets/404.png';

const NotFound = () => {
  const { t } = useTranslation();

  return (
    <main className="flex-auto w-full">
      <div className="relative w-full h-full flex items-center justify-center">
        <img
          className="w-full h-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 object-cover lg:object-contain"
          src={notFoundImage}
          alt="404 Not Found"
        />
        <div className="absolute top-0 left-0 flex flex-col items-center justify-center w-full h-full">
          <div className="sm:py-8 sm:px-16 text-center bg-white opacity-80 border-8 border-gray-200 rounded-xl py-4 px-8">
            <h2 className="sm:text-9xl font-bold mb-4 tracking-widest text-7xl">404</h2>

            <p className="text-3xl mb-4 max-sm:text-xl">{t('notFound.message')}</p>
            <p>
              <Link to="/" className="text-blue-500 hover:text-blue-700 sm:text-2xl text-lg">
                {t('notFound.link')}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default NotFound;
