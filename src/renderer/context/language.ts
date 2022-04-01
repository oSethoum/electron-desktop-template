import React from "react";
export type LanguageProps = "ar" | "fr" | "en";
export type LanguageContextProps = {
  language: LanguageProps;
  setLanguage: (language: LanguageProps) => void;
};
export const LanguageContext = React.createContext<LanguageContextProps>({
  language: "en",
  setLanguage: () => {},
} as LanguageContextProps);
