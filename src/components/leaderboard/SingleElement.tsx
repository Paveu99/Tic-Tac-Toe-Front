import { MatchEntity } from "types"
import "../styles/LeaderboardPage.scss"
import {useState} from "react";
import {DetailsModal} from "../modals/DetailsModal.tsx";

interface Props {
    record: MatchEntity
    index: number
}

export const SingleElement = ({record, index}: Props) => {

    const [modalOpen, setModalOpen] = useState<boolean>(false)

    return <div className="single-record" onClick={() => setModalOpen(true)}>
        <div className="single-record__left">
            {index}.
        </div>
        <div className="single-record__right">
            <div>
                {record.player1} vs {record.player2}
            </div>
            <div>
                {record.date}
            </div>
        </div>
        <DetailsModal isOpen={modalOpen} onClose={() => setModalOpen(false)} data={record}/>
    </div>
}