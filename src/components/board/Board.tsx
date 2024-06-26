import '../styles/Board.scss';
import {FormEvent, useEffect, useState} from "react";
import el2 from '../styles/images/O.png';
import el1 from '../styles/images/X.png';
import {CrossingLine} from "../CrossingLine/CrossingLine.tsx";
import {UnderBoardBttn} from "../buttons/UnderBoardBttn.tsx";
import {Stopwatch} from "../clock/Stopwatch.tsx";
import {WinnerModal} from "../modals/WinnerModal.tsx";
import {AddNewMatch} from "types"
import { useTransition} from "@react-spring/web";
import { animated } from 'react-spring';
interface Props {
    playerX: string,
    playerO: string
    handleResetGame: () => void
}

export const Board = (props: Props) => {

    const initialImgState = Array(9).fill('');
    const [currentImg, setCurrentImg] = useState<string[]>(initialImgState);
    const [clickedIndexes, setClickedIndexes] = useState<number[]>([]);
    const [clickedIndexesForX, setClickedIndexesForX] = useState<number[]>([]);
    const [clickedIndexesForO, setClickedIndexesForO] = useState<number[]>([]);
    const [isEl1Turn, setIsEl1Turn] = useState<boolean>(true);
    const [isBoardDisabled, setIsBoardDisabled] = useState<boolean>(false);
    const [winner, setWinner] = useState<string>('');
    const [xPosition, setXPosition] = useState<string | number | undefined>(0);
    const [yPosition, setYPosition] = useState<string | number | undefined>(0);
    const [angle, setAngle] = useState<string | number | undefined>(0);
    const [startStopwatch, setStartStopwatch] = useState<boolean>(false);
    const [resetStopwatch, setResetStopwatch] = useState<boolean>(false);
    const [time, setTime] = useState<string>('');
    const [openModal, setOpenModal] = useState<boolean>(false);
    const [xNumberOfWins, setXNumberOfWins] = useState<number>(0);
    const [yNumberOfWins, setYNumberOfWins] = useState<number>(0);
    const [result, setResult] = useState<AddNewMatch>({
        player1: props.playerX,
        player2: props.playerO,
        winner: '',
        player1Result: xNumberOfWins,
        player2Result: yNumberOfWins,
        date: getCurrentDateTimeUTC(),
    });
    const [gameStarted, setGameStarted] = useState<boolean>(false);
    const [showPopup, setShowPopup] = useState(false);
    const [showKeepGoingPopup, setShowKeepGoingPopup] = useState(false);
    const [newGamePopup, setNewGamePopup] = useState<boolean>(false);
    const [nextOrReset, setNextOrReset] = useState<string>('RESET ROUND');


    function checkWinner(board: number[]) {
        const winningCombos = [
            {id: 1, combo: [1, 2, 3], coordinateX: getXPosition(2, 2), coordinateY: getYPosition(2, 1), angle: 0},
            {id: 2, combo: [4, 5, 6], coordinateX: getXPosition(5, 2), coordinateY: getYPosition(5, 2), angle: 0},
            {id: 3, combo: [7, 8, 9], coordinateX: getXPosition(8, 2), coordinateY: getYPosition(8, 3), angle: 0},
            {id: 4, combo: [1, 4, 7], coordinateX: getXPosition(4, 1), coordinateY: getYPosition(4, 2), angle: 90},
            {id: 5, combo: [2, 5, 8], coordinateX: getXPosition(5, 2), coordinateY: getYPosition(5, 2), angle: 90},
            {id: 6, combo: [3, 6, 9], coordinateX: getXPosition(6, 3), coordinateY: getYPosition(6, 2), angle: 90},
            {id: 7, combo: [1, 5, 9], coordinateX: getXPosition(5, 2), coordinateY: getYPosition(5, 2), angle: 135},
            {id: 8, combo: [3, 5, 7], coordinateX: getXPosition(5, 2), coordinateY: getYPosition(5, 2), angle: 45},
        ];

        for (const combo of winningCombos) {
            const [a, b, c] = combo.combo;
            if (board.includes(a) && board.includes(b) && board.includes(c)) {
                setXPosition(combo.coordinateX);
                setYPosition(combo.coordinateY);
                setAngle(combo.angle);
                setStartStopwatch(false);
                setNextOrReset('NEXT ROUND');
                return true;
            }
        }

        return false;
    }

    function getXPosition(index: number, column: number): string | number | undefined {
        const element = document.querySelector(`.single_element:nth-child(${index})`) as HTMLElement;
        const backgroundElement = document.querySelector('.background') as HTMLElement;

        if (element && backgroundElement) {
            const rectElement = element.getBoundingClientRect();
            const rectBackground = backgroundElement.getBoundingClientRect();

            if (column === 1) {
                return rectElement.width / 2;
            } else if (column === 2) {
                return rectBackground.width / 2;
            } else {
                return ((rectBackground.width) - (rectElement.width / 2));
            }

        } else {
            return undefined
        }
    }

    function getYPosition(index: number, row: number): string | number | undefined {
        const element = document.querySelector(`.single_element:nth-child(${index})`) as HTMLElement;
        const backgroundElement = document.querySelector('.background') as HTMLElement;

        if (element && backgroundElement) {
            const rectElement = element.getBoundingClientRect();
            const rectBackground = backgroundElement.getBoundingClientRect();

            if (row === 1) {
                return rectElement.height / 2;
            } else if (row === 2) {
                return rectBackground.height / 2;
            } else {
                return ((rectBackground.height) - (rectElement.height / 2));
            }

        } else {
            return undefined
        }
    }

    function getCurrentDateTimeUTC() {
        const now = new Date();

        const hours = String(now.getUTCHours()).padStart(2, '0');
        const minutes = String(now.getUTCMinutes()).padStart(2, '0');
        const seconds = String(now.getUTCSeconds()).padStart(2, '0');

        const day = String(now.getUTCDate()).padStart(2, '0');
        const month = String(now.getUTCMonth() + 1).padStart(2, '0');
        const year = now.getUTCFullYear();

        return `${hours}:${minutes}:${seconds} ${day}-${month}-${year} UTC`;
    }

    const handleClick = (index: number) => {
        if (!clickedIndexes.includes(index) && !isBoardDisabled) {
            const newCurrentImg = [...currentImg];
            newCurrentImg[index - 1] = isEl1Turn ? el1 : el2;
            setCurrentImg(newCurrentImg);

            const updatedClickedIndexes = [...clickedIndexes, index];
            setClickedIndexes(updatedClickedIndexes);
            setStartStopwatch(true);
            setResetStopwatch(false);

            if(isEl1Turn) {
                if(checkWinner([...clickedIndexesForX, index])) {
                    setIsBoardDisabled(true);
                    setWinner(props.playerX);
                    setGameStarted(true);
                    setXNumberOfWins(xNumberOfWins + 1);
                    return;
                }
            } else {
                if(checkWinner([...clickedIndexesForO, index])) {
                    setIsBoardDisabled(true);
                    setWinner(props.playerO);
                    setGameStarted(true);
                    setYNumberOfWins(yNumberOfWins + 1);
                    return;
                }
            }

            if(isEl1Turn) {
                setClickedIndexesForX([...clickedIndexesForX, index].sort());
            } else {
                setClickedIndexesForO([...clickedIndexesForO, index].sort());
            }

            setIsEl1Turn(!isEl1Turn);
        }
    };

    const saveData = async (e: FormEvent) => {
        e.preventDefault()

        if (gameStarted) {
            try {
                handleThis();
            } catch (error) {
                console.error('Error adding record:', error);
            }
        } else {
            handleKeepGoing();
        }
    }

    const newGame = (e: FormEvent) => {
        e.preventDefault();

        setNewGamePopup(true);
    }

    const transitions = useTransition(showPopup, {
        from: { opacity: 0, transform: 'translate(-50%, -50%) scale(0.5)' },
        enter: { opacity: 1, transform: 'translate(-50%, -50%) scale(1)' },
        leave: { opacity: 0, transform: 'translate(-50%, -50%) scale(0.5)' },
        config: { duration: 200 },
    });

    const transitionsB = useTransition(showKeepGoingPopup, {
        from: { opacity: 0, transform: 'translate(-50%, -50%) scale(0.5)' },
        enter: { opacity: 1, transform: 'translate(-50%, -50%) scale(1)' },
        leave: { opacity: 0, transform: 'translate(-50%, -50%) scale(0.5)' },
        config: { duration: 200 },
    });

    const transitionsC = useTransition(newGamePopup, {
        from: { opacity: 0, transform: 'translate(-50%, -50%) scale(0.5)' },
        enter: { opacity: 1, transform: 'translate(-50%, -50%) scale(1)' },
        leave: { opacity: 0, transform: 'translate(-50%, -50%) scale(0.5)' },
        config: { duration: 200 },
    });

    const handleThis = () => {
        setShowPopup(true);
    };

    const closeSave = async () => {
        const res = await fetch('http://192.168.68.107:3001/match', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(result),
        });
        const data = await res.json();
        console.log(data)
        if (data) {
            setShowPopup(false);
            handleGameReset();
        }
    }

    const closeOnly = () => {
        setShowPopup(false);
    }

    const handleKeepGoing = () => {
        setShowKeepGoingPopup(true);
    }

    const closeKeepGoing = () => {
        setShowKeepGoingPopup(false);
    }

    const closeNewGamePopup = () => {
        setNewGamePopup(false);
    }


    const handleReset = () => {
        setNextOrReset('RESET ROUND');
        setCurrentImg(initialImgState);
        setClickedIndexes([]);
        setClickedIndexesForX([]);
        setClickedIndexesForO([]);
        setIsEl1Turn(true);
        setIsBoardDisabled(false);
        setWinner('');
        setResetStopwatch(true);
        setStartStopwatch(false);
        setTime('');
    };

    const handleGameReset = () => {
        handleReset();
        setXNumberOfWins(0);
        setYNumberOfWins(0);
        props.handleResetGame();
        setResult({
            player1: props.playerX,
            player2: props.playerO,
            winner: '',
            player1Result: 0,
            player2Result: 0,
            date: '',
        });
        setGameStarted(false);
    }

    const handleTime = (time: string) => {
        setTime(time);
    }

    const clickedStyle = {
        backgroundSize: '90%',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
    };

    useEffect(() => {
        console.log(result);
        if (clickedIndexes.length === 9 && !winner) {
            setStartStopwatch(false);
            setWinner('DRAW');
            setNextOrReset('NEXT ROUND');
            setGameStarted(true);
        }

        if (winner) {
            setOpenModal(true);
        }
    }, [clickedIndexes.length, currentImg, result, winner, gameStarted]);

    useEffect(() => {
        const currWinner = (xNumberOfWins > yNumberOfWins) ? props.playerX : props.playerO;
        setResult(form => ({
            ...form,
            'player1Result': xNumberOfWins,
            'player2Result': yNumberOfWins,
            'winner': (xNumberOfWins === yNumberOfWins) ? 'DRAW' : currWinner
        }))
    }, [props.playerO, props.playerX, winner, xNumberOfWins, yNumberOfWins]);

    return (
        <div className="board">
            <div className="player-x">
                <div style={{display: "flex", alignItems: "center", flexDirection: "column", justifyContent: "center"}}>
                    <p className="player-x__name">
                        {props.playerX}
                    </p>
                    <div
                        className={"represented-image"}
                        style={{
                            backgroundImage: `url(${el1})`,
                            backgroundColor: `${isEl1Turn ? "rgba(166,80,80,0.5)" : "rgba(138, 22, 22, 1)"}`,
                            backgroundSize: 'auto 15vh',
                            height: '15vh',
                            width: '15vh',
                            borderRadius: '20px',
                        }}
                    ></div>
                    <div className="current-result">{xNumberOfWins}</div>
                </div>
            </div>
            <div className="game">
                <Stopwatch start={startStopwatch} reset={resetStopwatch} time={handleTime}/>
                <div className="background">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((index) => (
                        <div
                            key={index}
                            className={`single_element ${isBoardDisabled || !!currentImg[index - 1] ? 'disabled' : ''}`}
                            onClick={() => handleClick(index)}
                            style={{...clickedStyle, backgroundImage: `url(${currentImg[index - 1]})`}}
                        ></div>
                    ))}
                    {winner && winner !== 'DRAW' &&
                        <CrossingLine angle={angle} xPosition={xPosition} yPosition={yPosition}/>}
                </div>
                <div className="board-buttons">
                    <UnderBoardBttn text={nextOrReset} onClick={handleReset} disabled={showKeepGoingPopup || showPopup || newGamePopup}/>
                    <UnderBoardBttn text="NEW GAME" onClick={newGame} disabled={showKeepGoingPopup || showPopup || newGamePopup}/>
                    <UnderBoardBttn text="SAVE RESULT" onClick={saveData} disabled={showKeepGoingPopup || showPopup || newGamePopup}/>
                    {transitions((styles, item) =>
                            item && (
                                <animated.div style={styles} className="popup">
                                    <span className="popup-content">Are you sure?</span>
                                    <br/>
                                    <span className="popup-content__description">Once saved, you can no longer come back to this game!</span>
                                    <div style={{display: "flex", justifyContent: "center", marginTop: "10px", gap: "15px", marginBottom: "10px"}}>
                                        <UnderBoardBttn text="Yes" onClick={closeSave}/>
                                        <UnderBoardBttn text="No" onClick={closeOnly}/>
                                    </div>
                                </animated.div>
                            )
                    )}
                    {transitionsB((styles, item) =>
                            item && (
                                <animated.div style={styles} className="popup">
                                    <span className="popup-content">You cannot save your progress!</span>
                                    <br/>
                                    <span className="popup-content__description">No result was recorded, finish at least one game to save the game</span>
                                    <div style={{display: "flex", justifyContent: "center", marginTop: "10px", gap: "15px", marginBottom: "10px"}}>
                                        <UnderBoardBttn text="Ok" onClick={closeKeepGoing}/>
                                    </div>
                                </animated.div>
                            )
                    )}
                    {transitionsC((styles, item) =>
                            item && (
                                <animated.div style={styles} className="popup">
                                    <span className="popup-content">Are you sure?</span>
                                    <br/>
                                    <span className="popup-content__description">New game means, you can no longer come back to this game and unsaved result will be lost!</span>
                                    <div style={{display: "flex", justifyContent: "center", marginTop: "10px", gap: "15px", marginBottom: "10px"}}>
                                        <UnderBoardBttn text="Yes" onClick={handleGameReset}/>
                                        <UnderBoardBttn text="No" onClick={closeNewGamePopup}/>
                                    </div>
                                </animated.div>
                            )
                    )}
                </div>
            </div>
            <div className="player-o">
                <div style={{display: "flex", alignItems: "center", flexDirection: "column"}}>
                    <p className="player-o__name">
                        {props.playerO}
                    </p>
                    <div
                        className={"represented-image"}
                        style={{
                            backgroundImage: `url(${el2})`,
                            backgroundColor: `${!isEl1Turn ? "rgba(166,80,80,0.5)" : "rgba(138, 22, 22, 1)"}`,
                            backgroundSize: 'auto 15vh',
                            height: '15vh',
                            width: '15vh',
                            borderRadius: '20px',
                        }}
                    ></div>
                    <div className="current-result">{yNumberOfWins}</div>
                </div>
            </div>
            <WinnerModal isOpen={openModal} onClose={() => setOpenModal(false)} winner={winner} time={time}/>
        </div>
    );
};

