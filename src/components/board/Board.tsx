import '../styles/Board.scss';
import { useEffect, useState } from "react";
import el1 from '../styles/images/O.png';
import el2 from '../styles/images/X.png';

export const Board = () => {
    const initialImgState = Array(9).fill('');
    const [currentImg, setCurrentImg] = useState<string[]>(initialImgState);
    const [clickedIndexes, setClickedIndexes] = useState<number[]>([]);
    const [isEl1Turn, setIsEl1Turn] = useState<boolean>(true);

    const handleClick = (index: number) => {
        if (!clickedIndexes.includes(index)) {
            const newCurrentImg = [...currentImg];
            newCurrentImg[index - 1] = isEl1Turn ? el1 : el2;
            setCurrentImg(newCurrentImg);
            setClickedIndexes([...clickedIndexes, index]);
            setIsEl1Turn(!isEl1Turn);
        }
    };

    const handleReset = () => {
        setCurrentImg(initialImgState);
        setClickedIndexes([]);
        setIsEl1Turn(true);
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
    }, [currentImg]);

    return (
        <div>
            <div className="background">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((index) => (
                    <div
                        key={index}
                        className='single_element'
                        onClick={() => handleClick(index)}
                        style={{ ...clickedStyle, backgroundImage: `url(${currentImg[index - 1]})` }}
                    ></div>
                ))}
            </div>
            <button onClick={handleReset}>Reset</button>
        </div>
    );
};
