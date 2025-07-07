import {useTranslation} from '@@/layout/system/language/useTranslation.tsx';
import {useEffect, useRef, useState} from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import refreshSvg from "@@/assets/icons/refresh.svg";
import {Article} from "@@/layout/index/main/recommend/Article.tsx";
import {Book} from "@@/layout/index/main/recommend/Book.tsx";

gsap.registerPlugin(ScrollTrigger)

export default function Recommendation() {
    const translations = useTranslation()
    const [selected, setSelected] = useState('BOOKS');
    const [bookIndex, setBookIndex] = useState<number>(0);
    const [articleIndex, setArticleIndex] = useState<number>(0);

    const handleClick = (item: 'BOOKS' | 'ARTICLES') => {
        setSelected(item);
    };

    const handleIndexChange = () => {
        switch (selected) {
            case 'BOOKS':
                setBookIndex(bookIndex + 4);
                break
            case 'ARTICLES':
                setArticleIndex(articleIndex + 5);
                break;
        }
    }

    const animation = useRef(null)
    useEffect(() => {
        gsap.to(animation.current, {
            y: -200,
            opacity: 1,
            scrollTrigger: {
                trigger: animation.current,
                scrub: true,
                start: "-80%",
                end: "0%"
            }
        });
    }, []);

    return (
        <>
            <div id="recommendation" className="recommendation" ref={animation}>
                <p className={"tip"}>{translations.website.bookArticle}</p>
                <div className="recommendation-header">
                    <div className="top">
                        <div className="title">
                            <p onClick={() => handleClick('BOOKS')}
                               className={selected === 'BOOKS' ? 'choose' : ''}
                            > {translations.recommendation.BOOKS}</p>
                            <p onClick={() => handleClick('ARTICLES')}
                               className={`article ${selected === 'ARTICLES' ? 'choose' : ''}`}
                            >{translations.recommendation.ARTICLES}</p>
                        </div>
                        <div onClick={handleIndexChange}>
                            <svg height="24" width="24">
                                <image href={refreshSvg} height="24" width="24"/>
                            </svg>
                        </div>
                    </div>
                    {selected === 'BOOKS' ?
                        <Book bookIndex={bookIndex} onIndexInvalid={() => setBookIndex(0)}/> :
                        <Article articleIndex={articleIndex} onIndexInvalid={() => setArticleIndex(0)}/>}
                </div>
            </div>
        </>
    );
}
