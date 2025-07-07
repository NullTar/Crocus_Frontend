import {useTranslation} from '@@/layout/system/language/useTranslation.tsx';
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import {useEffect, useRef, useState} from "react";
import {getRecommendQuestions} from "@@/ts/request/question.ts";
import {questionRecommendKey} from "@@/function/localStorage.ts";
import {QuestionData} from "@@/ts/model.ts";
import {Pop} from "@@/layout/system/components/GlobalPop.tsx";

gsap.registerPlugin(ScrollTrigger);

export default function Container() {
    const translation = useTranslation();

    const elementRef = useRef(null);

    const [question, setQuestion] = useState<Array<QuestionData>>([]);
    const [currentQuestion, setCurrentQuestion] = useState<QuestionData | null>(null);
    const [showPopup, setShowPopup] = useState(false);

    const getQuestionList = async () => {
        const result = await getRecommendQuestions();
        if (result.data) {
            const newQuestion = result.data;
            setQuestion(newQuestion)
            localStorage.setItem(questionRecommendKey, JSON.stringify(newQuestion))
        }
    }
    useEffect(() => {
        const data = localStorage.getItem(questionRecommendKey)
        if (data) {
            setQuestion(JSON.parse(data))
        } else getQuestionList().finally()

        gsap.to(elementRef.current, {
            scale: 0.8,
            borderRadius: "2rem",
            scrollTrigger: {
                start: 'top',
                end: 'bottom',
                scrub: true,
            },
        });
    }, []);

    const handleQuestionDetail = (uuid: string) => {
        const find = question.find(q => q.uuid === uuid);
        if (find) {
            setCurrentQuestion(find);
            setShowPopup(true);
        }
    }

    const renderMultilineText = (text: string) => {
        return text.split('\n').map((line, index) => (
            <p key={index} style={{margin: 0, lineHeight: 1.8, letterSpacing: '0.08em'}}>{line}</p>
        ));
    };

    return (
        <>
            <div className="container" ref={elementRef}>
                <div className="margin">
                    <div className="televisionBorder">
                        <div className="television">
                            {Array.from({length: Math.ceil(question.length / 10)}, (_, groupIndex) => {
                                const group = question.slice(groupIndex * 10, groupIndex * 10 + 10);
                                return (
                                    <div
                                        key={`group-${groupIndex}`}
                                        style={{
                                            display: "flex",
                                            transform: 'translateX(100%)',
                                            animation: `scrollLeft 20s linear infinite`,
                                            animationDelay: `${Math.random() * 5}s`,
                                        }}
                                    >
                                        {group.map((q, i) => (
                                            <div key={i} className="question-txt"
                                                 onClick={() => handleQuestionDetail(q.uuid)}>
                                                {q.title}</div>
                                        ))}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                    <div className="televisionBar televisionBarF"></div>
                    <div className="televisionBar televisionBarS"></div>
                </div>
                <p>{translation.website.questions}</p>
            </div>
            {currentQuestion &&
                <Pop isOpen={showPopup} title={currentQuestion.title} onClose={() => setShowPopup(false)}>
                    <div className='pop-content' style={{width: '40vw', fontSize: "1.2rem", textIndent: "2em",
                        overflow: 'hidden'}}>
                        {renderMultilineText(currentQuestion.answer)}
                    </div>
                </Pop>
            }
        </>
    );
}
