import React, {useEffect, useState, useContext} from 'react';
import languageSvg from "@@/assets/icons/language.svg"
import searchSvg from "@@/assets/icons/search.svg"
import {scrollToLocation, scrollToTop} from "@@/function/scrollToTop.ts";
import {Link} from "react-router-dom";
import {LanguageContext} from "@@/layout/system/language/LanguageContext.tsx";
import QuickMenu from "@@/layout/system/components/QuickMenu.tsx";

const TopBar: React.FC = () => {

    const threshold = 1200; // 设置滚动的阈值
    const [isScrolledPastThreshold, setIsScrolledPastThreshold] = useState(false);
    // 这里解构必须要加！否则编译器认为无法传递LanguageContext，但这个值是必须会传递的
    const {translations, setLanguage} = useContext(LanguageContext)!;

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = document.documentElement.scrollTop;
            setIsScrolledPastThreshold(scrollTop >= threshold);
        };
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [threshold]);

    function switchLanguage() {
        if (localStorage.getItem("language") === "en") setLanguage("cn");
        else setLanguage("en");
    }

    return (
        <>
            <div className="topBar">
                <div className={`space margin ${isScrolledPastThreshold ? 'scrolled' : ''}`}>
                    <Link to="home"><p className="barTitle" onClick={scrollToTop}>Crocus</p></Link>
                    <div className="rightItem">
                        <QuickMenu/>
                        <Link to="FAQ"><p className="barItems" onClick={scrollToTop}>{translations.topBar.FAQ}</p>
                        </Link>
                        <div onClick={switchLanguage}>
                            <svg height="20" width="20">
                                <image href={languageSvg} height="20" width="20"/>
                            </svg>
                        </div>
                        <a onClick={() => scrollToLocation("search-container")}>
                            <svg height="20" width="20">
                                <image href={searchSvg} height="20" width="20"/>
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
        </>
    );
};

export default TopBar;

