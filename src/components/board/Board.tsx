import '../styles/Board.scss';
import {useEffect, useState} from "react";
import el2 from '../styles/images/O.png';
import el1 from '../styles/images/X.png';
import {CrossingLine} from "../CrossingLine/CrossingLine.tsx";
import {UnderBoardBttn} from "../buttons/UnderBoardBttn.tsx";
import {Stopwatch} from "../clock/Stopwatch.tsx";
import {WinnerModal} from "../modals/WinnerModal.tsx";

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
                    return;
                }
            } else {
                if(checkWinner([...clickedIndexesForO, index])) {
                    setIsBoardDisabled(true);
                    setWinner(props.playerO);
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

    const handleReset = () => {
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
        // // console.log(currentImg);
        // // console.log(clickedIndexes);
        // // console.log(isEl1Turn);
        // // console.log(clickedIndexesForO);
        // // console.log(clickedIndexesForX);
        // console.log(winner);
        // // console.log(props.playerX);
        // // console.log(props.playerO);
        // console.log(startStopwatch);
        // console.log(resetStopwatch);
        if (clickedIndexes.length === 9 && !winner) {
            setStartStopwatch(false);
            setWinner('DRAW');
        }

        if (winner) {
            setOpenModal(true)
            console.log(winner)
        }
    }, [clickedIndexes.length, currentImg, winner]);


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
                    <UnderBoardBttn text="RESET GAME" onClick={handleReset}/>
                    <UnderBoardBttn text="NEW GAME" onClick={handleGameReset}/>
                    <UnderBoardBttn text="SAVE RESULT" onClick={handleReset}/>
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
                </div>
            </div>
            <WinnerModal isOpen={openModal} onClose={() => setOpenModal(false)} winner={winner} time={time}/>
        </div>
    );
};

