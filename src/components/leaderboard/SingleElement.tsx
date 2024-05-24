import { MatchEntity } from "types"

interface Props {
    record: MatchEntity
}

export const SingleElement = ({record}: Props) => {

    return <div>
        {record.winner}
    </div>
}