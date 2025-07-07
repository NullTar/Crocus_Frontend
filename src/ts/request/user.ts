import {post} from '../server.ts';
import {R, UserLoginFormData, UserRegisterFormData} from "@@/ts/model.ts";
import {navigateToErrorPage} from "@@/layout/system/Error.tsx";
import {checkLanguage} from "@@/function/response.ts";
import {Member_Api, USER_PORT} from "@@/ts/api.ts";


// 验证账户是否注册
export async function validateAccountOrEmail(name: string, value: string): Promise<R<null>> {
    const condition = checkLanguage()
    if (!value) {
        navigateToErrorPage('404', condition ? "没有值" : "Value is required")
        throw Error("Value is required")
    }
    return await post({
        port: USER_PORT,
        endpoint: Member_Api.validAccount,
        data: {
            account: name === "account" ? value.trim() : undefined,
            email: name === "email" ? value.trim() : undefined,
        }
    });
}

// 用户注册
export async function userRegister(data: UserRegisterFormData): Promise<R<null>> {
    const {createPassword, ...requestData} = data;
    const options = {
        port: USER_PORT,
        endpoint: Member_Api.userRegister,
        data: requestData,
    };
    return await post(options)
}

// 用户登录
export async function userLogin(data: UserLoginFormData): Promise<R<null>> {
    const options = {
        port: USER_PORT,
        endpoint: Member_Api.userLogin,
        data: data,
    }
    return await post(options)
}

// TODO 注销