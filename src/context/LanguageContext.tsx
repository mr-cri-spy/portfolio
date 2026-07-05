import React, { createContext, useContext } from "react";

const translations = {
  nav_home: "Home",
  nav_about: "About",
  nav_skills: "Skills",
  nav_projects: "Work",
  nav_experience: "Experience",
  nav_certificates: "Credentials",
  nav_testimonials: "Reviews",
  nav_blog: "Writing",
  nav_contact: "Contact",
} as const;

type TranslationKeys = keyof typeof translations;

interface LanguageContextType {
  t: (key: TranslationKeys) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const t = (key: TranslationKeys): string => translations[key] || "";

  return (
    <LanguageContext.Provider value={{ t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
