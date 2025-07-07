import {Age, ArticleFormData, Gender, LanguageList, theme} from "@@/ts/model.ts";
import {useState, useLayoutEffect} from 'react';
import {useNavigate} from 'react-router-dom';
// @ts-ignore
const fileSystemSupported = !!window.showOpenFilePicker;
import {Pop} from "@@/layout/system/components/GlobalPop.tsx";

import {
    articleFileNameKey, articleKey,
    articleTitleKey,
    getToken, localStorageBatchRemove,
    localStorageBatchSave,
} from "@@/function/localStorage.ts";
import {formatR} from "@@/function/response.ts";
import {FileForm} from "@@/layout/system/components/FileForm.tsx";
import {MarkDown} from "@@/layout/system/components/MarkDown.tsx";
import {newArticle} from "@@/ts/request/admin.ts";

export default function ArticleForm({handle}: { handle: (result: boolean) => void }) {

    const fileType = "text/markdown"
    const defaultFileName = 'untitled'
    const defaultTip = "上传只支持`.md`文件, 文件命名自动添加`.md`"
    const [tip, setTip] = useState(defaultTip)
    const navigate = useNavigate();
    const [title, setTitle] = useState(localStorage.getItem(articleTitleKey) || '');
    const [fileName, setFileName] = useState(localStorage.getItem(articleFileNameKey) || defaultFileName);
    const [targetAge, setTargetAge] = useState(Age.Over.value);
    const [targetGender, setTargetGender] = useState(Gender.Guarded.value);
    const [languageCode, setLanguageCode] = useState(LanguageList.Chinese_Simplified.code);
    const [showPop, setShowPop] = useState(false)
    const [previewTheme, setPreviewTheme] = useState(theme[0])
    const [mdText, setMdText] = useState(localStorage.getItem(articleKey) || '');
    const [articleFormData, setArticleFormData] = useState<ArticleFormData>(
        {
            title: title, file: new File([""], '', {type: fileType}),
            languageCode: languageCode, targetAge: targetAge, targetGender: targetGender,
        }
    );

    useLayoutEffect(() => {
        const map = new Map<string, string>([
            [articleKey, mdText],
            [articleFileNameKey, fileName],
            [articleTitleKey, title]
        ]);
        localStorageBatchSave(map)
        setArticleFormData({
            title,
            languageCode,
            targetAge,
            targetGender,
            file: new File([mdText], fileName + ".md", {type: fileType})
        });
    }, [languageCode, targetAge, targetGender, title, mdText, fileName])

    const handleFile = (files: FileList | null) => {
        if (files && files.length > 0) {
            const choseFile = files[0];
            const reader = new FileReader();
            if (choseFile.type != fileType) {
                setTip("只能上传 `.md` 文件 !!!")
                return
            }
            const choseFileName = choseFile.name.split('.').slice(0, -1).join('.');
            setTitle(choseFileName)
            setFileName(choseFileName)
            setArticleFormData(prev => ({
                ...prev,
                file: choseFile,
            }));
            reader.onload = (e) => {
                const text = e.target?.result as string;
                setMdText(text)
            }
            reader.onerror = (e) => {
                console.error("读取文件出错:", e);
            };
            reader.readAsText(choseFile);
            setShowPop(true)
        }
        if (!files) {
            setTitle('')
            setTip(defaultTip)
            setMdText('')
            setFileName(defaultFileName)
            setArticleFormData(prev => ({
                ...prev,
                file: new File([""], defaultFileName, {type: fileType}),
            }));
        }
    };

    const onUploadImg = async (files: File[], callback: (urls: string[]) => void): Promise<void> => {
        const toBase64 = (file: File): Promise<string> =>
            new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = () => resolve(reader.result as string);
                reader.onerror = (error) => reject(error);
            });
        const base64List = await Promise.all(files.map(file => toBase64(file)));
        callback(base64List);
    };


    const saveToLocalFileSystem = async () => {
        try {
            // @ts-ignore
            const [handle] = await window.showOpenFilePicker({
                types: [{description: "Markdown Files", accept: {fileType: [".md"]},},],
            });
            const writable = await handle.createWritable();
            await writable.write(mdText);
            await writable.close();
        } catch (err) {
            console.error("保存失败:", err);
        }
    };

    const saveEditContent = () => {
        if (fileSystemSupported) {
            saveToLocalFileSystem().finally();
        } else {
            if (mdText.length == 0) return
            const updatedFile = new File([mdText], articleFormData.file.name, {type: fileType});
            const dataTransfer = new DataTransfer();
            dataTransfer.items.add(updatedFile)
            handleFile(dataTransfer.files)
            const url = URL.createObjectURL(updatedFile);
            const link = document.createElement("a");
            link.href = url;
            link.download = updatedFile.name;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
        }
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const isValidCode = (code: string) => {
            return Object.values(LanguageList).some(language => language.code === code);
        };
        const isValidAge = (value: string) => {
            return Object.values(Age).some(age => age.value === value);
        };
        const isValidGender = (value: string) => {
            return Object.values(Gender).some(gender => gender.value === value);
        };

        const article = articleFormData
        if (article.title.length <= 0) {
            setTip("请填写标题")
            return
        }
        if (!isValidCode(article.languageCode) || !isValidAge(article.targetAge) || !isValidGender(article.targetGender)) {
            setTip("文章属性不正确")
            return
        }
        if (article.file.name == defaultFileName + ".md") {
            setTip("改一下文件名")
            return
        }
        if (article.file.size == 0) {
            setTip("文件没有内容")
            return
        }
        if (article.file.type != fileType) {
            setTip("文件类型不对")
            return
        }
        const token = getToken()
        if (!token) {
            setTip("没有登录")
            return
        }
        const result = await newArticle(token, articleFormData)
        setTip(formatR(result.info))
        if (result.info?.code == 11010) {
            handle(false)
            const set = new Set<string>([articleKey, articleFileNameKey, articleTitleKey]);
            localStorageBatchRemove(set)
        }
        if (result.info?.code == 60300) {
            navigate('/login');
        }
    }


    return (
        <>
            <form className="eighty-form" onSubmit={handleSubmit} style={{position: "relative"}}>
                <div className="padding" style={{display: "flex", marginTop: "1.6rem"}}>
                    <label htmlFor="title" style={{fontSize: "1.6rem"}}>标题:</label>
                    <input className="form-input"
                           style={{flex: "1"}} type="text" id="title" name="title"
                           value={title}
                           onChange={e => setTitle(e.target.value)}
                    />
                </div>

                <div className="padding" style={{marginTop: "1rem"}}>
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
                    <label className="padding-left" htmlFor="targetAge">年龄范围:</label>
                    <select className="form-select" id="targetAge" name="targetAge"
                            value={targetAge}
                            onChange={(e) => setTargetAge(e.target.value)}>
                        {Object.values(Age).map(age => (
                            <option key={age.label} value={age.value}>{age.label}</option>
                        ))}
                    </select>
                    <label className="padding-left" htmlFor="targetGender">性别范围:</label>
                    <select className="form-select" id="targetGender" name="targetGender"
                            value={targetGender}
                            onChange={(e) => setTargetGender(e.target.value)}>
                        {Object.values(Gender).map(gender => (
                            <option key={gender.label} value={gender.value}>{gender.label}</option>
                        ))}
                    </select>
                </div>

                <div className="padding" style={{marginTop: "1rem", flex: "1"}}>
                    <div style={{display: "flex", alignItems: "center"}}>
                        <label htmlFor="file">文件:</label>
                        <input className="form-input"
                               style={{flex: "1"}} type="text" id="file-name" name="file-name"
                               value={fileName}
                               onChange={e => setFileName(e.target.value)}
                               onKeyDown={(e) => {
                                   if (/\s/.test(e.key)) {
                                       e.preventDefault();
                                   }
                               }}
                        />
                        <div className="button-right" style={{width: "auto", marginTop: "0", paddingLeft: "1rem"}}>
                            <button type="button" onClick={() => setShowPop(!showPop)}
                                    className={"submit-button"}>编辑
                            </button>
                        </div>
                    </div>
                    {/*文件上传*/}
                    <div style={{marginTop: "2rem"}}>
                        <FileForm type='.md' onFileSelect={file => handleFile(file)}/>
                    </div>
                    <label className="tip" htmlFor="tip" style={{marginTop: "2rem"}}>{tip}</label>
                    <div className={"button-right"} style={{position: "absolute", bottom: "1rem", right: "1rem"}}>
                        <button type="submit" className={"submit-button"} style={{alignSelf: "end"}}>提交</button>
                    </div>
                </div>
            </form>
            <Pop isOpen={showPop} title={"编辑    " + articleFormData.file.name}
                 onClose={() => setShowPop(false)}>
                <div style={{width: "90vw", height: "90vh"}}>
                    <label className="padding-left" htmlFor="theme-label">主题:</label>
                    <select className="form-select" id="theme" name="theme"
                            defaultValue={previewTheme}
                            onChange={(e) => setPreviewTheme(e.target.value)}
                            style={{marginTop: "1rem", marginBottom: "1rem"}}
                    >
                        {theme.map(t => (
                            <option key={t} value={t}>{t}</option>
                        ))}
                    </select>
                    <MarkDown value={mdText}
                              onChange={setMdText}
                              previewTheme={previewTheme}
                              onUploadImg={onUploadImg}
                              saveEditContent={saveEditContent}/>
                </div>
            </Pop>
        </>
    );
}