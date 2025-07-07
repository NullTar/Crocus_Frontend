import {BookData, R} from "@@/ts/model.ts";
import {get} from "@@/ts/server.ts";
import {Common_Api, COMMON_PORT} from "@@/ts/api.ts";

export async function getRecommendBooks(id?: number | undefined): Promise<R<Array<BookData>>> {
    const option = {
        port: COMMON_PORT,
        endpoint: Common_Api.getBookRecommend,
        params: id ? {id: id} : undefined,
    }
    return await get(option)
}

export async function toListBook(now?: number, size?: number): Promise<R<Array<BookData>>> {
    const option = {
        port: COMMON_PORT,
        endpoint: Common_Api.getListBook,
        params: {
            now: now || 1,
            size: size || 10
        }
    }
    return await get(option)
}

