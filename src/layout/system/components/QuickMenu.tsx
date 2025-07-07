import {useState, useEffect} from 'react';
import {useTranslation} from "@@/layout/system/language/useTranslation.tsx";
import {scrollToLocation, scrollToTop} from "@@/function/scrollToTop.ts";
import {Link} from "react-router-dom";
import {getPayloadData} from "@@/function/jwt.ts";
import {authUrlKey, bindAuthKey, loginKey, tokenKey} from "@@/function/localStorage.ts";

const HoverMenu = () => {
    const [isHovered, setIsHovered] = useState(false);
    const translations = useTranslation()
    const [showLogin, setShowLogin] = useState<boolean>()

    useEffect(() => {
        const checkJwt = () => {
            const uuid = getPayloadData()?.uuid || ''
            const bindOrNot = localStorage.getItem(bindAuthKey) ?? ""
            if (uuid.length <= 0 && bindOrNot.length <= 0) {
                localStorage.setItem(loginKey, "false")
                setShowLogin(true)
                return
            }
            setShowLogin(false)
        }
        checkJwt()
    }, [isHovered]);

    const handleLogOut = () => {
        localStorage.removeItem(tokenKey)
        localStorage.removeItem(bindAuthKey)
        localStorage.removeItem(authUrlKey)
        setShowLogin(true)
    }


    return (
        <div
            className="menu-container   "
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="menu-trigger barItems quick "
                 style={{paddingRight: "0"}}
            >{translations.quick}</div>
            <div className={`menu ${isHovered ? 'show' : ''}`}>
                <ul>
                    <li>
                        <Link to="/help">
                        <span onClick={scrollToTop}>
                            {translations.topBar.help}
                        </span>
                        </Link>
                    </li>
                    {showLogin &&
                        <li>
                            <Link to="/login">
                                {translations.login.login}
                            </Link>
                        </li>
                    }
                    {!showLogin &&
                        <li>
                            <Link to="/profile">
                                {translations.profile.personal}
                            </Link>
                        </li>
                    }
                    <li>
                        <a onClick={() => scrollToLocation("recommendation")}>
                            {translations.recommendation.topBar}
                        </a>
                    </li>
                    <li>
                        <a onClick={() => scrollToLocation("question")}>
                            {translations.question.topBar}
                        </a>
                    </li>
                    <li>
                        <a onClick={() => scrollToLocation("foot")}>
                            {translations.foot.support}
                        </a>
                    </li>
                    {!showLogin &&
                        <li onClick={handleLogOut}>{translations.profile.quit}</li>
                    }
                </ul>
            </div>
        </div>
    );
};

export default HoverMenu;
