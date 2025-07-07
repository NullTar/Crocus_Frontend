import React, {useEffect, useState} from 'react';
import "@@/css/i-globalPop.css"
import {ModalProps} from "@@/ts/props.ts";

export const Pop: React.FC<ModalProps> = ({isOpen, title, children, onClose}) => {
    const [isModalOpen, setIsModalOpen] = useState(isOpen);
    useEffect(() => {
        setIsModalOpen(isOpen);
    }, [isOpen]);

    // 如果没有打开，不渲染任何内容
    if (!isModalOpen) return null;
    const handleClose = () => {
        setIsModalOpen(false);
        onClose()
    };

    return (
        <div className="pop-container">
            <div className={"pop-window"}>
                <div style={{padding: "0.8rem"}}>
                    <div className="pop-header">
                        <h3 className="pop-title">{title}</h3>
                        <button onClick={handleClose} className="close-button">&times;</button>
                    </div>
                    <div>{children}</div>
                </div>
            </div>
        </div>
    );
};
