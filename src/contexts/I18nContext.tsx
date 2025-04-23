
import React, { createContext, useContext, useState, ReactNode } from "react";
import en from "@/i18n/en";
import zh from "@/i18n/zh";

type Lang = "en" | "zh";
type I18nStrings = typeof en;

interface I18nContextValue {
  lang: Lang;
  setLang: (lang: Lang) => void;
  toggleLang: () => void;
  t: I18nStrings;
}

const I18nContext = createContext<I18nContextValue>({
  lang: "zh",
  setLang: () => {},
  toggleLang: () => {},
  t: zh,
});

export const I18nProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLang] = useState<Lang>("zh");

  const toggleLang = () => {
    setLang(prevLang => prevLang === "zh" ? "en" : "zh");
  };

  const t = lang === "zh" ? zh : en;

  return (
    <I18nContext.Provider value={{ lang, setLang, toggleLang, t }}>
      {children}
    </I18nContext.Provider>
  );
};

export const useI18n = () => useContext(I18nContext);
