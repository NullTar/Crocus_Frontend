import Tip from "@@/layout/index/tip/Tip.tsx";
import Container from "@@/layout/index/main/Containner.tsx";
import Tips from "@@/layout/index/tip/Tips.tsx";
import Search from "@@/layout/index/main/Search.tsx";
import Questions from "@@/layout/index/main/Questions.tsx";
import Recommendation from "@@/layout/index/main/recommend/Recommendation.tsx";
import TipTwo from "@@/layout/index/tip/TipTwo.tsx";
import Story from "@@/layout/index/main/Story.tsx";
import BottomTip from "@@/layout/index/tip/BottomTip.tsx";
import {useLocation} from "react-router-dom";
import {useEffect, useState} from "react";
import {getPayloadData} from "@@/function/jwt.ts";
import {authUrlKey, bindAuthKey, checkToken} from "@@/function/localStorage.ts";
import {checkOrBindAuth} from "@@/ts/request/authority.ts";
import {Pop} from "@@/layout/system/components/GlobalPop.tsx";
import {useTranslation} from "@@/layout/system/language/useTranslation.tsx";
import {BindAuth} from "@@/layout/system/components/BindAuth.tsx";
import {Authority_Api} from "@@/ts/api.ts";


export default function Home() {
    const location = useLocation();
    const [showTips, setShowTips] = useState(false)
    const translations = useTranslation()

    useEffect(() => {
        const hash = location.hash;
        if (hash) {
            const elementId = hash.slice(1);
            const element = document.getElementById(elementId);
            if (element) {
                element.scrollIntoView({behavior: 'smooth'});
            }
        }
    }, [location]);

    useEffect(() => {
        const handleCheckAuth = async () => {
            if (!checkToken()) return
            else {
                if (localStorage.getItem(bindAuthKey) == undefined) {
                    const jwt = getPayloadData()
                    if (jwt && jwt.uuid.length > 0) {
                        const result = await checkOrBindAuth(Authority_Api.checkAuth)
                        if (result.info?.code == 10027) setShowTips(true)
                    }
                }
            }
        }
        handleCheckAuth().finally()
    }, []);

    const onClosePop = (result: boolean) => {
        if (result) {
            setShowTips(false)
        }
    }

    return (
        <>
            <Tip/>
            <Container/>
            <Tips/>
            <Search/>
            <Questions/>
            <Recommendation/>
            <TipTwo/>
            <Story/>
            <BottomTip/>
            <Pop isOpen={showTips} title={translations.request.verify}
                 onClose={() => {
                     localStorage.setItem(bindAuthKey, "skip")
                     localStorage.removeItem(authUrlKey)
                     setShowTips(false)
                 }}>
                <BindAuth onClose={onClosePop}/>
            </Pop>
        </>
    )
}