import {useEffect, useState} from "react";
import {toListBook} from "@@/ts/request/book.ts";
import {BookData} from "@@/ts/model.ts";
import {bookDataKey} from "@@/function/localStorage.ts";
import {ListItem} from "@@/layout/system/components/ListItem.tsx";
import {Highlight} from "@@/layout/system/components/Highlight.tsx";

export default function Book() {
    const size = 10
    const [book, setBook] = useState<Array<BookData>>([])

    const bookList = async () => {
        const result = await toListBook(book.length, size)
        if (result.data) {
            const newBooks = [...book, ...result.data]
            setBook(newBooks)
            localStorage.setItem(bookDataKey, JSON.stringify(newBooks))
        }
    }

    useEffect(() => {
        const data = localStorage.getItem(bookDataKey)
        if (data) {
            setBook(JSON.parse(data))
        } else bookList().finally()
    }, []);

    return (
        <>
            <div className="list">
                {book && book.map((item, index) => (
                    <ListItem key={index} title={item.name}
                              context={
                                  <>
                                      <Highlight label='作者' text={item.author}/>
                                      <Highlight label='ISBN' text={item.isbn}/>
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
                                      <div style={{paddingTop: "1rem"}}>{item.description}</div>
                                  </>
                              }
                    />
                ))}
            </div>
        </>
    )
}