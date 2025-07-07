import {ListItem} from "@@/layout/system/components/ListItem.tsx";
import {QuestionData} from "@@/ts/model.ts";
import {questionDataKey} from "@@/function/localStorage.ts";
import {useEffect, useState} from "react";
import {toListQuestion} from "@@/ts/request/question.ts";
import {Highlight} from "@@/layout/system/components/Highlight.tsx";

export default function Question() {

    const size = 10
    const [question, setQuestion] = useState<Array<QuestionData>>([])

    const questionList = async () => {
        const result = await toListQuestion(question.length, size)
        if (result.data) {
            const newBooks = [...question, ...result.data]
            setQuestion(newBooks)
            localStorage.setItem(questionDataKey, JSON.stringify(newBooks))
        }
    }

    useEffect(() => {
        const data = localStorage.getItem(questionDataKey)
        if (data) {
            setQuestion(JSON.parse(data))
        } else questionList().finally()
    }, []);

    return (
        <div className="list">
            {question && question.map((item, index) => (
                <ListItem key={index} title={item.title}
                          context={
                              <>
                                  <Highlight label='语言' text={item.languageCode}/>
                                  <Highlight label='浏览量' text={item.hit.toString()}/>
                                  <Highlight label='年龄段' text={item.targetAge}/>
                                  <Highlight label='性别范围' text={item.targetGender}/>
                              </>
                          }
                          subContent={
                              <>
                                  <Highlight label='创建时间' text={item.createTime}/>
                                  {item.modifyTime &&
                                      <Highlight label='修改时间' text={item.modifyTime}/>
                                  }
                              </>
                          }
                />
            ))}
        </div>
    )

}