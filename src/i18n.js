import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)
const resources = {
  'en': {
    translation: {
      "signup": "Sign Up",
      "email": "e-mail address",
      "password": "password",
      "referral_code": "referral code (optional)",
      "continue": "Continue",
      "email verification": "Email Verification",
      "sign in": "Sign In",
      "email format": "email format",
      "at least one lowercase letter": "at least one lowercase letter",
      "at least one uppercase letter": "at least one uppercase letter",
      "at least 8 characters long": "at least 8 characters long"
    }
  },
  'tw': {
    translation: {
      "signup": "註冊",
      "email": "電子郵件",
      "password": "密碼",
      "referral_code": "推薦碼 (可選)",
      "continue": "繼續",
      "email verification": "信箱驗證",
      "sign in": "登入",
      "email format": "信箱格式",
      "at least one lowercase letter": "至少一個小寫字母",
      "at least one uppercase letter": "至少一個大寫字母",
      "at least 8 characters long": "密碼長度大於8"
    }
  }
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: "en", // language to use, more information here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
    // you can use the i18n.changeLanguage function to change the language manually: https://www.i18next.com/overview/api#changelanguage
    // if you're using a language detector, do not define the lng option

    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

  export default i18n;