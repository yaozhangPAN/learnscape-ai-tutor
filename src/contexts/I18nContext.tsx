
import React, { createContext, useContext, useState, ReactNode } from "react";
import { en } from "@/i18n/en";
import { zh } from "@/i18n/zh";

type Lang = "en" | "zh";
type I18nStrings = typeof en;

interface I18nContextValue {
  lang: Lang;
  setLang: (lang: Lang) => void;
  toggleLang: () => void;
  t: I18nStrings;
}

const I18nContext = createContext<I18nContextValue>({
  lang: "en",
  setLang: () => {},
  toggleLang: () => {},
  t: en,
});

export const I18nProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLang] = useState<Lang>("en");

  const toggleLang = () => {
    setLang(prevLang => prevLang === "en" ? "zh" : "en");
  };

  const t = lang === "en" ? en : zh as unknown as typeof en;

  return (
    <I18nContext.Provider value={{ lang, setLang, toggleLang, t }}>
      {children}
    </I18nContext.Provider>
  );
};

export const useI18n = () => useContext(I18nContext);
