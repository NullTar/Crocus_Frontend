import {useTranslation} from '@@/layout/system/language/useTranslation.tsx';
import React, {useEffect, useState, useRef} from 'react';
import {Link} from "react-router-dom";

const Foot: React.FC = () => {
    const translation = useTranslation();
    const [isBottomReached, setIsBottomReached] = useState(false);
    const textRef = useRef(null);

    useEffect(() => {
        const handleScroll = () => {
            const {scrollTop, clientHeight, scrollHeight} = document.documentElement;
            const isAtBottom = scrollTop + clientHeight >= scrollHeight;
            setIsBottomReached(isAtBottom);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleTextClass = isBottomReached ? 'text expanded' : 'text';

    const email: string = 'null.softwaredeveloper@outlook.com';
    const subject: string = 'Some Advice';
    const body: string = 'Don\'t write any private information';

    const handleClick = () => {
        window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    };

    return (
        <>
            <div id="foot" className="foot">
                <div className="content">
                    <div className="items">
                        <a href={translation.foot.reportLink}>{translation.foot.report}</a>
                        <a href={translation.foot.websiteLink}>{translation.foot.website}</a>
                        <a href={translation.foot.centerLink}>{translation.foot.center}</a>
                        <a href={translation.foot.pornLink}>{translation.foot.porn}</a>
                        <a href={translation.foot.reportChildPornLink}>{translation.foot.reportChildPorn}</a>
                    </div>
                    <div className="items">
                        <Link to="privacy">{translation.foot.privacy}</Link>
                        <a href="https://www.iconfont.cn/">{translation.foot.iconfont}</a>
                        <a href="https://lottiefiles.com/">{translation.foot.lottieFiles}</a>
                        <a href="https://www.jetbrains.com/lp/mono/">{translation.foot.jetBrains}</a>
                    </div>
                    <div className="items">
                        <a ref={textRef} className={`text ${handleTextClass}`}>{translation.foot.about}</a>
                        <a ref={textRef} onClick={handleClick} className={`text ${handleTextClass}`}
                        >{translation.foot.contact}</a>
                        <a className="advice">{translation.foot.advice}</a>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Foot;