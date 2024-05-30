import {useEffect, useState} from 'react';
import '../styles/CoinFlip.scss';
import {Spinner} from "../spinner/Spinner.tsx";
import {UnderBoardBttn} from "../buttons/UnderBoardBttn.tsx";
import el1 from "../styles/images/Number1.png";
import el2 from "../styles/images/Number2.png";

interface Props {
    player1: string;
    player2: string;
    onResultChange: (starter: string, second: string) => void;
}

export function CoinFlip(props: Props) {
    const [starter, setStarter] = useState<string>('');
    const [second, setSecond] = useState<string>('');
    const [loading, setLoading] = useState<boolean>();
    const [image, setImage] = useState<string>('');
    const flipCoin = () => {
        setLoading(true);
        setStarter('');
        setImage('');
        const flipResult = Math.random();
        setTimeout(() => {
            if (flipResult <= 0.5) {
                setStarter(props.player1);
                setSecond(props.player2)
                setImage(el1);
            } else {
                setStarter(props.player2);
                setSecond(props.player1);
                setImage(el2);
            }
            setLoading(false);
        }, 2000);
    };

    useEffect(() => {
        props.onResultChange(starter, second);
    }, [props, second, starter]);


    return (
        <div className="coin-flip-page">
            {loading ? <Spinner/> : <div style={{marginBottom: "10px"}}><UnderBoardBttn onClick={flipCoin} text="WHO WILL START?"/></div>}
            <div className="starting-person">
                {image && <img className="starting-person__icon" src={image} alt="Coin flip result" />}
                {starter !== '' && <div style={{textAlign: "center"}}> {starter.toUpperCase()} WILL START THE GAME AS "X"</div>}
            </div>
        </div>
    );
}

