import {useTranslation} from '@@/layout/system/language/useTranslation.tsx';
import {useEffect, useRef} from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import refreshSvg from "@@/assets/icons/refresh.svg";

gsap.registerPlugin(ScrollTrigger)

export default function Questions() {
    const translations = useTranslation()
    const animation = useRef(null)
    const animationText = useRef(null)
    const violenceQuestions = [
        "家庭暴力的常见表现有哪些？如何识别早期信号？",
        "学校应如何建立有效机制防止校园欺凌？",
        "当遇到网络暴力时，青少年应如何保护自己？",
        "为什么很多受害者在暴力面前选择沉默？我们可以如何鼓励他们发声？",
        "儿童遭受家庭暴力时，学校和社区可以提供哪些帮助？",
        "暴力行为背后的心理成因有哪些？教育中应如何引导？",
        "如何帮助孩子建立自我保护意识和应对暴力的能力？",
        "反暴力教育应从哪个年龄段开始介入比较合适？",
        "朋友遭遇家庭暴力时，我们应该如何给予支持？",
        "法律在防止和干预暴力行为中发挥怎样的作用？普通人如何依法维权？"
    ];

    useEffect(() => {
        gsap.to(animation.current, {
            y:-80,
            width:"240vw",
            scrollTrigger:{
                trigger:animation.current,
                scrub:true,
                start:"-110%",
                end:"-30%"
            }
        });
        gsap.to(animationText.current, {
            y:-90,
            scrollTrigger:{
                trigger:animationText.current,
                scrub:true,
                start:"-120%",
                end:"50%"
            }
        })

    }, []);

    return (
        <>
            <div id="question" className="questions">
                <div className="margin" ref={animationText}>
                    <p className="to-left">{translations.website.questionLeft}</p>
                    <p className="to-left gradient">{translations.website.questionRight}</p>
                </div>
                <div className='content' ref={animation}>
                    <div className="top">
                        <div className="flex">
                            <p className="questions-bar">{translations.question.QUESTIONS}</p>
                            <div>
                                <svg height="24" width="24" >
                                    <image href={refreshSvg} height="24" width="24"/>
                                </svg>
                            </div>
                        </div>
                        <p className="refresh">{translations.question.info}</p>
                    </div>
                    <div className="list">
                        {violenceQuestions.map((question, index) => (
                            <p key={index}>{question}</p>
                        ))}
                    </div>
                </div>
            </div>

        </>
    );
}
