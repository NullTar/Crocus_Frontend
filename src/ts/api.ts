export const SERVER_URL = 'http://localhost';
export const SPRING = "8088"
export const USER_PORT = "8848"
export const COMMON_PORT = "9099"

export const Authority_Api = {
    // Authority
    verifyCode: 'authority/verifyCode',
    retryCode: 'authority/resend',
    checkAuth: 'authority/check',
    bindAuth: "authority/bind",
    unbindAuth: "authority/unbind",
}

export const Account_Api = {
    // Account
    modifyProfile: 'account/modify',
    changePassword: 'account/change',
}


export const Common_Api = {

    // Article
    getListArticle: "article/queryList",
    getArticleRecommend: "article/recommend",
    queryArticle: "article/query",

    // Book
    getListBook: "book/queryList",
    getBookRecommend: "book/recommend",
    queryBook: "book/query",

    // Question
    getListQuestion: "question/queryList",
    getQuestionRecommend: "question/recommend",
    queryQuestion: "question/query",

    // Story
    getStoryRecommend: "story/recommend",

    // Search
    getSearchContent: "search/like",
}

export const Admin_Api = {
    // Admin


    // Article
    newArticle: "crocus/manager/article/upload",
    newBook: "crocus/manager/book/upload",
    newQuestion: "crocus/manager/question/upload"
}

export const Member_Api = {
    // User
    validAccount: 'account/validAccount',
    userRegister: 'account/register',
    userLogin: 'account/login',
    userDelete: 'account/delete',
}