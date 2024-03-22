import {animated, useSpring, useTransition} from "@react-spring/web";
import { useEffect, useState} from "react";
import "../styles/GameStartModal.scss"
import {CoinFlip} from "../coin/CoinFlip.tsx";
import el1 from "../styles/images/Number1.png";
import el2 from "../styles/images/Number2.png";
import el3 from "../styles/images/Check.png";
import el4 from "../styles/images/Wrong.png";
import { motion } from "framer-motion";
import {UnderBoardBttn} from "../buttons/UnderBoardBttn.tsx";
import {Counter} from "../counter/Counter.tsx";
interface Props {
    isOpen: boolean,
    onClose: () => void,
    setPlayers: (starter: string, second: string, inputData: boolean) => void;
}

interface Players {
    player1: string,
    player2: string
}

export const GameStartModal = (props: Props) => {

    const [players, setPlayers] = useState<Players>({
        player1: '',
        player2: '',
    })
    const [correctPLayer1Name, setCorrectPLayer1Name] = useState<boolean>(false);
    const [correctPLayer2Name, setCorrectPLayer2Name] = useState<boolean>(false);
    const [dataCorrect, setDataCorrect] = useState<boolean>(false);
    const [starterFromCoinFlip, setStarterFromCoinFlip] = useState<string>('');
    const [secondFromCoinFlip, setSecondFromCoinFlip] = useState<string>('');
    const [buttonClicked, setButtonClicked] = useState<boolean>(false);
    const [p1NumOfChar, setP1NumOfChar] = useState<number>(0);
    const [p2NumOfChar, setP2NumOfChar] = useState<number>(0);

    const handleEscape = (e: any) => {
        if (e.keyCode === 27) {
            handleClose();
        }
    }

    const handleClose = () => {
        setPlayers({ player1: '', player2: '' });
        setCorrectPLayer1Name(false);
        setCorrectPLayer2Name(false);
        setDataCorrect(false);
        setStarterFromCoinFlip('');
        setSecondFromCoinFlip('');
        setP1NumOfChar(0);
        setP2NumOfChar(0);
        props.onClose();
    }

    const handleChange = (key: string, value: any) => {

        setPlayers(players => ({
            ...players,
            [key]: value
        }));

        if (key === 'player1') {
            setCorrectPLayer1Name(value.length > 0);
            setP1NumOfChar(value.length);
        }
        if (key === 'player2') {
            setCorrectPLayer2Name(value.length > 0);
            setP2NumOfChar(value.length);
        }
    };

    const handleButtonClick = () => {
        if (!buttonClicked) {
            props.setPlayers(starterFromCoinFlip, secondFromCoinFlip, dataCorrect);
            setButtonClicked(true);
        }
    };

    const resetPlayersNames = () => {
        setPlayers({
            player1: '',
            player2: '',
        });
        setCorrectPLayer1Name(false);
        setCorrectPLayer2Name(false);
    }

    const handleResultChange = (starter: string, second: string) => {
        setStarterFromCoinFlip(starter);
        setSecondFromCoinFlip(second);
    };

    const variantsLeft = {
        hidden: { opacity: 0, x: -5 },
        visible: { opacity: 1, x: 0 },
    };

    useEffect(() => {
        document.addEventListener("keydown", handleEscape)

        return () => document.removeEventListener("keydown", handleEscape)
    }, [])

    const modalTransition = useTransition(props.isOpen, {
        from: { opacity: 0},
        enter: { opacity: 1},
        leave: { opacity: 1},
        config: {
            duration: 500
        }
    })

    const springs = useSpring({
        opacity: props.isOpen ? 1 : 0,
        transform: props.isOpen ? "translateY(0%)" : "translateY(-100%)",
        config: {
            duration: 500
        }
    });

    useEffect(() => {
        if (players.player1 === players.player2) {
            setCorrectPLayer1Name(false);
            setCorrectPLayer2Name(false);
        } else {
            setCorrectPLayer1Name(true);
            setCorrectPLayer2Name(true);
        }

        if (players.player1.length === 0) {
            setCorrectPLayer1Name(false);
        }

        if (players.player2.length === 0) {
            setCorrectPLayer2Name(false);
        }

        if (correctPLayer1Name && correctPLayer2Name) {
            setDataCorrect(true);
        } else {
            setDataCorrect(false);
        }
        console.log(starterFromCoinFlip)
    }, [correctPLayer1Name, correctPLayer2Name, players.player1, players.player2, resetPlayersNames, starterFromCoinFlip]);

    return modalTransition((_styles, isOpen) => isOpen && (
        <animated.div className='react-modal-overlay' onClick={handleClose}>
            <animated.div style={springs} className='react-modal-wrapper' onClick={e => e.stopPropagation()}>
                <div className='react-modal-content'>
                    <header className="add-form-header">
                        <div>
                            <h2 style={
                                {
                                    height: "30px",
                                    fontWeight: "bold",
                                    marginTop: "5px",
                                    marginBottom: "10px",
                                    background: 'linear-gradient(to right, #ffffff, #ffffff)',
                                    WebkitBackgroundClip: 'text',
                                    color: 'transparent',
                                }
                            }>
                                NEW GAME
                            </h2>
                        </div>
                        <a href='#' className="close" onClick={handleClose}></a>
                    </header>
                    <hr/>
                    <form autoComplete="off" className="start-form">
                        <div>
                            <div className="label" style={{color: "white"}}>
                                <img className="desc-icon" src={el1} alt=""/>
                                FIRST PLAYER NAME: <br/>
                            </div>
                            <div className="check">
                                <input
                                    placeholder="Add first player name"
                                    type="text"
                                    name="player1"
                                    className="start-form__name input"
                                    value={players.player1}
                                    onChange={e => handleChange('player1', e.target.value)}
                                    maxLength={20}
                                />
                                <Counter numOfChars={p1NumOfChar}/>
                                {
                                    correctPLayer1Name ?
                                        <motion.div
                                            initial="hidden"
                                            animate="visible"
                                            variants={variantsLeft}
                                            transition={{duration: 0.8}}
                                            style={{display: "flex", justifyContent: "center"}}
                                        >
                                            <img src={el3} className="check__icon" alt=""/>
                                        </motion.div> :
                                        <motion.div
                                            initial="hidden"
                                            animate="visible"
                                            variants={variantsLeft}
                                            transition={{duration: 0.8}}
                                            style={{display: "flex", justifyContent: "center"}}
                                        >
                                            <img src={el4} className="check__icon" alt=""/>
                                        </motion.div>
                                }
                            </div>
                        </div>
                        <div>
                            <div className="label" style={{color: "white"}}>
                                <img className="desc-icon" src={el2} alt=""/>
                                SECOND PLAYER NAME: <br/>
                            </div>
                            <div className="check">
                                <input
                                    placeholder="Add second player name"
                                    type="text"
                                    name="player2"
                                    className="start-form__name input"
                                    value={players.player2}
                                    onChange={e => handleChange('player2', e.target.value)}
                                    maxLength={20}
                                />
                                <Counter numOfChars={p2NumOfChar}/>
                                {
                                    correctPLayer2Name ?
                                        <motion.div
                                            initial="hidden"
                                            animate="visible"
                                            variants={variantsLeft}
                                            transition={{duration: 0.8}}
                                        >
                                            <img src={el3} className="check__icon" alt=""/>
                                        </motion.div> :
                                        <motion.div
                                            initial="hidden"
                                            animate="visible"
                                            variants={variantsLeft}
                                            transition={{duration: 0.8}}
                                        >
                                            <img src={el4} className="check__icon" alt=""/>
                                        </motion.div>
                                }
                            </div>
                        </div>
                        {dataCorrect && <CoinFlip player1={players.player1} player2={players.player2}
                                                  onResultChange={handleResultChange}/>}
                        {starterFromCoinFlip &&
                            <div style={{display: "flex", justifyContent: "center", marginTop: "20px"}}>
                                <UnderBoardBttn type="submit" onClick={handleButtonClick} disabled={buttonClicked} text="LET'S ROLL!!!"/>
                            </div>
                        }
                    </form>
                </div>
            </animated.div>
        </animated.div>
    ))

}