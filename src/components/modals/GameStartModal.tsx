import {animated, useSpring, useTransition} from "@react-spring/web";
import {useEffect, useState} from "react";
import "../styles/GameStartModal.scss"
interface Props {
    isOpen: boolean,
    onClose: () => void
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

    const handleEscape = (e: any) => {
        if (e.keyCode === 27) {
            props.onClose()
        }
    }

    const handleChange = (key: string, value: any) => {

        setPlayers(players => ({
            ...players,
            [key]: value
        }));

        if (key === 'player1') {
            setCorrectPLayer1Name(value.length > 0);
        }
        if (key === 'player2') {
            setCorrectPLayer2Name(value.length > 0);
        }
    };

    const checkInput = () => {
        console.log('Test')
    }

    const resetPlayersNames = () => {
        setPlayers({
            player1: '',
            player2: '',
        });
        setCorrectPLayer1Name(false);
        setCorrectPLayer2Name(false);
    }

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
        if (correctPLayer1Name && correctPLayer2Name) {
            setDataCorrect(true);
        } else {
            setDataCorrect(false);
        }
    }, [correctPLayer1Name, correctPLayer2Name, resetPlayersNames]);

    return modalTransition((_styles, isOpen) => isOpen && (
        <animated.div className='react-modal-overlay' onClick={props.onClose}>
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
                        <a href='#' className="close" onClick={props.onClose}></a>
                    </header>
                    <hr/>
                    <form autoComplete="off" className="start-form" onSubmit={checkInput}>
                        <input
                            placeholder="Add first player name"
                            type="text"
                            name="player1"
                            className="start-form__name input"
                            value={players.player1}
                            onChange={e => handleChange('player1', e.target.value)}
                        />
                        <input
                            placeholder="Add first second name"
                            type="text"
                            name="player2"
                            className="start-form__name input"
                            value={players.player2}
                            onChange={e => handleChange('player2', e.target.value)}
                        />
                        <button>START</button>
                    </form>
                </div>
            </animated.div>
        </animated.div>
    ))

}