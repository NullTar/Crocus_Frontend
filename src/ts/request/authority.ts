import {Operation, R, UserLoginFormData, UserRegisterFormData, Verification} from "@@/ts/model.ts";
import {post, RequestOptions} from "@@/ts/server.ts";
import {parseJwt} from "@@/function/jwt.ts";
import {getToken} from "@@/function/localStorage.ts";
import {navigateToErrorPage} from "@@/layout/system/Error.tsx";
import {checkLanguage} from "@@/function/response.ts";
import {Authority_Api, SPRING} from "@@/ts/api.ts";



// 重新发送验证码 邮箱
export async function retryCode(key: string): Promise<R<null>> {
    const options = {
        port: SPRING,
        endpoint: Authority_Api.retryCode,
        params: {
            key: key
        }
    }
    return await post(options)
}


// 验证注册的验证码
export async function verifyRegisterCode(code: string, data: UserRegisterFormData): Promise<R<null>> {
    const requestData: Verification = {
        password: undefined,
        code: code,
        operation: data.operation,
        key: data.email,
    };
    const options = {
        port: SPRING,
        endpoint: Authority_Api.verifyCode,
        data: requestData
    }
    return await post(options)
}

// 验证登录的验证码
export async function verifyLoginCode(code: string, data: UserLoginFormData): Promise<R<string>> {
    const requestData: Verification = {
        password: data.password,
        code: code,
        operation: data.operation,
        key: data.account || data.email,
    }
    const options = {
        port: SPRING,
        endpoint: Authority_Api.verifyCode,
        data: requestData
    }
    return await post(options)
}

export async function unBindAuth(data: Verification): Promise<R<string>> {
    const token = getToken()
    const condition = checkLanguage()
    if (token == undefined) {
        navigateToErrorPage("400", condition ? "没有登录" : "No Token")
        throw Error("No Token")
    }
    const options: RequestOptions<object> = {
        port: SPRING,
        endpoint: Authority_Api.unbindAuth,
        data: data,
        token: token
    };
    return await post(options)
}

export async function checkOrBindAuth(api: string, password?: string): Promise<R<string>> {
    const token = getToken()
    const condition = checkLanguage()
    if (token == undefined) {
        navigateToErrorPage("400", condition ? "没有登录" : "No Token")
        throw Error("No Token")
    }
    let params: Record<string, string> | undefined
    if (password) params = {password: password}
    const options: RequestOptions<object> = {
        port: SPRING,
        endpoint: api,
        params: params,
        token: token
    };
    return await post(options)
}

// 验证 auth code
export async function verifyAuthCode(token: string, code: string, password: string): Promise<R<null>> {
    const requestData: Verification = {
        key: parseJwt(token).payload.data.uuid,
        operation: Operation.BindAuth,
        code: code,
        password: password
    };
    const options: RequestOptions<Verification> = {
        port: SPRING,
        endpoint: Authority_Api.verifyCode,
        data: requestData,
        token: token
    }
    return await post(options);
}
