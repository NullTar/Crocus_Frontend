import {getToken, tokenKey} from "@@/function/localStorage.ts";
import {JWT, jwtData, jwtHeader, Member} from "@@/ts/model.ts";
import {navigateToErrorPage} from "@@/layout/system/Error.tsx";
import {checkLanguage} from "@@/function/response.ts";

export const getPayloadData = (): Member | null => {
    const token = getToken()
    if (token == undefined) {
        return null
    }
    return parseJwt(token).payload.data
}

export const parseJwt = (token: string): JWT => {
    const code = "404"
    const condition = checkLanguage()
    const parts = token.split('.');
    if (parts.length !== 3) {
        navigateToErrorPage(code, condition ? "长度错误" : "Length Error")
        throw Error("Length Error")
    }
    let parsedHeader: jwtHeader
    let parsedPayload: jwtData
    try {
        const header = atob(parts[0]);
        parsedHeader = JSON.parse(header);
        const payload = decodeURIComponent(atob(parts[1]).split('').map(c =>
            '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)).join(''));
        parsedPayload = JSON.parse(payload);
    } catch (e: any) {
        navigateToErrorPage(code, condition ? "格式化错误" : "Parse Error")
        throw e
    }
    const jwt = {
        header: parsedHeader,
        payload: parsedPayload,
        signature: parts[2]
    }
    if (checkJwt(jwt)) {
        return jwt
    }
    localStorage.removeItem(token)
    throw Error(condition ? "解析 Token 失败" : "Parse Token Failed")
}


const checkJwt = (jwt: JWT): boolean => {
    const payload = jwt.payload
    const header = jwt.header;
    const code = "404"
    const condition = checkLanguage()

    if (header.alg.toLowerCase() !== 'hs256') {
        navigateToErrorPage(code, condition ? "加密方法不正确" : "The encryption method is incorrect.", "/login")
        return false
    }

    // 检查 payload 部分
    if (payload.iss !== 'Crocus') {
        navigateToErrorPage(code, condition ? "发行商不正确" : "The Publisher is incorrect.", "/login")
        return false
    }

    const currentTime = Math.floor(Date.now() / 1000); // 当前时间（秒）
    const validTime = payload.iat + 60 * 60;

    if (currentTime >= validTime) {
        localStorage.removeItem(tokenKey)
        navigateToErrorPage(code, condition ? "发放时间超过 1 小时  请重新登录" : "The issuance time exceeded 1 hour. Please login again", "/login");
        return false;
    }

    // 检查 data 中是否包含 uuid
    return !(payload.data == undefined || payload.data.uuid.length <= 0);
}


