import axios, {AxiosRequestConfig} from 'axios';
import {SERVER_URL} from "@@/ts/api.ts";

export interface RequestOptions<T> extends AxiosRequestConfig {
    port: string;
    endpoint: string;
    data?: T;
    token?: string;
    params?: Record<string, string | number>;
}


// 封装 GET 请求
export const get = async <T, K>(options: RequestOptions<K>): Promise<T> => {
    return makeRequest('GET', options);
};

// 封装 POST 请求
export const post = async <T, K>(options: RequestOptions<K>): Promise<T> => {
    return makeRequest('POST', options);
};

const makeRequest = async <T, K>(method: string, options: RequestOptions<T>): Promise<K> => {
    const {port, endpoint, data, token, params} = options;
    let url = `${SERVER_URL}:${port}/${endpoint}`;

    const headers: Record<string, string> = {
        // 可以在这里添加请求头
        // 'crocus': endpoint,
        ...(token && {'Authorization': `Bearer ${token}`}),
    };

    let response;
    if (method === 'GET') {
        response = await axios.get(url, {headers, params, validateStatus: () => true});
    } else {
        response = await axios.request({
            url: url,
            method: method,
            headers: headers,
            params: params,
            data: data,
            validateStatus: () => true
        })
    }
    return response.data;
};
