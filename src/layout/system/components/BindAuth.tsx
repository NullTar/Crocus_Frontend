import {useState} from 'react';
import "@@/css/i-verifyCode.css"
import {useTranslation} from "@@/layout/system/language/useTranslation.tsx";
import {authUrlKey, bindAuthKey, getToken} from "@@/function/localStorage.ts";
import {navigateToErrorPage} from "@@/layout/system/Error.tsx";
import {checkOrBindAuth, verifyAuthCode} from "@@/ts/request/authority.ts";
import QRCode from 'qrcode';
import {checkLanguage, formatR} from "@@/function/response.ts";
import {Authority_Api} from "@@/ts/api.ts";

export const BindAuth = ({onClose}: { onClose: (result: boolean) => void }) => {

    const translation = useTranslation()
    const [code, setCode] = useState<string>("");
    const [passcode, setPasscode] = useState<string>("");
    const [tipText, setTipText] = useState<string>(translation.request.bindAuthTip);
    const [showQR, setShowQR] = useState(false)
    const [imageData, setImageData] = useState<string>()

    const copyLink = async () => {
        const condition = checkLanguage()
        const url = localStorage.getItem(authUrlKey)
        if (url == undefined) navigateToErrorPage("404", condition ? "没有 Auth Url" : "No Auth Url")
        if (typeof url === "string") {
            await navigator.clipboard.writeText(url);
        }
    };

    const getAuthUrl = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const result = await checkOrBindAuth(Authority_Api.bindAuth, passcode)
        const code = result.info?.code
        if (code == 100025 && result.data != undefined) {
            localStorage.setItem(authUrlKey, result.data)
            setShowQR(true)
            QRCode.toDataURL(result.data).then((url: string) => {
                setImageData(url)
            });
        }
        setTipText(formatR(translation.request.failed, result.info))
    }

    const checkCode = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const token = getToken()
        if (token != undefined && code.length == 6) {
            setTipText(translation.request.wait)
            const result = await verifyAuthCode(token, code, passcode)
            setTipText(formatR(translation.request.failed, result.info))
            if (result.info?.code == 10030) {
                localStorage.setItem(bindAuthKey, "Yes")
                localStorage.removeItem(authUrlKey)
                onClose(true)
            }
        }
    }

    return (
        <div className={"login"} style={{height: "auto"}}>
            {!showQR &&
                <form onSubmit={getAuthUrl} className={"login-form"}>
                    <input type="password"
                           className="input"
                           name="passcode"
                           placeholder={translation.login.password}
                           value={passcode}
                           onChange={(e) => setPasscode(e.target.value)}
                    />
                    <div className={"form-tips"}>
                        <p className="tip-error">{tipText}</p>
                    </div>
                    <div className={"button-right"}>
                        <button type={"submit"} className={"submit-button"}>
                            {translation.request.submit}
                        </button>
                    </div>
                </form>
            }

            {showQR &&
                <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                    {imageData &&
                        <img src={imageData} alt="QR Code"/>
                    }
                    <form onSubmit={checkCode} className={"login-form"}>
                        <input type="text"
                               className="input"
                               name="code"
                               placeholder={translation.request.authCode}
                               value={code}
                               onChange={(e) => setCode(e.target.value)}
                        />
                        <p className="tip">{tipText}</p>
                        <div className={"button-right"}>
                            <div style={{display: "flex"}}>
                                <button type={"button"} className={"submit-button"}
                                        onClick={copyLink}>{translation.copy}</button>
                                <button type={"submit"}
                                        className={"submit-button"}>{translation.request.submit}</button>
                            </div>
                        </div>
                    </form>
                    <a className={"link"} target="_blank" href={"https://apps.apple.com/cn/app/passwords/id6473799789"}>Apple
                        Password</a>
                    <a className={"link"}
                       target="_blank"
                       href={"https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2&hl=en-US&pli=1"}>Google
                        Authenticator</a>
                    <a className={"link"}>Microsoft Authenticator</a>
                    <a className={"link"} target="_blank" href={"https://1password.com/zh-cn/downloads/"}>1Password</a>
                    <a className={"link"} target="_blank" href={"https://www.authy.com"}>Authy</a>
                </div>
            }
        </div>
    );
};
