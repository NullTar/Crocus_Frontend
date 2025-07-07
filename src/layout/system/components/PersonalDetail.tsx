import React, {useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {Member, Verification} from "@@/ts/model.ts";
import {bindAuthKey, checkToken, tokenKey} from "@@/function/localStorage.ts";
import {getPayloadData} from "@@/function/jwt.ts";
import {Pop} from "@@/layout/system/components/GlobalPop.tsx";
import {useTranslation} from "@@/layout/system/language/useTranslation.tsx";
import {unBindAuth} from "@@/ts/request/authority.ts";
import {formatR} from "@@/function/response.ts";

const PersonalDetail: React.FC = () => {
    const [profile, setProfile] = useState<Member | null>(null)
    const navigate = useNavigate();
    const translation = useTranslation();
    const [showUnsetFormPop, setShowUnsetFormPop] = useState(false);
    const [inputError, setInputError] = useState('');

    const [inputPassword, setInputPassword] = useState<string>('');
    const [inputCode, setInputCode] = useState<string>('');

    useEffect(() => {
        if (!checkToken()) {
            navigate('/login')
        }
        const data = getPayloadData()
        if (data && data.uuid.length > 0) {
            setProfile(data)
        }
    }, []);

    const handleUnsetAuthSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (inputPassword.length < 8 && inputCode.length < 6) {
            setInputError(translation.error.please_input);
            return
        }
        const unsetFormData: Verification = {
            password: inputPassword,
            code: inputCode,
        }
        const result = await unBindAuth(unsetFormData)
        setInputCode(formatR(result.info))
        if (result.info?.code == 10028) {
            setShowUnsetFormPop(false)
            localStorage.setItem(tokenKey, JSON.stringify(result.data))
            localStorage.removeItem(bindAuthKey)
        }
    }

    return (
        <>
            <div className='article-preview-default'></div>
            <div className="profile-container">

                <h2>个人信息详情</h2>
                {profile &&
                    <div style={{lineHeight: 1.8}}>
                        <p><strong>账号：</strong>{profile.account}</p>
                        <p><strong>邮箱：</strong>{profile.email}</p>
                        <p><strong>年龄：</strong>{profile.age}</p>
                        <p><strong>性别：</strong>{profile.gender}</p>
                        <p><strong>创建时间：</strong>{profile.createTime}</p>
                        {profile.modifyTime &&
                            <p><strong>修改时间：</strong>{profile.modifyTime}</p>
                        }
                        <p><strong>最后登录时间：</strong>{profile.lastLoginTime}</p>
                    </div>
                }
                {/*修改资料 用户名、年龄、性别*/}
                <button className="button detail-button"
                >修改资料
                </button>
                <button className="button detail-button"
                >修改密码
                </button>
                <button className="button detail-button"
                >修改邮箱
                </button>
                {localStorage.getItem(bindAuthKey)?.toLowerCase() == 'yes' &&
                    <button className="button detail-button"
                            onClick={() => setShowUnsetFormPop(true)}>
                        解绑 2FA
                    </button>
                }
                <button className="button detail-button"
                >注销账号
                </button>
            </div>

            <Pop isOpen={showUnsetFormPop}
                 title='解除 2FA 绑定'
                 onClose={() => setShowUnsetFormPop(false)
                 }>
                <form onSubmit={handleUnsetAuthSubmit} style={{width: "32vw"}}>
                    <input type="password"
                           name="password"
                           className="input"
                           placeholder={translation.login.password}
                           value={inputPassword}
                           onChange={e => setInputPassword(e.target.value)}
                    />
                    <input type="text"
                           className="input"
                           name="code"
                           placeholder={translation.request.authCode}
                           value={inputCode}
                           onChange={e => setInputCode(e.target.value)}
                    />
                    {inputError && <p className="tip-error">{inputError}</p>}
                    <div style={{display: "flex"}}>
                        <button type='submit' className="button"
                                style={{marginLeft: "auto", marginTop: "2rem"}}>提交
                        </button>
                    </div>
                </form>
            </Pop>
        </>

    )
}

export default PersonalDetail;
