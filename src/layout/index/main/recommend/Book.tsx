import {useState, useEffect} from 'react'
import {BookData} from "@@/ts/model.ts";
import {getRecommendBooks} from "@@/ts/request/book.ts";
import {bookRecommendKey} from "@@/function/localStorage.ts";
import {Pop} from "@@/layout/system/components/GlobalPop.tsx";
import {BookDetail} from "@@/layout/system/components/BookDetail.tsx";

export const Book: React.FC<{ bookIndex: number, onIndexInvalid: () => void }> = ({bookIndex, onIndexInvalid}) => {
    const [books, setBooks] = useState<Array<BookData>>([])
    const [showPopup, setShowPopup] = useState<boolean>(false);
    const [currentBook, setCurrentBook] = useState<BookData | null>(null);

    const getBookList = async (id?: number) => {
        const result = await getRecommendBooks(id)
        if (result.data) {
            setBooks(result.data)
            localStorage.setItem(bookRecommendKey, JSON.stringify(result.data))
        }
    }

    const handlePop = (id: number) => {
        const book = books.find(b => b.id == id);
        setCurrentBook(book || null);
        setShowPopup(true)
    }

    useEffect(() => {
        if (bookIndex > 0 && bookIndex >= books.length) {
            setBooks([]);
            const lastBookId = books.at(-1);
            getBookList(lastBookId?.id).finally()
            onIndexInvalid();
        }
    }, [bookIndex, onIndexInvalid]);

    useEffect(() => {
        const data = localStorage.getItem(bookRecommendKey)
        if (data) {
            setBooks(JSON.parse(data))
        } else getBookList().finally()
    }, [])

    return (
        <>
            <div className="margin" style={{display: "flex"}}>
                {books.slice(bookIndex, bookIndex + 4).map((b, i) => (
                    <div key={i} className="book-card" onClick={() => handlePop(b.id)}>
                        <div style={{width: "100%", height: "16rem"}}>
                            <img src={b.url} alt={b.name} className="book-cover"/>
                        </div>
                        <div className="book-info">
                            <h3 className="book-title">{b.name}</h3>
                            <p className="book-author">By {b.author}</p>
                        </div>
                    </div>
                ))}
            </div>
            {currentBook &&
                <Pop isOpen={showPopup} title={currentBook.name} onClose={() => setShowPopup(false)}>
                    <BookDetail book={currentBook}/>
                </Pop>
            }
        </>
    )
}