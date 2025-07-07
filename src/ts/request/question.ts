import { QuestionData, R} from "@@/ts/model.ts";
import { get} from "@@/ts/server.ts";
import {Common_Api, COMMON_PORT} from "@@/ts/api.ts";


export async function getRecommendQuestions(): Promise<R<Array<QuestionData>>> {
    const option = {
        port: COMMON_PORT,
        endpoint: Common_Api.getQuestionRecommend,
    }
    return await get(option)
}


export async function toListQuestion(now?: number, size?: number): Promise<R<Array<QuestionData>>> {
    const option = {
        port: COMMON_PORT,
        endpoint: Common_Api.getListQuestion,
        params: {
            now: now || 1,
            size: size || 10
        }
    }
    return await get(option)
}

