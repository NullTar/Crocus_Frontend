import {Age, Gender, theme} from "@@/api/model.ts";
import {useState, useEffect, useLayoutEffect} from 'react';
import {Pop} from "@@/layout/system/components/GlobalPop.tsx";
import {MdEditor, config, XSSPlugin} from 'md-editor-rt';
import 'md-editor-rt/lib/style.css';
import {lineNumbers} from '@codemirror/view';
import {foldGutter} from '@codemirror/language';
import SparkMD5 from 'spark-md5';

config({
    markdownItPlugins(plugins) {
        return [
            ...plugins,
            {
                type: 'xss',
                plugin: XSSPlugin,
                options: {}, // 可选：传递给 xss 插件的配置项
            },
        ];
    },
    codeMirrorExtensions(_theme, extensions) {
        return [...extensions, lineNumbers(), foldGutter()];
    },
});

const LanguageContext = {
    Chinese_Simplified: {label: "简体中文", code: "zh_CN"},
    Chinese_Traditional: {label: "繁體中文", code: "zh_TW"},
    English_USA: {label: "英语 (美国)", code: "en_US"},
    English_UK: {label: "英语 (英国)", code: "en_GB"},
}

interface ImageBase64 {
    md5: string,
    value: string
}


export default function ArticleForm() {

    const [tip, setTip] = useState("只支持`.md`文件")
    const [languageCode, setLanguageCode] = useState(LanguageContext.Chinese_Simplified.code)
    const [targetAge, setTargetAge] = useState(Age.Over.value)
    const [targetGender, setTargetGender] = useState(Gender.Guarded.value)
    const [showPop, setShowPop] = useState(false)
    const [mdText, setMdText] = useState('');
    const [previewTheme, setPreviewTheme] = useState(theme[0])
    const [imageBase64, setImageBase64] = useState<ImageBase64[]>([])
    const doNotChangeThis = "不要改变这个值!"

    const [articleFormData, setArticleFormData] = useState({
        title: "",
        fileName: "",
        contentType: "",
        file: null as File | null,
        languageCode: languageCode,
        targetAge: targetAge,
        targetGender: targetGender,
    });

    useLayoutEffect(() => {
        console.log(imageBase64)
    }, [articleFormData, imageBase64])

    useEffect(() => {
        setArticleFormData(prev => ({
            ...prev,
            languageCode,
            targetAge,
            targetGender,
        }));
    }, [languageCode, targetAge, targetGender]);


    const customSanitize = (html: string): string => {
        return html.replace(/<img\s+[^>]*src=["']data-img-md5=([^"']+)["'][^>]*>/g, (match, md5) => {
            const base64 = md5ImageMap[md5];
            if (!base64) return match; // 如果找不到对应图片，返回原标签

            return `<div class="foldable-img" onclick="this.classList.toggle('expanded')">
              <span class="foldable-img-placeholder">点击展开图片</span>
              <img src="${base64}" style="display:none;" />
            </div>`;
        });
    };

    const handleFile = (files: FileList | null) => {
        if (files && files.length > 0) {
            const choseFile = files[0];
            const reader = new FileReader();
            if (choseFile.type != "text/markdown") {
                setTip("只能上传 `.md` 文件 !!!")
                return
            }
            setArticleFormData(prev => ({
                ...prev,
                file: choseFile,
                title: choseFile.name.split('.').slice(0, -1).join('.'),
                fileName: choseFile.name,
                contentType: choseFile.name.split('.').pop() || '',
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
        } else {
            setArticleFormData(prev => ({
                ...prev,
                file: null,
                title: '',
                fileName: '',
                contentType: '',
            }));
            setMdText('')
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

        const calculateMD5 = async (file: File): Promise<string> => {
            const arrayBuffer = await file.arrayBuffer();
            const spark = new SparkMD5.ArrayBuffer();
            spark.append(arrayBuffer);
            return spark.end() + doNotChangeThis;
        };

        const base64Promises = files.map(file => toBase64(file));
        const md5Promises = files.map(file => calculateMD5(file));

        const [base64List, md5List] = await Promise.all([
            Promise.all(base64Promises),
            Promise.all(md5Promises)
        ]);

        const newImages: ImageBase64[] = md5List.map((md5, index) => ({
            md5,
            value: base64List[index]
        }));

        setImageBase64(prev => [...prev, ...newImages]);
        callback(md5List);
    };

    const handleSubmit = () => {

    }


    return (
        <>
            <form className="eighty-form">
                <div className="padding" style={{display: "flex", marginTop: "1.6rem"}}>
                    <label htmlFor="title" style={{fontSize: "1.6rem"}}>标题:</label>
                    <input className="form-input"
                           style={{flex: "1"}} type="text" id="title" name="title"
                           value={articleFormData.title}
                           onChange={e =>
                               setArticleFormData(prev => ({
                                   ...prev,
                                   title: e.target.value
                               }))}
                    />
                </div>

                <div className="padding" style={{marginTop: "1rem"}}>
                    <label htmlFor="languageCode">语言:</label>
                    <select className="form-select" id="languageCode" name="languageCode"
                            value={languageCode}
                            onChange={(e) => setLanguageCode(e.target.value)}>
                        {Object.values(LanguageContext).map(language => (
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
                            onChange={e => setTargetGender(e.target.value)}>
                        {Object.values(Gender).map(gender => (
                            <option key={gender.label} value={gender.value}>{gender.label}</option>
                        ))}
                    </select>
                </div>

                <div className="padding" style={{marginTop: "1rem", position: "relative", flex: "1"}}>
                    <div style={{display: "flex", alignItems: "center"}}>
                        <label htmlFor="file">文件:</label>
                        <label className="tip" htmlFor="tip">
                            {articleFormData.fileName.length != 0 ? articleFormData.fileName : tip}
                        </label>
                        {articleFormData.file &&
                            <button type="button" onClick={() => handleFile(null)}
                                    className="close-button">&times;</button>
                        }
                        <div className="button-right" style={{width: "auto", marginTop: "0", paddingLeft: "1rem"}}>
                            <button type="button" onClick={() => setShowPop(!showPop)}
                                    className={"submit-button"}>编辑
                            </button>
                        </div>
                    </div>
                    {!articleFormData.file &&
                        <div className="file-form"
                             style={{marginTop: "1rem"}}
                             onDrop={e => {
                                 e.preventDefault()
                                 handleFile(e.dataTransfer.files);
                             }}
                             onDragOver={(e) => e.preventDefault()}
                        >
                            <input style={{opacity: "0"}}
                                   type="file" id="file" name="file"
                                   onChange={(e) => handleFile(e.target.files)}/>
                        </div>
                    }
                    <div className={"button-right"} style={{position: "absolute", bottom: "1rem", right: "1rem"}}>
                        <button type="submit" onClick={handleSubmit}
                                className={"submit-button"} style={{alignSelf: "end"}}>提交
                        </button>
                    </div>
                </div>
            </form>
            <Pop isOpen={showPop} title={"编辑    " + articleFormData.title} onClose={() => setShowPop(!showPop)}>
                <div style={{width: "90vw", height: "90vh"}}>
                    <label className="padding-left" htmlFor="theme-label">主题:</label>
                    <select className="form-select" id="theme" name="theme"
                            value={previewTheme}
                            onChange={(e) => setPreviewTheme(e.target.value)}
                            style={{marginTop: "1rem", marginBottom: "1rem"}}
                    >
                        {theme.map(t => (
                            <option key={t} value={t}>
                                {t}
                            </option>
                        ))}
                    </select>
                    <MdEditor value={mdText}
                              onChange={setMdText}
                              previewTheme={previewTheme}
                              onUploadImg={onUploadImg}
                              showCodeRowNumber={true}
                              codeTheme={"atom"}
                              htmlPreview={false}
                              toolbarsExclude={["github", "previewOnly", "htmlPreview"]}
                              catalogLayout='flat'
                              sanitize={customSanitize}
                    />
                </div>
            </Pop>
        </>
    );
}