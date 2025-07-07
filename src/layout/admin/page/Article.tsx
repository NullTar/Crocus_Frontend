import {useState, useEffect} from "react";
import {ArticleData} from "@@/ts/model.ts";
import {toListArticle} from "@@/ts/request/article.ts";
import {Highlight} from "@@/layout/system/components/Highlight.tsx";
import {ListItem} from "@@/layout/system/components/ListItem.tsx";
import {articleDataKey} from "@@/function/localStorage.ts";

export default function Article() {

    const size = 10
    const [article, setArticle] = useState<Array<ArticleData>>([])
    const getArticle = async () => {
        const result = await toListArticle(article.length, size)
        if (result.data) {
            const newArticle = [...article, ...result.data]
            setArticle(newArticle)
            localStorage.setItem(articleDataKey, JSON.stringify(newArticle))
        }
    }


    useEffect(() => {
        const data = localStorage.getItem(articleDataKey)
        if (data) {
            setArticle(JSON.parse(data))
        } else getArticle().finally()
    }, []);

    return (
        <div className="article">
            <div className="list">
                {article && article.map((item, index) => (
                    <ListItem key={index} title={item.title}
                              context={
                                  <>
                                      <Highlight label='语言' text={item.languageCode}/>
                                      <Highlight label='年龄段' text={item.targetAge}/>
                                      <Highlight label='性别范围' text={item.targetGender}/>
                                  </>
                              }
                              subContent={
                                  <><Highlight label='创建时间' text={item.createTime}/>
                                      {item.modifyTime &&
                                          <Highlight label='修改时间' text={item.modifyTime}/>
                                      }
                                  </>
                              }
                    />
                ))}
            </div>
        </div>
    )
}
