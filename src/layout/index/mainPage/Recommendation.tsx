import {useTranslation} from '@@/layout/system/language/useTranslation.tsx';
import React, {useEffect, useRef, useState} from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import refreshSvg from "@@/assets/icons/refresh.svg";

gsap.registerPlugin(ScrollTrigger)


const Book: React.FC = () => {
    return (
        <>
            <div className="margin" style={{display:"flex"}}>
                    <div className="book-card">
                        <img
                            src={"https://fastly.picsum.photos/id/30/1280/901.jpg?hmac=A_hpFyEavMBB7Dsmmp53kPXKmatwM05MUDatlWSgATE"}
                            alt={"书名"} className="book-cover"/>
                        <div className="book-info">
                            <h3 className="book-title">{"一间只属于自己的房间"}</h3>
                            <p className="book-author">By {"弗吉尼亚·伍尔夫"}</p>
                        </div>
                    </div>

                    <div className="book-card">
                        <img
                            src={"https://fastly.picsum.photos/id/25/5000/3333.jpg?hmac=yCz9LeSs-i72Ru0YvvpsoECnCTxZjzGde805gWrAHkM"}
                            alt={"书名"} className="book-cover"/>
                        <div className="book-info">
                            <h3 className="book-title">{"杀死一只知更鸟"}</h3>
                            <p className="book-author">By {"哈珀·李"}</p>
                        </div>
                    </div>
                    <div className="book-card">
                        <img
                            src={"https://fastly.picsum.photos/id/22/4434/3729.jpg?hmac=fjZdkSMZJNFgsoDh8Qo5zdA_nSGUAWvKLyyqmEt2xs0"}
                            alt={"书名"} className="book-cover"/>
                        <div className="book-info">
                            <h3 className="book-title">{"离开的，留下的"}</h3>
                            <p className="book-author">By {"埃莱娜·费兰特"}</p>
                        </div>
                    </div>
                <div className="book-card">
                    <img
                        src={"https://fastly.picsum.photos/id/11/2500/1667.jpg?hmac=xxjFJtAPgshYkysU_aqx2sZir-kIOjNR9vx0te7GycQ"}
                        alt={"书名"} className="book-cover"/>
                    <div className="book-info">
                        <h3 className="book-title">{"烦人的爱"}</h3>
                        <p className="book-author">By {"埃莱娜·费兰特"}</p>
                    </div>
                </div>

                <div className="book-card">
                    <img
                        src={"https://fastly.picsum.photos/id/95/2048/2048.jpg?hmac=rvEUpzQSeSWTzfsWTIytYnLieOx_Iaa6PfYOxVwEb1g"}
                        alt={"书名"} className="book-cover"/>
                    <div className="book-info">
                        <h3 className="book-title">{"布鲁克林有棵树"}</h3>
                        <p className="book-author">By {"贝蒂·史密斯"}</p>
                    </div>
                </div>
                <div className="book-card">
                    <img
                        src={"https://fastly.picsum.photos/id/103/2592/1936.jpg?hmac=aC1FT3vX9bCVMIT-KXjHLhP6vImAcsyGCH49vVkAjPQ"}
                        alt={"书名"} className="book-cover"/>
                    <div className="book-info">
                        <h3 className="book-title">{"10岁，男孩关键期"}</h3>
                        <p className="book-author">By {"松永畅史"}</p>
                    </div>
                </div>
            </div>
        </>
    )
}
const Article: React.FC = () => {
    return (
        <>
            <div className="margin">
                <div className="list-item">
                    <div className="image-container">
                        <img
                            src={"https://fastly.picsum.photos/id/116/3504/2336.jpg?hmac=C46vgpj3R407e8pCyy8NhIsNaBZCjb4r5d71keNgMJY"}
                            alt={'title'} className="list-item-image"/>
                    </div>
                    <div className="content-container">
                        <h3 className="list-item-title">{"如何通过反暴力教育帮助学生更好地应对冲突？"}</h3>
                        <p className="list-item-description">{"从小培养孩子的情感管理能力和良好的沟通技巧，可以帮助孩子识别并避免暴力行为。通过角色扮演、情境模拟等活动，让孩子理解暴力的危害，并学会用非暴力的方式解决冲突。此外，父母和老师的榜样作用也非常重要。"}</p>
                    </div>
                </div>
                <div className="list-item">
                    <div className="image-container">
                        <img
                            src={"https://fastly.picsum.photos/id/129/4910/3252.jpg?hmac=g1KzJMIp75lG_scR48R1baC6TjhVmkEyygSyngKYRsg"}
                            alt={'title'} className="list-item-image"/>
                    </div>
                    <div className="content-container">
                        <h3 className="list-item-title">{"如何防止暴力行为在家庭中代际传递？"}</h3>
                        <p className="list-item-description">{"代际传递是指暴力行为在家庭成员之间从上一代传递到下一代。为了打破这一恶性循环，家长需要通过教育改变暴力行为的处理方式，并学习健康的沟通和解决冲突的方法。同时，提供支持和干预的社会服务，如心理辅导、家庭治疗等，可以有效减少暴力行为的传递。"}</p>
                    </div>
                </div>
                <div className="list-item">
                    <div className="image-container">
                        <img
                            src={"https://fastly.picsum.photos/id/124/3504/2336.jpg?hmac=B1Avp6or9Df8vpnN4kQsGNfD66j8hH3gLtootCoTw4M"}
                            alt={'title'} className="list-item-image"/>
                    </div>
                    <div className="content-container">
                        <h3 className="list-item-title">{"为什么暴力事件在家庭中常常被忽视？"}</h3>
                        <p className="list-item-description">{"暴力事件在家庭中常常被忽视，部分原因是社会对家庭隐私的过度保护以及缺乏有效的干预机制。一些家庭成员可能因害怕社会评价或家庭关系破裂而选择隐瞒暴力事件。同时，受害者可能缺乏应对暴力的认知和能力，导致事件未能及时暴露。"}</p>
                    </div>
                </div>
                <div className="list-item">
                    <div className="image-container">
                        <img
                            src={"https://fastly.picsum.photos/id/128/3823/2549.jpg?hmac=VbPyA2vESva2YdoXqll9REBcbQIskgv_c-D60C1s0xc"}
                            alt={'title'} className="list-item-image"/>
                    </div>
                    <div className="content-container">
                        <h3 className="list-item-title">{"如何让孩子从小接受反暴力教育？"}</h3>
                        <p className="list-item-description">{"从小培养孩子的情感管理能力和良好的沟通技巧，可以帮助孩子识别并避免暴力行为。通过角色扮演、情境模拟等活动，让孩子理解暴力的危害，并学会用非暴力的方式解决冲突。此外，父母和老师的榜样作用也非常重要。"}</p>
                    </div>
                </div>
            </div>

        </>
    )
}


export default function Recommendation() {
    const translations = useTranslation()
    const [selected, setSelected] = useState('BOOKS');

    const handleClick = (item: 'BOOKS' | 'ARTICLES') => {
        setSelected(item);
    };

    const animation = useRef(null)
    useEffect(() => {
        gsap.to(animation.current, {
            y: -200,
            opacity: 1,
            scrollTrigger: {
                trigger: animation.current,
                scrub: true,
                start: "-120%",
                end: "-20%"
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
                        <div>
                            <svg height="24" width="24">
                                <image href={refreshSvg} height="24" width="24"/>
                            </svg>
                        </div>
                    </div>
                    {selected === 'BOOKS' ? <Book/> : <Article/>}
                </div>
            </div>
        </>
    );
}
