import {useTranslation} from '@@/layout/system/language/useTranslation.tsx';
import {useEffect, useRef, useState} from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import refreshSvg from "@@/assets/icons/refresh.svg";
import {QuestionData} from "@@/ts/model.ts";
import {questionRecommendKey} from "@@/function/localStorage.ts";
import {Pop} from "@@/layout/system/components/GlobalPop.tsx";
import {renderMultilineText} from "@@/layout/system/components/renderMultilineText.tsx";

gsap.registerPlugin(ScrollTrigger)

export default function Questions() {
    const translations = useTranslation()
    const animation = useRef(null)
    const animationText = useRef(null)
    const [question, setQuestion] = useState<Array<QuestionData>>([]);
    const [currentQuestion, setCurrentQuestion] = useState<QuestionData | null>(null);
    const [showPopup, setShowPopup] = useState<boolean>(false);
    const [index, setIndex] = useState<number>(0);
    const data = localStorage.getItem(questionRecommendKey)

    useEffect(() => {
        gsap.to(animation.current, {
            y: -80,
            width: "240vw",
            scrollTrigger: {
                trigger: animation.current,
                scrub: true,
                start: "-810%",
                end: "-10%"
            }
        });
        gsap.to(animationText.current, {
            y: -90,
            scrollTrigger: {
                trigger: animationText.current,
                scrub: true,
                start: "-120%",
                end: "50%"
            }
        })
    }, []);

    useEffect(() => {
        if (data) {
            setQuestion(JSON.parse(data))
        }
    }, [data]);

    const handleQuestionDetail = (uuid: string) => {
        const find = question.find(q => q.uuid === uuid);
        if (find) {
            setCurrentQuestion(find);
            setShowPopup(true);
        }
    }


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
                            <div onClick={() => {
                                const newIndex = index + 10
                                if (newIndex >= question.length) {
                                    setIndex(0)
                                } else setIndex(newIndex)
                            }}>
                                <svg height="24" width="24">
                                    <image href={refreshSvg} height="24" width="24"/>
                                </svg>
                            </div>
                        </div>
                        <p className="refresh">{translations.question.info}</p>
                    </div>
                    <div className="list">
                        {question.slice(index, index + 10).map((q, i) => (
                            <p key={i} onClick={() => {
                                handleQuestionDetail(q.uuid)
                            }}>{q.title}</p>
                        ))}
                    </div>
                </div>
            </div>
            {currentQuestion &&
                <Pop isOpen={showPopup} title={currentQuestion.title} onClose={() => setShowPopup(false)}>
                    <div className='pop-content'
                         style={{width: '40vw', fontSize: "1.2rem", textIndent: "2em", overflow: 'hidden'}}>
                        {renderMultilineText(currentQuestion.answer)}
                    </div>
                </Pop>
            }
        </>
    );
}
