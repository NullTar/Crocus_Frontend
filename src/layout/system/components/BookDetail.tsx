import {Age, Gender} from "@@/ts/model.ts";
import {BookDetailProps} from "@@/ts/props.ts";

export const BookDetail: React.FC<BookDetailProps> = ({book}) => {
    return (
        <div style={{width: "40vw"}}>
            <img src={book.url} alt={book.name}/>

            <div className='book-detail'>作者: {book.author}</div>
            <div className='book-detail'>ISBN: {book.isbn}</div>
            <div className='book-detail'>
                <span>适用年龄: {Object.values(Age).find(age => age.value === book.targetAge)?.label ?? book.targetAge}</span>
                <span>适用性别: {Object.values(Gender).find(gender => gender.value === book.targetGender)?.label ?? book.targetGender}</span>
            </div>
            <div className='book-detail'>描述: {book.description}</div>
        </div>
    );
};