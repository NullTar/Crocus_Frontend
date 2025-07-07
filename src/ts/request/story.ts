import { R, StoryData} from "@@/ts/model.ts";
import {get} from "@@/ts/server.ts";
import {Common_Api, COMMON_PORT} from "@@/ts/api.ts";


export async function getRecommendStories(id?: number | undefined): Promise<R<Array<StoryData>>> {
    const option = {
        port: COMMON_PORT,
        endpoint: Common_Api.getStoryRecommend,
        params: id ? {id: id} : undefined,
    }
    return await get(option)
}
