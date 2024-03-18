import '../styles/UnderBoardBttn.scss'
interface Props {
    text: string;
    onClick: () => void;
}

export const UnderBoardBttn = (props: Props) => {
    return <button className="underboard-button" onClick={props.onClick}>
        {props.text}
    </button>
}