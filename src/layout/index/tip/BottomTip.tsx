import {useEffect, useRef} from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger)

export default function BottomTip() {

    const animation = useRef(null)

    useEffect(() => {
        gsap.to(animation.current, {
            scale: 1.1,
            y: -90,
            scrollTrigger: {
                trigger: animation.current,
                scrub: true,
                start: "-120%",
                end: "10%"
            }
        })
    }, []);
    return (
        <>
            <div className="bottom-tip" ref={animation}>
                <p>Its bottom tips</p>
            </div>
        </>
    );
}
