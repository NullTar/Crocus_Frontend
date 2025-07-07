import '@@/css/i-index.css'
import React, {useEffect, useState} from "react";
import {LanguageProvider} from "@@/layout/system/language/LanguageProvider.tsx";
import {useTranslation} from '@@/layout/system/language/useTranslation.tsx';

import {DotLottiePlayer} from '@dotlottie/react-player';
import '@dotlottie/react-player/dist/index.css'
import {loadingKey} from "@@/function/localStorage.ts";
import {WithLoadingProps} from "@@/ts/props.ts";

// 创建一个自定义的包裹组件来管理加载状态
export default function WithLoading({children}: WithLoadingProps) {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const savedLoading = localStorage.getItem(loadingKey);
        if (savedLoading === "Yes") {
            setIsLoading(false);
        } else {
            const timer = setTimeout(() => {
                setIsLoading(false);
                localStorage.setItem(loadingKey, "Yes")
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, []);

    return isLoading ? <LanguageProvider><Loading/></LanguageProvider> : children;
}


const Loading: React.FC = () => {
    const translations = useTranslation();
    /**
     *     src 可选
     *     src/assets/lottie/loading.lottie
     *     src/assets/lottie/loading-o.lottie
     */
    return (
        <>
            <div className="loading">
                <div className="animation">
                    <DotLottiePlayer
                        src="src/assets/lottie/loading.lottie"
                        autoplay
                        loop>
                    </DotLottiePlayer>
                </div>
                <p>{translations.loading}</p>
            </div>
        </>
    );
}
