import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpApi from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(HttpApi)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    supportedLngs: ['bn', 'en'], // List of supported languages
    fallbackLng: 'bn', // Set Bangla as the fallback language
    lng: localStorage.getItem('i18nextLng') || 'bn', // Set Bangla as the default language if no language is saved in localStorage
    detection: {
      order: ['localStorage', 'cookie', 'path', 'subdomain', 'navigator', 'htmlTag'],
      caches: ['localStorage']
    },
    backend: {
      // loadPath: '/locales/{{lng}}/translation.json'
      loadPath: '/src/assets/locales/{{lng}}/translation.json'
    },
    react: {
      useSuspense: false
    }
  });

export default i18n;
