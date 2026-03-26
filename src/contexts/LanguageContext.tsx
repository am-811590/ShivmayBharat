import { createContext, useContext, useState, ReactNode } from "react";

type Lang = "en" | "hi";

interface LanguageContextType {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (en: string, hi: string) => string;
}

const LanguageContext = createContext<LanguageContextType>({
  lang: "en",
  setLang: () => {},
  t: (en) => en,
});

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLang] = useState<Lang>("en");
  const t = (en: string, hi: string) => (lang === "hi" ? hi : en);
  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
