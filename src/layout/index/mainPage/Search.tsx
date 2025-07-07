import {useTranslation} from '@@/layout/system/language/useTranslation.tsx';
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger)

export default function Search() {

    const translations = useTranslation();

    return (
        <>
            <div className="search-container" id="search-container">
                <div className="search">
                    <input
                        type="text"
                        className="search-input"
                        placeholder={translations.search.placeholder}
                    />
                    <div>
                        <button className="subButton">
                            {translations.search.button}
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}