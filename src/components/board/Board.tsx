import '../styles/Board.scss';
import { useEffect, useState } from "react";
import el2 from '../styles/images/O.png';
import el1 from '../styles/images/X.png';

export const Board = () => {
    const initialImgState = Array(9).fill('');
    const [currentImg, setCurrentImg] = useState<string[]>(initialImgState);
    const [clickedIndexes, setClickedIndexes] = useState<number[]>([]);
    const [clickedIndexesForX, setClickedIndexesForX] = useState<number[]>([]);
    const [clickedIndexesForO, setClickedIndexesForO] = useState<number[]>([]);
    const [isEl1Turn, setIsEl1Turn] = useState<boolean>(true);
    const [isBoardDisabled, setIsBoardDisabled] = useState<boolean>(false);
    const [winner, setWinner] = useState<string>('');
    const [xPosition, setXPosition] = useState<string>('');
    const [yPosition, setYPosition] = useState<string>('');
    const [angle, setAngle] = useState<string>('');
    const [thickness, setThickness] = useState<string>('');
    function checkWinner(board: number[]) {
        const winningCombos = [
            [1, 2, 3], [4, 5, 6], [7, 8, 9],
            [1, 4, 7], [2, 5, 8], [3, 6, 9],
            [1, 5, 9], [3, 5, 7]
        ];

        // Sprawdzenie, czy któryś z zestawów indeksów jest częścią zwycięskiej kombinacji
        for (const combo of winningCombos) {
            const [a, b, c] = combo;
            if (board.includes(a) && board.includes(b) && board.includes(c)) {
                console.log("Wygrana")
                return true;
            }
        }

        return false;
    }

    const handleClick = (index: number) => {
        if (!clickedIndexes.includes(index) && !isBoardDisabled) {
            const newCurrentImg = [...currentImg];
            newCurrentImg[index - 1] = isEl1Turn ? el1 : el2;
            setCurrentImg(newCurrentImg);

            // Aktualizacja klikniętych indeksów
            const updatedClickedIndexes = [...clickedIndexes, index];
            setClickedIndexes(updatedClickedIndexes);

            // Sprawdzenie zwycięstwa
            if(isEl1Turn) {
                if(checkWinner([...clickedIndexesForX, index])) {
                    setIsBoardDisabled(true);
                    setWinner('X');
                }
                checkWinner([...clickedIndexesForX, index]);
            } else {
                if(checkWinner([...clickedIndexesForO, index])) {
                    setIsBoardDisabled(true);
                    setWinner('O');
                }
                checkWinner([...clickedIndexesForO, index]);
            }

            // Aktualizacja indeksów dla X i O
            if(isEl1Turn) {
                setClickedIndexesForX([...clickedIndexesForX, index]);
            } else {
                setClickedIndexesForO([...clickedIndexesForO, index]);
            }

            // Zmiana tury
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
    };

    const clickedStyle = {
        backgroundSize: '90%',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
    };

    useEffect(() => {
        console.log(currentImg);
        console.log(clickedIndexes);
        console.log(isEl1Turn);
        console.log(clickedIndexesForO);
        console.log(clickedIndexesForX);
        console.log(winner)
    }, [currentImg]);

    return (
        <div>
            <div className="background">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((index) => (
                    <div
                        key={index}
                        className={`single_element ${isBoardDisabled || !!currentImg[index - 1] ? 'disabled' : ''}`}
                        onClick={() => handleClick(index)}
                        style={{ ...clickedStyle, backgroundImage: `url(${currentImg[index - 1]})` }}
                    ></div>
                ))}
            </div>
            <button onClick={handleReset}>Reset</button>
        </div>
    );
};

