import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { Languages } from 'src/constants/common';
import detector from 'i18next-browser-languagedetector';
import TRANSLATION_RU from './translation/translation_RU.json';
import TRANSLATION_EN from './translation/translation_EN.json';

i18n
  .use(detector)
  .use(initReactI18next)
  .init({
    fallbackLng: Languages.en,
    returnEmptyString: false,
    debug: false,
    detection: {
      order: ['localStorage'],
      caches: ['localStorage'],
    },
    interpolation: {
      escapeValue: false,
    },
    resources: {
      en: {
        translation: TRANSLATION_EN,
      },
      ru: {
        translation: TRANSLATION_RU,
      },
    },
  });

export { i18n };
