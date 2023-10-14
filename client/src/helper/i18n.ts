import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import ger from '../assets/locales/ger/translation.json';
import en from '../assets/locales/en/translation.json';

i18n 
 // .use(LanguageDetector) 
  .use(initReactI18next)
  .init({
    resources:{
        en: {
            translation: en
          },
         ger:{
            translation: ger
         } 
    },
    fallbackLng: "ger",
    interpolation: {
      escapeValue: false
    },
    react: {
      useSuspense: false,
    },
  });

const initLanguage = (i18n: any) =>{
    const language = localStorage.getItem("language") || "ger"
    console.log("language from init" + language)
    i18n.changeLanguage(language);
}
export {
    initLanguage
}
export default i18n;
