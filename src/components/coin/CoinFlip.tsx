import {useEffect, useState} from 'react';
import '../styles/CoinFlip.scss';
import {Spinner} from "../spinner/Spinner.tsx";
import {UnderBoardBttn} from "../buttons/UnderBoardBttn.tsx";
import el1 from "../styles/images/Number1.png";
import el2 from "../styles/images/Number2.png";

interface Props {
    player1: string;
    player2: string;
    onResultChange: (result: string) => void;
}

export function CoinFlip(props: Props) {
    const [result, setResult] = useState<string>('');
    const [loading, setLoading] = useState<boolean>();
    const [image, setImage] = useState<string>('');
    const flipCoin = () => {
        setLoading(true);
        setResult('');
        setImage('');
        const flipResult = Math.random();
        setTimeout(() => {
            if (flipResult <= 0.5) {
                setResult(props.player1);
                setImage(el1);
            } else {
                setResult(props.player2);
                setImage(el2);
            }
            setLoading(false);
        }, 2000);
    };

    useEffect(() => {
        props.onResultChange(result);
    }, [props, result]);


    return (
        <div className="coin-flip-page">
            {loading ? <Spinner/> : <UnderBoardBttn onClick={flipCoin} text="WHO WILL START?"/>}
            <div className="starting-person">
                {image && <img className="starting-person__icon" src={image} alt="Coin flip result" />}
                {result !== '' && <div style={{textAlign: "center",marginTop: "10px"}}> {result.toUpperCase()} WILL START THE GAME AS "X"</div>}
            </div>
        </div>
    );
}

