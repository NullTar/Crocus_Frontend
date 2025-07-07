import {useState} from 'react';
import {Age, BookFormData, Gender} from "@@/ts/model.ts";
import {FileForm} from "@@/layout/system/components/FileForm.tsx";
import {getToken} from "@@/function/localStorage.ts";
import {formatR} from "@@/function/response.ts";
import {useNavigate} from 'react-router-dom';
import {newBook} from "@@/ts/request/admin.ts";

export default function BookForm({handle}: { handle: (result: boolean) => void }) {
    const navigate = useNavigate();
    const [name, setName] = useState('')
    const [author, setAuthor] = useState('')
    const [cover, setCover] = useState<File | null>()
    const [description, setDescription] = useState('')
    const [ISBN, setISBN] = useState('')
    const [targetAge, setTargetAge] = useState(Age.Over.value);
    const [targetGender, setTargetGender] = useState(Gender.Guarded.value);
    const [previews, setPreviews] = useState('');
    const [tip, setTip] = useState('')

    const handleFile = (files: FileList | null) => {
        if (!files) {
            setPreviews("")
            setCover(null)
            return
        }
        const imageFile = Array.from(files).filter(file =>
            file.type.startsWith("image/")
        )[0];
        const imageURLs = URL.createObjectURL(imageFile);
        setPreviews(imageURLs);
        setCover(imageFile)
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!name || !ISBN || !targetAge || !targetGender || !description || !author || cover == null) {
            setTip("把表单填写完整")
            return
        }
        if (cover) {
            const bookFormData: BookFormData = {
                name, author, isbn: ISBN, targetAge, targetGender, description, cover,
            }
            const token = getToken()
            if (!token) {
                setTip("没有登录")
                return
            }
            const result = await newBook(token, bookFormData)
            setTip(formatR(result.info))
            if (result.info?.code == 11010) {
                handle(false)
            }
            if (result.info?.code == 60300) {
                navigate('/login');
            }
        }

    }

    return (
        <>
            <form className="eighty-form" onSubmit={handleSubmit} style={{position: "relative"}}>
                <div className="padding" style={{marginTop: "1.6rem"}}>
                    <label htmlFor="name" className="formTitle">书名:</label>
                    <input className="form-input" style={{marginRight: "2rem"}}
                           type="text" id="name" name="name"
                           value={name}
                           onChange={e => setName(e.target.value)}
                    />
                    <label htmlFor="author" className="formTitle">作者:</label>
                    <input className="form-input"
                           type="text" id="author" name="author"
                           value={author}
                           onChange={e => setAuthor(e.target.value)}
                    />
                </div>
                <div className="padding">
                    <label htmlFor="ISBN" className="formTitle">ISBN:</label>
                    <input className="form-input" style={{marginRight: "2rem"}}
                           type="text" id="ISBN" name="ISBN"
                           value={ISBN}
                           onChange={e => setISBN(e.target.value)}
                    />
                    <label className="formTitle" htmlFor="targetAge">年龄范围:</label>
                    <select className="form-select" id="targetAge" name="targetAge"
                            value={targetAge} style={{marginRight: "2rem"}}
                            onChange={(e) => setTargetAge(e.target.value)}>
                        {Object.values(Age).map(age => (
                            <option key={age.label} value={age.value}>{age.label}</option>
                        ))}
                    </select>
                    <label className="formTitle" htmlFor="targetGender">性别范围:</label>
                    <select className="form-select" id="targetGender" name="targetGender"
                            value={targetGender}
                            onChange={(e) => setTargetGender(e.target.value)}>
                        {Object.values(Gender).map(gender => (
                            <option key={gender.label} value={gender.value}>{gender.label}</option>
                        ))}
                    </select>
                </div>
                <div style={{display: "flex"}}>
                    <div>
                        <div className='padding' style={{display: "flex"}}>
                            <label htmlFor="description" className="formTitle">封面:</label>
                            <div style={{marginLeft: "0.8rem"}}>
                                <FileForm type="image/*" onFileSelect={file => handleFile(file)}/>
                            </div>
                        </div>
                        {previews &&
                            <img className='imagePreview' src={previews} alt='预览图'/>
                        }
                    </div>
                    <div className="padding textareaContent">
                        <div>
                            <label htmlFor="description" className="formTitle">描述:</label>
                            <p>{description.length}/200</p>
                        </div>
                        <textarea
                            className="form-input textareaInput"
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                            maxLength={200}
                            placeholder="书籍简介、描述..."
                        />
                    </div>
                </div>
                <label className="tip" htmlFor="tip" style={{marginTop: "2rem"}}>{tip}</label>
                <div className={"button-right"} style={{position: "absolute", bottom: "1rem", right: "1rem"}}>
                    <button type="submit" className={"submit-button"}>提交</button>
                </div>
            </form>
        </>
    )
}