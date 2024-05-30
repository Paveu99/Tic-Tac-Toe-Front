import '../styles/UnderBoardBttn.scss'
import {FormEvent} from "react";
interface Props {
    text: string;
    onClick?: (e: FormEvent) => void;
    type?: "submit" | "reset" | "button" | undefined;
    disabled?: boolean;
}

export const UnderBoardBttn = (props: Props) => {

    return <button className="underboard-button" onClick={props.onClick} type={props.type} disabled={props.disabled}>
        {props.text}
    </button>
}