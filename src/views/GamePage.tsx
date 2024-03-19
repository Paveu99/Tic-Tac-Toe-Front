import '../components/styles/GameView.scss'
import {Board} from "../components/board/Board.tsx";
import {useState} from "react";
import {GameStartModal} from "../components/modals/GameStartModal.tsx";
import {UnderBoardBttn} from "../components/buttons/UnderBoardBttn.tsx";

export const GamePage = () => {

    const [openModal, setOpenModal] = useState<boolean>(false);
    const [inputDataCorrect, setInputDataCorrect] = useState<boolean>(false);

    return <div className="page_view">
        {!inputDataCorrect &&
            <div style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                height: "100vh"
            }}>
                <p style={{fontSize: "5vh", textAlign: "center"}}>READY TO PLAY A GAME? LET'S START!!!</p>
                <UnderBoardBttn onClick={() => setOpenModal(true)} text="START NEW GAME"/>
            </div>
        }
        <GameStartModal isOpen={openModal} onClose={() => setOpenModal(false)}/>
        {inputDataCorrect && <Board/>}
    </div>
}