import {Age, ArticleData, Gender, LanguageList} from "@@/ts/model.ts";
import {getRecommendArticles} from "@@/ts/request/article.ts";
import {articleRecommendKey} from "@@/function/localStorage.ts";
import {useState, useEffect} from 'react'

export const Article: React.FC<{ articleIndex: number, onIndexInvalid: () => void }> = ({
                                                                                            articleIndex,
                                                                                            onIndexInvalid
                                                                                        }) => {
    const [articles, setArticles] = useState<Array<ArticleData>>([])

    const getArticleList = async (id?: number) => {
        const result = await getRecommendArticles(id)
        if (result.data) {
            const now = Date.now()
            const articlesWithTime = result.data.map(article => ({
                ...article,
                time: now
            }));
            setArticles(articlesWithTime);
            localStorage.setItem(articleRecommendKey, JSON.stringify(articlesWithTime));
        }
    }

    const handleOpen = (uuid: string) => {
        const article = articles.find(b => b.uuid == uuid);
        if (article && article.time) {
            const now = Date.now()
            const diff = now - article.time;
            const twentyMinutes = 20 * 60 * 1000;
            if (diff <= twentyMinutes) {
                const url = `/article-detail?uuid=${uuid}`;
                window.open(url, "_blank");
            } else getArticleList().finally()
        }
    }

    useEffect(() => {
        if (articleIndex > 0 && articleIndex >= articles.length) {
            setArticles([]);
            const lastBookId = articles.at(-1);
            getArticleList(lastBookId?.id).finally()
            onIndexInvalid();
        }
    }, [articleIndex, onIndexInvalid]);

    useEffect(() => {
        const data = localStorage.getItem(articleRecommendKey)
        if (data) {
            setArticles(JSON.parse(data))
        } else getArticleList().finally()
    }, [])

    return (
        <>
            <div className="margin">
                {articles.slice(articleIndex, articleIndex + 5).map((a, i) => (
                    <div key={i} className="list-item" onClick={() => handleOpen(a.uuid)} style={{padding: "1rem"}}>
                        <div className="content-container">
                            <h3 className="list-item-title">{a.title}</h3>
                            <p className="list-item-description">
                                <span>适用年龄: {Object.values(Age).find(age => age.value === a.targetAge)?.label ?? a.targetAge}</span>
                                <span>适用性别: {Object.values(Gender).find(gender => gender.value === a.targetGender)?.label ?? a.targetGender}</span>
                                <span>语言: {Object.values(LanguageList).find(language => language.code === a.languageCode)?.label ?? a.languageCode}</span>
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}