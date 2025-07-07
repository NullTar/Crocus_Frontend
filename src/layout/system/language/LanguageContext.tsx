import enTranslations from "@@/assets/json/u_en.json";
import {createContext} from "react";

// 定义Translations类型
type Translations = typeof enTranslations;

// 创建LanguageContext
export const LanguageContext = createContext<{
    translations: Translations;
    setLanguage: (language: string) => void
} | null>(null);
