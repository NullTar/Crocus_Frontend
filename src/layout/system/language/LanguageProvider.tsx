import React, { useEffect, useState} from "react";
import enTranslations from "@@/assets/json/u_en.json";
import zhTranslations from "@@/assets/json/u_cn.json";
import { LanguageContext } from "@@/layout/system/language/LanguageContext.tsx";
import {languageKey} from "@@/function/localStorage.ts";

export const LanguageProvider = ({children}: { children: React.ReactNode }) => {
    const [language, setLanguage] = useState<string>('en');
    const translations = language === 'en' ? enTranslations : zhTranslations;

    // 读取localStorage中的语言设置
    useEffect(() => {
        const savedLanguage = localStorage.getItem(languageKey);
        if (savedLanguage) {
            setLanguage(savedLanguage);
        } else {
            // 如果没有保存的语言设置，则检测系统语言
            const systemLanguage = navigator.language;
            const detectedLanguage = systemLanguage.startsWith('zh') ? 'zh' : 'en';
            setLanguage(detectedLanguage);
            // 同时保存到localStorage
            localStorage.setItem(languageKey, detectedLanguage);
        }
    }, []);

    // 设置语言的函数，同时更新localStorage
    const setLanguageHandler = (newLanguage: string) => {
        localStorage.setItem(languageKey, newLanguage);
        setLanguage(newLanguage);
    };

    return (
        <LanguageContext.Provider value={{translations, setLanguage: setLanguageHandler}}>
            {children}
        </LanguageContext.Provider>
    );
};