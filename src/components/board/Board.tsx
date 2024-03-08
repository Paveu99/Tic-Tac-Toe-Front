import '../styles/Board.scss'
import {useState} from "react";
import el1 from '../styles/images/O.png';

export const Board = () => {

    const [isClicked, setIsClicked] = useState<boolean>(false);

    const handleClick = () => {
        setIsClicked(!isClicked);
    }

    return <div className="background">
        <div className={`single_element ${isClicked ? 'clicked' : ''}`} onClick={handleClick}></div>
        <div className={`single_element ${isClicked ? 'clicked' : ''}`} onClick={handleClick}></div>
        <div className="single_element"></div>
        <div className="single_element"></div>
        <div className="single_element"></div>
        <div className="single_element"></div>
        <div className="single_element"></div>
        <div className="single_element"></div>
        <div className="single_element"></div>
    </div>
}