import {useState} from 'react';
import {Age, Gender, LanguageList, QuestionFormData} from "@@/ts/model.ts";
import {getToken} from "@@/function/localStorage.ts";
import {formatR} from "@@/function/response.ts";
import {useNavigate} from 'react-router-dom';
import {newQuestion} from "@@/ts/request/admin.ts";
export default function QuestionForm({handle}: { handle: (result: boolean) => void }) {
    const navigate = useNavigate();
    const [title, setTitle] = useState('')
    const [targetAge, setTargetAge] = useState(Age.Over.value);
    const [targetGender, setTargetGender] = useState(Gender.Guarded.value);
    const [languageCode, setLanguageCode] = useState(LanguageList.Chinese_Simplified.code);
    const [answer, setAnswer] = useState('');
    const [tip, setTip] = useState('')

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setTip('')
        if (!title || !answer || !targetAge || !targetGender || !languageCode) {
            setTip("把表单填写完整")
            return
        }
        const formData: QuestionFormData = {
            title, answer, targetAge, targetGender, languageCode
        }
        const token = getToken()
        if (!token) {
            setTip("没有登录")
            return
        }
        const result = await newQuestion(token, formData)
        setTip(formatR(result.info))
        if (result.info?.code == 40081) {
            handle(false)
        }
        if (result.info?.code == 60300) {
            navigate('/login');
        }
    }

    return (
        <>
            <form className="eighty-form" onSubmit={handleSubmit} style={{position: "relative"}}>
                <div className="padding" style={{marginTop: "1.6rem"}}>
                    <label htmlFor="title" className="formTitle">问题:</label>
                    <input className="form-input" style={{width: "40rem", marginRight: "2rem"}}
                           type="text" id="title" name="title"
                           value={title}
                           onChange={e => setTitle(e.target.value)}
                    />
                </div>
                <div className="padding">
                    <label htmlFor="languageCode">语言:</label>
                    <select className="form-select" id="languageCode" name="languageCode"
                            value={languageCode}
                            onChange={(e) => setLanguageCode(e.target.value)}>
                        {Object.values(LanguageList).map(language => (
                            <option key={language.label} value={language.code}>
                                {language.label}
                            </option>
                        ))}
                    </select>
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
                    <div className="padding textareaContent">
                        <label htmlFor="description" className="formTitle">回答:</label>
                        <textarea
                            className="form-input textareaInput"
                            value={answer}
                            onChange={e => setAnswer(e.target.value)}
                            placeholder="回答..."
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