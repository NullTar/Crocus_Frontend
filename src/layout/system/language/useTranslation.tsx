// 自定义Hook来获取翻译
import {LanguageContext} from "@@/layout/system/language/LanguageContext.tsx";
import {useContext} from "react";
import {navigateToErrorPage} from "@@/layout/system/Error.tsx";
import {checkLanguage} from "@@/function/response.ts";

export const useTranslation = () => {
    const context = useContext(LanguageContext);
    const enMessage = 'useTranslation must be used within a LanguageProvider'
    const cnMessage = "useTranslation 必须在 LanguageProvider 中使用"
    const condition = checkLanguage()
    if (!context) {
        navigateToErrorPage('404', condition ? cnMessage : enMessage)
        throw Error(enMessage)
    }
    return context.translations;
};

/**
 * 模板必须用 {}
 * 支持单个变量和多个变量（顺序匹配）
 * @param template 字符串
 * @param variables 匹配值
 */
export function translations(template: string, variables: string | string[] | Record<string, string | number>): string {
    const matches = [...template.matchAll(/\{\s*(\w+)\s*}/g)].map(m => m[1]);
    if (matches.length === 0) throw new Error("No placeholders found in the template.");
    if (typeof variables === 'string') {
        if (matches.length !== 1) throw new Error(`Expected one placeholder, but found ${matches.length}`);
        return template.replace(/\{\s*\w+\s*}/, variables);
    }

    if (Array.isArray(variables)) {
        if (matches.length !== variables.length) throw new Error(`Placeholder count (${matches.length}) does not match variable count (${variables.length})`);
        let result = template;
        matches.forEach((key, index) => {
            result = result.replace(new RegExp(`\\{\\s*${key}\\s*}`, 'g'), String(variables[index]));
        });
        return result;
    }

    // object
    return template.replace(/\{\s*(\w+)\s*}/g, (_, key) => {
        if (!(key in variables)) throw new Error(`Missing variable: ${key}`);
        return String(variables[key]);
    });
}