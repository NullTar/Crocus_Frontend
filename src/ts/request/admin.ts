import {ArticleFormData, BookFormData, QuestionFormData, R} from "@@/ts/model.ts";
import {post} from "@@/ts/server.ts";
import {Admin_Api, SPRING} from "@@/ts/api.ts";


export async function newQuestion(token: string, data: QuestionFormData): Promise<R<string>> {
    const options = {
        port: SPRING,
        endpoint: Admin_Api.newQuestion,
        token: token,
        data: data
    }
    return await post(options)
}



export async function newBook(token: string, data: BookFormData): Promise<R<string>> {
    const formData = new FormData();
    formData.append("name", data.name)
    formData.append("author", data.author)
    formData.append("isbn", data.isbn)
    formData.append("targetAge", data.targetAge)
    formData.append("targetGender", data.targetGender)
    formData.append("description", data.description)
    formData.append("cover", data.cover, data.cover.name)
    const options = {
        port: SPRING,
        endpoint: Admin_Api.newBook,
        token: token,
        data: formData
    }
    return await post(options)
}

// 添加文章
export async function newArticle(token: string, data: ArticleFormData): Promise<R<string>> {
    const formData = new FormData();
    formData.append("title", data.title)
    formData.append("languageCode", data.languageCode)
    formData.append("targetAge", data.targetAge)
    formData.append("targetGender", data.targetGender)
    formData.append("lastModified", data.file.lastModified.toString())
    formData.append("file", data.file, data.file.name)
    const options = {
        port: SPRING,
        endpoint: Admin_Api.newArticle,
        token: token,
        data: formData
    }
    return await post(options)
}