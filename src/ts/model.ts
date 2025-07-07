// 组件数据
// md
export const theme = ['default', 'github', 'vuepress', 'smart-blue', 'cyanosis']

export const Gender = {
    Male: {label: "男(生理)", value: "Male"},
    Female: {label: "女(生理)", value: "Female"},
    Guarded: {label: "其他", value: "Guarded"},
}

export const Age = {
    Under: {label: "18-", value: "Under"},
    Over: {label: "18+", value: "Over"},
}

export const LanguageList = {
    Chinese_Simplified: {label: "简体中文", code: "zh_CN"},
    Chinese_Traditional: {label: "繁體中文", code: "zh_TW"},
    English_USA: {label: "英语 (美国)", code: "en_US"},
    English_UK: {label: "英语 (英国)", code: "en_GB"},
}


// 请求配置
export enum Operation {
    Register = "Register",
    Login = "Login",
    BindAuth = "BindAuth",
    ModifyEmail = "ModifyEmail",
    Delete = "Delete"
}


// 请求结构
export interface Verification {
    // 验证码表单
    password?: string;
    code: string;
    key?: string;
    operation?: Operation;
}

export type UserRegisterFormData = {
    // 注册表单
    account: string;
    email: string;
    password: string;
    createPassword: string;
    operation: Operation;
    [key: string]: string | Operation;
};

export type UserLoginFormData = {
    // 登陆表单
    account: string;
    email: string;
    password: string;
    operation: Operation.Login;
    [key: string]: string | Operation;
};

// 角色结构
export interface Member {
    uuid: string;
    role: string;
    account: string;
    age: string;
    gender: string;
    email: string;
    createTime: string;
    modifyTime: string;
    lastLoginTime: string;
}


// jwt 结构
export interface jwtData {
    iss: string;
    sub: string;
    iat: number;
    exp: number;
    data: Member;
    issuedDay: string;
}

export interface jwtHeader {
    "typ": string,
    "alg": string
}

export interface JWT {
    header: jwtHeader,
    payload: jwtData,
    signature: string,
}

// 服务器回复
export interface R<T> {
    state: number
    info?: ResponseInfo
    data?: T
}

export interface ResponseInfo {
    code: number
    message: string
    tip: string
}

interface Universal {
    id: number
    uuid: string
}

interface Target {
    targetAge: string
    targetGender: string
}

interface TimeUniversal {
    createTime: string
    modifyTime: string
    time: number
}

export interface ArticleData extends Universal, Target, TimeUniversal {
    title: string
    languageCode: string
    miniIOid: number
    url: string
    text: string
}

export interface BookData extends Universal, Target, TimeUniversal {
    name: string
    author: string
    cover: File
    description: string
    isbn: string
    url: string
}

export interface QuestionData extends Universal, Target, TimeUniversal {
    title: string
    answer: string
    languageCode: string
    hit: number
}

export interface StoryData extends Universal, TimeUniversal {
    title: string
    content: string
}


export type ArticleFormData = {
    // 提交文章的表单
    title: string
    file: File
    languageCode: string
    targetAge: string
    targetGender: string
    [key: string]: string | File;
};

export type BookFormData = {
    name: string
    author: string
    isbn: string
    targetAge: string
    targetGender: string
    description: string
    cover: File
    [key: string]: string | File;
};


export type QuestionFormData = {
    title: string
    answer: string
    targetAge: string
    targetGender: string
    languageCode: string
    [key: string]: string;
};

export const SearchType = {
    Announcement: "Announcement",
    Book: "Book",
    Article: "Article",
    Question: "Question",
} as const;

export type SearchTypeKey = keyof typeof SearchType;

export type SearchList = {
    [key in SearchTypeKey]: Array<SearchContent>;
}

export type SearchContent = {
    key: string
    link: string
    type: string
    uuid: string
    [key: string]: string
}
