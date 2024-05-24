import { MatchEntity } from "types"

interface Props {
    record: MatchEntity
}

export const SingleElement = ({record}: Props) => {

    return <li>
        {record.winner}, {record.player1} - result: {record.player1Result}, {record.player2} - result: {record.player2Result}, {record.date}
    </li>
}