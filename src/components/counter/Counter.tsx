interface Props {
    numOfChars: number
}

export const Counter = (props: Props) => {
    return <div style={{marginLeft: "5px"}}>{props.numOfChars}/20</div>
}