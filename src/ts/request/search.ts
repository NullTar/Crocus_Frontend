import {R, SearchContent, SearchList, SearchType} from "@@/ts/model.ts";
import {Common_Api, SPRING} from "@@/ts/api.ts";
import {get} from "@@/ts/server.ts";

export async function searchLike(value: string): Promise<SearchList> {
    const types = Object.values(SearchType);
    const results: SearchList = {
        Announcement: [],
        Book: [],
        Article: [],
        Question: [],
    };

    for (const type of types) {
        const option = {
            port: SPRING,
            endpoint: Common_Api.getSearchContent,
            params: {
                keyword: value,
                type,
            }
        };
        const result = await get<R<Array<SearchContent>>, typeof option>(option);
        if (result.data) {
            results[type] = result.data;
        }
    }

    return results;
}
