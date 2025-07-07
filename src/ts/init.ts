import {
    articleDataKey,
    articleFileNameKey,
    articleKey,
    articleRecommendKey, articleTitleKey, authUrlKey, bookRecommendKey,
    loadingKey, loginFormKey, registerFormKey,
    storyIndexKey
} from "@@/function/localStorage.ts";
import {getRecommendArticles} from "@@/ts/request/article.ts";


export const initApplication = async () => {
    removeKey()
    await requestData()
}

const removeKey = () => {
    localStorage.removeItem(loadingKey)
    localStorage.removeItem(registerFormKey)
    localStorage.removeItem(loginFormKey)
    localStorage.removeItem(articleKey)
    localStorage.removeItem(articleFileNameKey)
    localStorage.removeItem(articleTitleKey)
    localStorage.removeItem(articleDataKey)


    localStorage.removeItem(bookRecommendKey)
    localStorage.removeItem(authUrlKey)
    localStorage.removeItem(storyIndexKey)
}

const requestData = async () => {
    const data = localStorage.getItem(articleRecommendKey)
    if (!data) {
        const recommendArticles = await getRecommendArticles()
        if (recommendArticles.data) {
            const now = Date.now()
            const articlesWithTime = recommendArticles.data.map(article => ({
                ...article,
                time: now
            }));
            localStorage.setItem(articleRecommendKey, JSON.stringify(articlesWithTime));
        }
    }
}

