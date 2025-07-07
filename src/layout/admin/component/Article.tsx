import React from "react";

type Props = {
    title: string,
    context: string,
}

export const ListItem: React.FC<Props> = (props) => {

    return (
        <div className="list-item">
            <div>
                <p className='title'>
                    {props.title}
                </p>
                <li className='content'>
                    {props.context}
                </li>
            </div>
            <button className="button">Edit</button>
        </div>
    )
}


const listItems = [
    {
        img: "https://fastly.picsum.photos/id/116/3504/2336.jpg?hmac=C46vgpj3R407e8pCyy8NhIsNaBZCjb4r5d71keNgMJY",
        title: "如何通过反暴力教育帮助学生更好地应对冲突？",
        description: "从小培养孩子的情感管理能力和良好的沟通技巧，可以帮助孩子识别并避免暴力行为。通过角色扮演、情境模拟等活动，让孩子理解暴力的危害，并学会用非暴力的方式解决冲突。此外，父母和老师的榜样作用也非常重要。"
    },
    {
        img: "https://fastly.picsum.photos/id/129/4910/3252.jpg?hmac=g1KzJMIp75lG_scR48R1baC6TjhVmkEyygSyngKYRsg",
        title: "如何防止暴力行为在家庭中代际传递？",
        description: "代际传递是指暴力行为在家庭成员之间从上一代传递到下一代。为了打破这一恶性循环，家长需要通过教育改变暴力行为的处理方式，并学习健康的沟通和解决冲突的方法。同时，提供支持和干预的社会服务，如心理辅导、家庭治疗等，可以有效减少暴力行为的传递。"
    },
    {
        img: "https://fastly.picsum.photos/id/124/3504/2336.jpg?hmac=B1Avp6or9Df8vpnN4kQsGNfD66j8hH3gLtootCoTw4M",
        title: "为什么暴力事件在家庭中常常被忽视？",
        description: "暴力事件在家庭中常常被忽视，部分原因是社会对家庭隐私的过度保护以及缺乏有效的干预机制。一些家庭成员可能因害怕社会评价或家庭关系破裂而选择隐瞒暴力事件。同时，受害者可能缺乏应对暴力的认知和能力，导致事件未能及时暴露。"
    },
    {
        img: "https://fastly.picsum.photos/id/128/3823/2549.jpg?hmac=VbPyA2vESva2YdoXqll9REBcbQIskgv_c-D60C1s0xc",
        title: "如何让孩子从小接受反暴力教育？",
        description: "从小培养孩子的情感管理能力和良好的沟通技巧，可以帮助孩子识别并避免暴力行为。通过角色扮演、情境模拟等活动，让孩子理解暴力的危害，并学会用非暴力的方式解决冲突。此外，父母和老师的榜样作用也非常重要。"
    },
    {
        img: "https://fastly.picsum.photos/id/130/4000/3000.jpg?hmac=Jv7clTLK6rhY9r2LzJXfhIoVcKlTwhgL8N3uHVSHaXQ",
        title: "学校在防止校园暴力中应扮演怎样的角色？",
        description: "学校不仅是传授知识的场所，更是学生社会化的重要环境。通过建立明确的校园规则、开展反暴力主题教育、设立心理辅导机制，学校可以有效预防和应对校园暴力。同时，教师的关注与及时介入是防止暴力升级的关键。"
    },
    {
        img: "https://fastly.picsum.photos/id/131/3000/2000.jpg?hmac=0NQKjlfuY56cypLdXN3AaxT1q7Z9yI5R9Sm9zKBC3nI",
        title: "社交媒体对暴力的渲染会对青少年产生什么影响？",
        description: "社交媒体中频繁出现的暴力画面可能导致青少年对暴力行为的麻木，甚至模仿。在反暴力教育中，应引导青少年正确认识媒体内容，提升其批判性思维能力。家庭和学校应协助他们建立正确的价值观，避免被暴力信息误导。"
    },
];

export default function Article() {
    return (
        <div className="article">
            <ul className="list">
                {listItems.map((item, index) => (
                    <ListItem key={index} title={item.title} context={item.description} />
                ))}
            </ul>
        </div>
    )
}


