import {useSearchParams} from "react-router-dom";
import {useState, useEffect} from "react";
import {Age, ArticleData, Gender, LanguageList} from "@@/ts/model.ts";
import {articleRecommendKey} from "@@/function/localStorage.ts";
import {navigateToErrorPage} from "@@/layout/system/Error.tsx";
import MarkdownPreview from "@@/layout/system/components/MarkdownPreview.tsx";
import {queryByUUID} from "@@/ts/request/common.ts";
import {Common_Api} from "@@/ts/api.ts";

const ArticleDetail: React.FC = () => {
    const [article, setArticle] = useState<ArticleData | null>(null);
    const [markdown, setMarkdown] = useState<string>("");
    const [show, setShow] = useState(false);
    const [searchParams] = useSearchParams();
    const uuid = searchParams.get("uuid");


    const requestByUUID = async (uuid: string): Promise<ArticleData | undefined> => {
        const result = await queryByUUID<ArticleData>(uuid, Common_Api.queryArticle);
        return result.data;
    }

    const initData = async () => {
        if (uuid) {
            const articles = localStorage.getItem(articleRecommendKey)
            if (articles != null) {
                const list = JSON.parse(articles) as ArticleData[];
                let found = list.find(a => a.uuid === uuid);
                const now = Date.now()
                if (!found) {
                    const result = await requestByUUID(uuid)
                    if (result) {
                        result.time = now
                        found = result
                    }
                }
                if (found) {
                    setArticle(found);
                    if (found.text) {
                        setMarkdown(found.text)
                        return
                    } else {
                        if (found.time) {
                            const now = Date.now()
                            const diff = now - found.time;
                            const twentyMinutes = 20 * 60 * 1000;
                            if (diff >= twentyMinutes) {
                                const data = await requestByUUID(uuid)
                                if (data) {
                                    data.time = now
                                    found.url = data.url
                                }
                            }
                        }
                        fetch(found.url)
                            .then(res => {
                                const type = res.headers.get("Content-Type");
                                if (!type || !type.includes("text/markdown")) {
                                    navigateToErrorPage("500", `不支持的文件类型：${type}`)
                                }
                                return res.text();
                            })
                            .then(text => {
                                setMarkdown(text);
                                const updatedList = list.map(a =>
                                    a.uuid === found.uuid ? {...found, text} : a);
                                localStorage.setItem(articleRecommendKey, JSON.stringify(updatedList));
                            })
                            .catch(err => {
                                navigateToErrorPage("500", `获取 Markdown 内容失败:${err.error}`)
                            });
                    }
                }
            }
        }
    }

    useEffect(() => {
        initData().finally()
    }, []);

    function estimateReadingTime(markdown: string): string {
        const plainText = markdown
            .replace(/```\s*[\s\S]*?```/g, '')       // 去除代码块
            .replace(/`[^`]*`/g, '')                 // 去除内联代码
            .replace(/!$begin:math:display$.*?$end:math:display$$begin:math:text$.*?$end:math:text$/g, '')         // 去除图片
            .replace(/$begin:math:display$.*?$end:math:display$$begin:math:text$.*?$end:math:text$/g, '')          // 去除链接
            .replace(/[#>*\-`~_]/g, '')              // 去除 Markdown 特殊字符
            .replace(/\s+/g, ' ')                    // 合并空白
            .trim();

        const chineseCharCount = (plainText.match(/[\u4e00-\u9fa5]/g) || []).length;
        const englishWordCount = (plainText.match(/\b[a-zA-Z]+\b/g) || []).length;

        const totalTime =
            chineseCharCount / 300 + englishWordCount / 200; // 按阅读速度估算

        const minutes = Math.ceil(totalTime);

        return `${minutes}`;
    }

    const handleShow = () => {
        setShow(!show);
    }

    return (
        <>
            <div className='article-preview-default'></div>
            <div className="article-detail">
                {article && (
                    <div className="markdown-body" style={{background: "transparent"}}>

                        <div className='article-detail-info'>
                            <div onClick={handleShow} className='handle-show'
                                 style={show ? {marginLeft: "6rem"} : {marginLeft: "1rem"}}>
                                {show ? "展开" : '折叠'}
                            </div>
                            <span
                                style={{marginLeft: 'auto'}}>适用年龄: {Object.values(Age).find(age => age.value === article.targetAge)?.label ?? article.targetAge}</span>
                            <span>适用性别: {Object.values(Gender).find(gender => gender.value === article.targetGender)?.label ?? article.targetGender}</span>
                            <span>语言: {Object.values(LanguageList).find(language => language.code === article.languageCode)?.label ?? article.languageCode}</span>
                            <span>最近更新: {article.modifyTime ? article.modifyTime : article.createTime}</span>
                            <span>大约{estimateReadingTime(markdown)}分钟阅读</span>
                        </div>
                        <MarkdownPreview markdown={markdown} show={show}/>
                    </div>
                )}
            </div>
        </>
    );
};

export default ArticleDetail
