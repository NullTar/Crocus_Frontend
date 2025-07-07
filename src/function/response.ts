import {ResponseInfo} from "@@/ts/model.ts";
import {languageKey} from "@@/function/localStorage.ts";


/**
 * args1 为string时必须要有args2
 * args1 为ResponseInfo时必须不能有args2
 * @param args1
 * @param args2
 */
export function formatR(args1?: string | ResponseInfo, args2?: ResponseInfo): string {
    const message = "代码写错了: 参数不合法 formatR";

    // 如果两个参数都没有，触发错误
    if (!args1 && !args2) return message;

    // args1 为 string 类型，必须有 args2
    if (args1 && typeof args1 == 'string') {
        if (!args2 || !(args2.code || args2.message || args2.tip)) return message;
        const prefix = args2?.code ? `${args2.code}: ` : '';
        const suffix = args2?.tip ? `,${args2.tip}` : '';
        return `${prefix}${args2?.message}${suffix}`;
    }

    // args1 为 ResponseInfo 类型，args2 不能存在
    if (args1 && typeof args1 != 'string') {
        if (args2) return message;
        const prefix = args1.code ? `${args1.code}: ` : '';
        const suffix = args1.tip ? `,${args1.tip}` : '';
        return `${prefix}${args1.message}${suffix}`;
    }
    // 没有满足条件，触发错误
    return message
}


export function checkLanguage(): boolean {
    const language = localStorage.getItem(languageKey)
    return language?.toLowerCase() == "zh"
}