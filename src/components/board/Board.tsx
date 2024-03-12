import '../styles/Board.scss';
import {useEffect, useState} from "react";
import el1 from '../styles/images/X.png';
import el2 from '../styles/images/O.png';

export const Board = () => {
    const [currentImg, setCurrentImg] = useState<string[]>(Array(9).fill(''));
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
        <div className="background">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((index) => (
                <div
                    key={index}
                    className={`single_element ${clickedIndexes.includes(index) ? 'clicked' : ''}`}
                    onClick={() => handleClick(index)}
                    style={{ ...clickedStyle, backgroundImage: `url(${currentImg[index - 1]})` }}
                ></div>
            ))}
        </div>
    );
};
