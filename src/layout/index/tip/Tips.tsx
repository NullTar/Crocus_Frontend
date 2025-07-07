import {useTranslation} from '@@/layout/system/language/useTranslation.tsx';
import {useEffect, useRef} from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Tips() {
    const translate = useTranslation();
    const animation = useRef(null)

    useEffect(() => {
        gsap.to(animation.current, {
            scale:1.1,
            y:120,
            scrollTrigger:{
                trigger:animation.current,
                scrub:true,
                start:"-120%",
                end:"-20%"
            }
        })
    }, []);
    return (
        <>
             <div className="tips" ref={animation}>
                <p>{translate.website.tips}</p>
            </div>
        </>
    );
}
