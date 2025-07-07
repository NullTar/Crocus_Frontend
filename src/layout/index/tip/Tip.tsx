import {useTranslation} from '@@/layout/system/language/useTranslation.tsx';
import {useEffect, useRef} from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger)

export default function Tip() {
    const animation = useRef(null)
    const translations = useTranslation()
    useEffect(() => {
        gsap.to(animation.current, {
            scale:8,
            scrollTrigger:{
                scrub:true,
                start:"top",
                end:"bottom"
            }
        })
    }, []);

    return (
        <>
             <div className="tip" ref={animation}>
                <p>{translations.website.tip}</p>
            </div>
        </>
    );
}
