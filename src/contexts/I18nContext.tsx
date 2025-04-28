
import React, { createContext, useContext, useState, ReactNode } from "react";
import { en } from "@/i18n/en";
import { zh } from "@/i18n/zh";

type Lang = "en" | "zh";
type I18nStrings = typeof en;

interface I18nContextValue {
  lang: Lang;
  language: Lang; // Add language as an alias for lang
  setLang: (lang: Lang) => void;
  toggleLang: () => void;
  t: I18nStrings;
}

const I18nContext = createContext<I18nContextValue>({
  lang: "en",
  language: "en", // Add language as an alias for lang
  setLang: () => {},
  toggleLang: () => {},
  t: en,
});

export const I18nProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLang] = useState<Lang>("en");

  const toggleLang = () => {
    setLang(prevLang => prevLang === "en" ? "zh" : "en");
  };

  // Create a proxied version of the translations to handle missing keys gracefully
  const createTranslationProxy = (translations: any): I18nStrings => {
    return new Proxy(translations, {
      get(target, prop, receiver) {
        const value = Reflect.get(target, prop, receiver);
        
        // If the property exists, return it
        if (value !== undefined) return value;
        
        // If the property doesn't exist, return a proxy for nested access
        // that returns the key path as a fallback
        return new Proxy({}, {
          get(_, nestedProp) {
            console.warn(`Translation missing: ${String(prop)}.${String(nestedProp)}`);
            return `[${String(prop)}.${String(nestedProp)}]`;
          }
        });
      }
    });
  };

  const t = createTranslationProxy(lang === "en" ? en : zh);

  return (
    <I18nContext.Provider value={{ 
      lang, 
      language: lang, // Add language as an alias for lang
      setLang, 
      toggleLang, 
      t 
    }}>
      {children}
    </I18nContext.Provider>
  );
};

export const useI18n = () => useContext(I18nContext);
