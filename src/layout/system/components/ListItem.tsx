import {ListContent} from "@@/ts/props.ts";

export const ListItem: React.FC<ListContent> = (props) => {
    return (
        <div className="list-item">
            <div>
                <p className='title'>
                    {props.title}
                </p>
                <li className='content'>
                    {props.context}
                </li>
                <li className="content">
                    {props.subContent}
                </li>
            </div>
            <button className="button">Edit</button>
        </div>
    )
}