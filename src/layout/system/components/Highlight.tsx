import {Hlight} from "@@/ts/props.ts";

export const Highlight: React.FC<Hlight> = (props) => {
    return (
        <>
            {props.label &&
                `${props.label}:`
            }
            <span className="highlight">{props.text}</span>
        </>
    );
};