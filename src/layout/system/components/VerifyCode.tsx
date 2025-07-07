import React, {useEffect, useState} from "react";
import {useTranslation, translations} from "@@/layout/system/language/useTranslation.tsx";
import {Operation, UserLoginFormData} from "@@/ts/model.ts";
import {parseJwt} from "@@/function/jwt.ts";
import {bindAuthKey, saveToken} from "@@/function/localStorage.ts";
import {formatR} from "@@/function/response.ts";
import {VerifyCodeProps} from "@@/ts/props.ts";
import {retryCode, verifyLoginCode, verifyRegisterCode} from "@@/ts/request/authority.ts";

export function VerifyCode({operation, value, placeholder, onVerify}: VerifyCodeProps) {

    const translation = useTranslation()
    const [code, setCode] = useState<string>("");
    const [tipText, setTipText] = useState<string>();
    const [key] = useState(operation == Operation.Register ? value.email : value.account)
    const [countdown, setCountdown] = useState(60);
    const [isCounting, setIsCounting] = useState(true);

    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (isCounting && countdown > 0) {
            timer = setInterval(() => {
                setCountdown(prev => {
                    if (prev <= 1) {
                        clearInterval(timer);
                        setIsCounting(false);
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        }
        return () => clearInterval(timer);
    }, [isCounting, countdown]);

    async function handleVerifyCode(e: React.FormEvent) {
        e.preventDefault();
        if ((placeholder == translation.request.verifyCode && code.length < 8) ||
            (placeholder == translation.request.authCode && code.length < 6)) {
            setTipText(translation.error.length_error)
            return
        }

        if (operation == Operation.Register) {
            const response = await verifyRegisterCode(code, value)
            setTipText(formatR(translation.request.failed, response.info))
            if (response.info?.code === 30001) {
                onVerify(true);
            }
            return
        }

        if (operation == Operation.Login) {
            const response = await verifyLoginCode(code, value as UserLoginFormData)
            setTipText(formatR(translation.request.failed, response.info))
            if (response.data != undefined && response.info?.code == 30003) {
                if (placeholder == translation.request.authCode) {
                    localStorage.setItem(bindAuthKey, "Yes")
                }
                saveToken(response.data)
                const payload = parseJwt(response.data)
                if (payload.payload.data.uuid != undefined) {
                    onVerify(true)
                    return
                }
            }
            return
        }
    }

    const resendCode = async () => {
        if (countdown > 0) {
            const date = new Date(Date.now() + countdown * 1000);
            const time = date.toLocaleTimeString(undefined, {
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: false
            });
            setTipText(translations(translation.request.resendAfter, {count: countdown, time}));
            return;
        }
        setCountdown(60)
        setIsCounting(true);
        const result = await retryCode(key)
        const code = result.info?.code
        if (code == 100025) {
            placeholder = translation.request.authCode
        }
        setTipText(formatR(translation.request.failed, result.info))
    }


    return (
        <>
            <form className={"login-form"}>
                <input type="text"
                       className="input"
                       name="code"
                       placeholder={placeholder}
                       value={code}
                       onChange={(e) => setCode(e.target.value)}
                />
                <p className="tip">{tipText}</p>
                <div className={"button-right"}>
                    <div style={{display: "flex"}}>
                        {placeholder != translation.request.authCode &&
                            <button type="button" className={"submit-button"}
                                    onClick={resendCode}>{translation.request.retry}</button>
                        }
                        <button type="submit" onClick={handleVerifyCode}
                                className={"submit-button"}>{translation.request.submit}</button>
                    </div>
                </div>
            </form>
        </>
    )
}