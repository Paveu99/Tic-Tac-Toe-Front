import {animated, useSpring, useTransition} from "@react-spring/web";
import { useEffect } from "react";
import "../styles/WinnerModal.scss";
import { MatchEntity } from "types";

interface Props {
    data: MatchEntity,
    onClose: () => void,
    isOpen: boolean,
}

export const DetailsModal = (props: Props) => {

    const winner = props.data.player1Result > props.data.player2Result;

    const condition = props.data.player1Result === props.data.player2Result ? "draw" : winner;

    const handleEscape = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
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
            <animated.div style={springs} className='react-winner-modal-wrapper' onClick={e => e.stopPropagation()}>
                <div className='react-winner-modal-content'>
                    <header className="add-form-header">
                        <a href='#' className="close" onClick={handleClose}></a>
                    </header>
                    <div className='game-results'>
                        <div className="players">
                            <div style={{textAlign: "end"}}>{props.data.player1}</div>
                            <div style={{textAlign: "center"}}>vs</div>
                            <div style={{textAlign: "start"}}>{props.data.player2}</div>
                        </div>
                        <div className="result">
                            <div style={{textAlign: "end", color: condition !== "draw" ? (winner ? "green" : "red") : "yellow"}}>{props.data.player1Result}</div>
                            <div style={{textAlign: "center"}}>-</div>
                            <div style={{textAlign: "start", color: condition !== "draw" ? (!winner ? "green" : "red") : "yellow"}}>{props.data.player2Result}</div>
                        </div>
                        <div className="winner">
                            {props.data.winner}
                        </div>
                        <div className="game-date">
                            Game date: {props.data.date}
                        </div>
                    </div>
                </div>
            </animated.div>
        </animated.div>
    ))

}