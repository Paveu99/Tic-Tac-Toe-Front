import { MatchEntity } from "types"
import "../styles/LeaderboardPage.scss"

interface Props {
    record: MatchEntity
    index: number
}

export const SingleElement = ({record, index}: Props) => {

    return <div className="single-record">
        <div className="single-record__left">
            {index}.
        </div>
        <div className="single-record__right">
            {record.winner}, {record.player1} - result: {record.player1Result}, {record.player2} - result: {record.player2Result}, {record.date}
        </div>
    </div>
}