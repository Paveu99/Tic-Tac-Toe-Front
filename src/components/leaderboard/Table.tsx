import { MatchEntity } from "types"
import {SingleElement} from "./SingleElement.tsx";

interface Props {
    records: MatchEntity[]
}

export const Table = ({records}: Props) => {
    return <div>
        {
            records.map((el) => (
                <SingleElement record={el} key={el.id}/>
            ))
        }
    </div>
}