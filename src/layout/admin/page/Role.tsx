import React from "react";

import hidden from '@@/assets/icons/hidden.svg'

type cardInfo = {
    avatar:string,
    questionNumber:number
}

const Card: React.FC<cardInfo> = (cardInfo) => {

    return (
        <div className="card">
            <img className="cardImg" src={cardInfo.avatar} alt={(cardInfo.questionNumber).toString()} />
            <p className="cardInfo">{cardInfo.questionNumber}</p>
        </div>
    )
}

const cardInfo ={
    avatar:"png",
    questionNumber:4,
}

export default function Role() {

    return (
        <div className="user-page">
            <div className="fContent">
                <Card avatar={hidden} questionNumber={cardInfo.questionNumber}/>
            </div>
            <div className="SContent">
                <Card avatar={hidden} questionNumber={cardInfo.questionNumber}/>
            </div>
        </div>
    )

}