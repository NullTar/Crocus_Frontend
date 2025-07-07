import "@@/css/i-index.css"
import React, {useEffect, useState} from 'react';
import {useTranslation} from '@@/layout/system/language/useTranslation.tsx';
import {useNavigate} from 'react-router-dom';
import {userLogin, userRegister, validateAccountOrEmail} from "@@/ts/request/user.ts";
import {Pop} from "@@/layout/system/components/GlobalPop.tsx";
import {Operation, R, UserLoginFormData, UserRegisterFormData} from "@@/ts/model.ts";
import {VerifyCode} from "@@/layout/system/components/VerifyCode.tsx";
import {bindAuthKey, loginFormKey, loginKey, registerFormKey} from "@@/function/localStorage.ts";
import {isSpecificEmail} from "@@/function/regex.ts";
import {formatR} from "@@/function/response.ts";


function Login() {

    const regex = /^[a-zA-Z0-9._%+-@-]+$/;
    const translations = useTranslation();
    const navigate = useNavigate();
    const [showCreate, setShowCreate] = useState<boolean>(
        () => localStorage.getItem(loginKey) === "true"
    );
    const [loginText, setLoginText] = useState<string>();
    const [signText, setSignText] = useState<string>();
    const [tipText, setTipText] = useState<string>();
    const [codeText, setCodeText] = useState(translations.request.verifyCode);
    const [inputError, setInputError] = useState(translations.error.keyWordError);
    const [queryInfo, setQueryInfo] = useState<R<null>>();
    const [verifyPop, setVerifyPop] = useState(false);
    const [loginFormData, setLoginFormData] = useState<UserLoginFormData>(
        localStorage.getItem(loginFormKey) ? JSON.parse(localStorage.getItem(loginFormKey)!)
            : {account: '', email: '', password: '', operation: Operation.Login}
    );
    const [registerFormData, setRegisterFormData] = useState<UserRegisterFormData>(
        localStorage.getItem(registerFormKey) ? JSON.parse(localStorage.getItem(registerFormKey)!)
            : {account: '', email: '', password: '', createPassword: '', operation: Operation.Register,});

    useEffect(() => {
        if (showCreate) {
            setLoginText(translations.register.create);
            setSignText(translations.register.sign);
            setTipText(translations.register.tip);
        } else {
            setLoginText(translations.login.login);
            setSignText(translations.login.sign);
            setTipText(translations.login.tip);
        }
    }, [showCreate, translations]);

    const handleChangeClick = () => {
        const newShowCreate = !showCreate;
        setInputError(translations.error.please_input);
        setShowCreate(newShowCreate);
        setSignText(newShowCreate ? translations.register.sign : translations.login.sign);
        setLoginText(newShowCreate ? translations.register.create : translations.login.login);
        setTipText(newShowCreate ? translations.register.tip : translations.login.tip);
        setRegisterFormData(prev => ({
            ...prev,
            createPassword: '',
            operation: newShowCreate ? Operation.Register : Operation.Login,
        }));
        localStorage.setItem(loginKey, String(newShowCreate));
    };


    useEffect(() => {
        if (showCreate) {
            const register = registerFormData;
            if (register.account.length < 8) {
                setInputError(translations.error.accountError);
            } else if (register.password.length < 8) {
                setInputError(translations.error.passwordError);
            } else if (register.account === register.password && register.account.length > 0) {
                setInputError(translations.error.equalError);
            } else if (register.email.length === 0 || !isSpecificEmail(register.email)) {
                setInputError(translations.error.email_error);
            } else if (register.password !== register.createPassword) {
                setInputError(translations.error.unequalError);
            } else {
                setInputError('');
            }
        } else {
            const login = loginFormData;
            if (login.account.length === 0 && login.password.length === 0) {
                setInputError(translations.error.length_error);
            } else if (login.account.length < 8) {
                setInputError(translations.error.accountError);
            } else if (login.password.length < 8) {
                setInputError(translations.error.passwordError);
            } else {
                setInputError('');
            }
        }
    }, [registerFormData, translations, loginFormData, translations]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>, type: Operation.Login | Operation.Register) => {
        const name = e.target.name
        let value = e.target.value
        if (value.length != 0) {
            if (!regex.test(value)) {
                setInputError(translations.error.characterError);
                value = ''
            }
        }
        if (type == Operation.Register) {
            setRegisterFormData(prev => {
                const updated = {
                    ...prev,
                    [name]: value
                };
                localStorage.setItem(registerFormKey, JSON.stringify(updated));
                return updated;
            });
        }
        if (type == Operation.Login) {
            setLoginFormData(prev => {
                const updated = {
                    ...prev,
                    [name]: value
                };
                localStorage.setItem(loginFormKey, JSON.stringify(updated));
                return updated;
            });
        }
    };

    const registerCheckAccount = async (name: string, value: string): Promise<R<null> | undefined> => {
        if (!value) return;
        if (registerFormData.account.length < 8 ||
            !isSpecificEmail(registerFormData.email)) {
            setInputError(translations.error.requestError);
            return;
        }
        if (showCreate) {
            const response = await validateAccountOrEmail(name, value);
            setQueryInfo(response);
            return response;
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (showCreate && registerFormData.password.length < 8) {
            setInputError(translations.error.please_input);
            return
        }
        if (!showCreate && loginFormData.password.length < 8) {
            setInputError(translations.error.please_input);
            return
        }
        let response: R<null>;
        setInputError(translations.request.wait);
        if (showCreate) {
            const checkAccount = await registerCheckAccount("account", registerFormData.account)
            const checkEmail = await registerCheckAccount("email", registerFormData.account)
            if (checkAccount?.info && checkAccount.info.code !== 10015) {
                setInputError(formatR(translations.request.failed, checkAccount.info));
                return;
            }
            if (checkEmail?.info && checkEmail.info.code !== 10015) {
                setInputError(formatR(translations.request.failed, checkEmail.info));
                return;
            }
            response = await userRegister(registerFormData);
        } else {
            localStorage.removeItem(bindAuthKey);
            const postData = loginFormData
            if (isSpecificEmail(loginFormData.account)) {
                postData.email = loginFormData.account
                postData.account = ''
            }
            response = await userLogin(postData);
        }
        setInputError('');
        if (response.info?.code === 10020 || response.info?.code === 10022) {
            setCodeText(translations.request.verifyCode);
            setVerifyPop(true);
        } else if (response.info?.code === 100025) {
            setCodeText(translations.request.authCode);
            localStorage.setItem(bindAuthKey, 'yes');
            setVerifyPop(true);
        } else {
            setInputError(formatR(translations.request.failed, response.info));
        }
    };

    const handleVerifyResult = (result: boolean) => {
        setVerifyPop(false);
        if (showCreate && result) {
            localStorage.removeItem(registerFormKey);
            handleChangeClick();
            window.location.reload();
        } else if (result) {
            localStorage.removeItem(loginFormKey);
            navigate('/home');
        }
    };

    return (
        <div className='login'>
            <p className="title">{loginText}</p>
            <form onSubmit={handleSubmit} className="login-form">
                {showCreate && <>
                    <input type="text"
                           className="input"
                           name="account"
                           placeholder={translations.login.account}
                           value={registerFormData.account}
                           onChange={e => handleChange(e, Operation.Register)}
                    />
                    <input type="text"
                           className="input"
                           name="email"
                           placeholder={translations.login.email}
                           value={registerFormData.email}
                           onChange={e => handleChange(e, Operation.Register)}
                    />
                    <input type="password"
                           name="password"
                           className="input"
                           placeholder={translations.login.password}
                           value={registerFormData.password}
                           onChange={e => handleChange(e, Operation.Register)}
                    />
                    <input type="password"
                           name="createPassword"
                           className="input"
                           placeholder={translations.login.password}
                           value={registerFormData.createPassword}
                           onChange={e => handleChange(e, Operation.Register)}
                    />
                </>}
                {!showCreate && <>
                    <input type="text"
                           className="input"
                           name="account"
                           placeholder={translations.login.accountOrEmail}
                           value={loginFormData.account}
                           onChange={e => handleChange(e, Operation.Login)}
                    />
                    <input type="password"
                           name="password"
                           className="input"
                           placeholder={translations.login.password}
                           value={loginFormData.password}
                           onChange={e => handleChange(e, Operation.Login)}
                    />
                </>
                }
                <div className={"form-tips"}>
                    {queryInfo?.info && <p className="tip-error coloured">
                        {formatR(translations.request.failed, queryInfo.info)}
                    </p>}
                    {inputError && <p className="tip-error">{inputError}</p>}
                </div>
                <button type='submit' className="button">
                    {signText}
                </button>
            </form>

            <div className="buttom">
                <div className="info">
                    <p className="tip">{tipText}</p>
                    <p className="create"
                       onClick={handleChangeClick}>
                        {!showCreate ? translations.login.create : translations.login.login}
                    </p>
                </div>
            </div>

            <div className="back">
                <p className="info">{translations.login.back}</p>
                <a className="title" href="/home">{translations.website.title}</a>
            </div>

            <Pop isOpen={verifyPop} title={translations.request.verify} onClose={
                () => setVerifyPop(false)
            }>
                <VerifyCode
                    operation={showCreate ? registerFormData.operation : loginFormData.operation}
                    placeholder={codeText}
                    value={showCreate ? registerFormData : loginFormData as UserRegisterFormData}
                    onVerify={handleVerifyResult}/>
            </Pop>

        </div>
    );
}

export default Login;
