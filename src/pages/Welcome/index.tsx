import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuthState } from 'react-firebase-hooks/auth';
import { RoutePath } from 'src/constants/common';
import { auth } from 'src/firebase';
import { ReactComponent as SpinnerIcon } from 'src/assets/spinner.svg';
import Accordion from 'src/components/Accordion';
import { useState } from 'react';
import Banner from 'src/components/Banner';
import { TextState } from 'src/types/text.types';

const Welcome = () => {
  const [user, loading] = useAuthState(auth);

  const [activeIndex, setActiveIndex] = useState(-1);
  const navigation = useNavigate();

  const { t } = useTranslation();
  const textAccordions = t('welcome.accordions.text', { returnObjects: true }) as TextState[];
  const textBanners = t('welcome.banners.text', { returnObjects: true }) as TextState[];

  const handleClickMain = () => navigation(RoutePath.main);

  if (loading) {
    return <SpinnerIcon />;
  }

  const handleAccordionClick = (index: number) => {
    setActiveIndex(activeIndex === index ? -1 : index);
  };

  return (
    <div className="flex flex-col items-center px-6">
      <h1 className="text-center mb-2">{t('welcome.title')}</h1>
      <h3 className="text-center mb-8">{t('welcome.description')}</h3>

      {!loading && user && (
        <button
          type="button"
          className="border-4 rounded-md px-4 py-2 transition-all bg-white hover:bg-gray-200 text-xl font-semibold w-min mb-7"
          onClick={handleClickMain}
        >
          {t('welcome.buttons.main')}
        </button>
      )}

      <div className="mb-12 w-full">
        <div className="flex items-center gap-5 text-2xl mb-6">
          <div className="w-full h-1 bg-gray-100" />
          <h5 className="whitespace-nowrap">{t('welcome.accordions.title')}</h5>
          <div className="w-full h-1 bg-gray-100" />
        </div>

        <div className="grid w-full lg:grid-cols-4 gap-x-10 gap-y-4 sm:grid-cols-2 grid-cols-1">
          {textBanners.map((text) => (
            <Banner key={text.id} text={text} />
          ))}
        </div>
      </div>

      <div>
        <div className="flex items-center gap-5 text-2xl mb-6">
          <div className="w-full h-1 bg-gray-100" />
          <h5 className="whitespace-nowrap">{t('welcome.banners.title')}</h5>
          <div className="w-full h-1 bg-gray-100" />
        </div>
        <div className="w-full flex flex-col gap-2">
          {textAccordions.map((text, index) => (
            <Accordion
              key={text.id}
              text={text}
              index={index}
              isOpen={activeIndex === index}
              toggleAccordion={() => handleAccordionClick(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Welcome;
