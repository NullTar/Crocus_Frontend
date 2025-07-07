import {ArticleData, R} from "@@/ts/model.ts";
import {get} from "@@/ts/server.ts";
import {Common_Api, COMMON_PORT} from "@@/ts/api.ts";

export async function getRecommendArticles(id?: number | undefined): Promise<R<Array<ArticleData>>> {
    const option = {
        port: COMMON_PORT,
        endpoint: Common_Api.getArticleRecommend,
        params: id ? {id: id} : undefined,
    }
    return await get(option)
}

export async function toListArticle(now?: number, size?: number): Promise<R<Array<ArticleData>>> {
    const option = {
        port: COMMON_PORT,
        endpoint: Common_Api.getListArticle,
        params: {
            now: now || 1,
            size: size || 10
        }
    }
    return await get(option)
}


