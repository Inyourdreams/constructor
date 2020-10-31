import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import ruTranslation from '@localization/ru.json';

const resources = {
  ru: ruTranslation,
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'ru',
    interpolation: {
      escapeValue: false,
    },
    react: {
      wait: true,
      transSupportBasicHtmlNodes: true,
      useSuspense: true,
    },
    keySeparator: false,
    ns: ['translation'],
    defaultNS: 'translation',
    resources,
  });

export default i18n;
