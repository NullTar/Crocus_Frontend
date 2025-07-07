import {useTranslation} from '@@/layout/system/language/useTranslation.tsx';
import {useEffect, useRef} from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import TextPlugin from 'gsap/TextPlugin';

gsap.registerPlugin(ScrollTrigger, TextPlugin)

export default function Tip() {
    const translations = useTranslation();

    const animation = useRef(null)
    const animationText = useRef(null)
    useEffect(() => {
        gsap.to(animation.current, {
            text: {value: translations.website.tipTwo},
            scrollTrigger: {
                trigger: animation.current,
                scrub: true,
                start: "-1600%",
                end: "-1000%"
            }
        });
        gsap.to(animationText.current, {
            opacity: 1,
            scrollTrigger: {
                trigger: animationText.current,
                scrub: true,
                start: "-460%",
                end: "-120%"
            }
        });
    }, [translations]);

    return (
        <>
            <div className="tipTwo">
                <p className="title" ref={animation}></p>
                <p className="info" ref={animationText}>{translations.website.storyInfo}</p>
            </div>
        </>
    );
}
