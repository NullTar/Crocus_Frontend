export const loadingKey = 'loading'

export const languageKey = 'language'

export const loginKey = "login"

export const registerFormKey = "registerFormData"

export const loginFormKey = "loginFormData"

export const tokenKey = "token"

export const bindAuthKey = "bindAuth"

export const authUrlKey = "authUrl"

export const articleKey = "articleNow"

export const articleFileNameKey = "articleFileName"

export const articleTitleKey = "articleTitle"

export const articleDataKey = "articleData"
export const questionDataKey = "questionData"
export const bookDataKey = "bookData"

export const bookRecommendKey = "bookRecommend"
export const articleRecommendKey = "articleRecommend"
export const questionRecommendKey = "questionRecommend"
export const storyIndexKey = "storyIndex"

export const keywordKey = "keyword"
export const searchDataKey = "searchData"

export const localStorageBatchSave = (data: Map<string, string>) => {
    data.forEach((value, key) => {
        localStorage.setItem(key, value);
    });
};

export const localStorageBatchRemove = (keys: Set<string>) => {
    keys.forEach((key) => {
        localStorage.removeItem(key);
    });
};

export const getToken = (): string | null => {
    return localStorage.getItem(tokenKey)
}

export const saveToken = (value: string) => {
    localStorage.setItem(tokenKey, value)
}

export const checkToken = (): boolean => {
    const item = localStorage.getItem(tokenKey);
    return item != undefined && item.length > 0;
}