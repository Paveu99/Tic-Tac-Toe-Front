import {animated, useSpring, useTransition} from "@react-spring/web";
import { useEffect } from "react";
import "../styles/GameStartModal.scss";

interface Props {
    isOpen: boolean,
    onClose: () => void,
    winner: string,
    time: string,
}

export const WinnerModal = (props: Props) => {

    const handleEscape = (e: any) => {
        if (e.keyCode === 27) {
            handleClose();
        }
    }

    const handleClose = () => {
        props.onClose();
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
                    WINNER IS: {props.winner} with time: {props.time} minutes
                </div>
            </animated.div>
        </animated.div>
    ))

}