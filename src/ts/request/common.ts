import {R} from "@@/ts/model.ts";
import {COMMON_PORT} from "@@/ts/api.ts";
import {get} from "@@/ts/server.ts";


export const queryByUUID = async <T>(uuid: string, api: string): Promise<R<T>> => {
    const option = {
        port: COMMON_PORT,
        endpoint: api,
        params: uuid ? {uuid: uuid} : undefined,
    }
    return await get(option)
}