import '../components/styles/GameView.scss'
import {Board} from "../components/board/Board.tsx";
import {useEffect, useState} from "react";
import {GameStartModal} from "../components/modals/GameStartModal.tsx";
import {UnderBoardBttn} from "../components/buttons/UnderBoardBttn.tsx";

interface Players {
    playerX: string,
    playerO: string
}

export const GamePage = () => {

    const [openModal, setOpenModal] = useState<boolean>(false);
    const [inputDataCorrect, setInputDataCorrect] = useState<boolean>(false);
    const [players, setPlayers] = useState<Players>({
        playerX: '',
        playerO: '',
    });
    const handleInput = (starter: string, seconder: string, inputData: boolean) => {
        setPlayers({playerX: starter, playerO: seconder});
        setTimeout(() => {
            setOpenModal(false);
            setInputDataCorrect(inputData);
        }, 500);
    }

    const handleResult = () => {
        setPlayers({playerX: '', playerO: ''});
        setInputDataCorrect(false);
    }

    useEffect(() => {
        console.log(players);
        console.log(inputDataCorrect);
    }, [inputDataCorrect, players, setPlayers]);

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
        <GameStartModal isOpen={openModal} onClose={() => setOpenModal(false)} setPlayers={handleInput}/>
        {inputDataCorrect && <Board playerX={players.playerX} playerO={players.playerO} handleResetGame={handleResult}/>}
    </div>
}