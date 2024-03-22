import {useEffect, useRef, useState} from 'react';
import '../styles/Clock.scss'

interface Props {
    start: () => void;
    reset: () => void;
    running: () => void;
}

export const Stopwatch = (props: Props) => {
    const [isRunning, setIsRunning] = useState<boolean>(false);
    const [elapsedTime, setElapsedTime] = useState<number>(0);
    const intervalIdRef = useRef<number | null>(null);
    const startTimeRef = useRef<number>(0);

    useEffect(() => {
        if (isRunning) {
            intervalIdRef.current = window.setInterval(() => {
                setElapsedTime(Date.now() - startTimeRef.current);
            }, 10);
        }

        return () => {
            if (intervalIdRef.current) {
                clearInterval(intervalIdRef.current);
            }
        };
    }, [isRunning]);

    const start = () => {
        setIsRunning(true);
        startTimeRef.current = Date.now() - elapsedTime;
    };

    const stop = () => {
        setIsRunning(false);
    };

    const reset = () => {
        setElapsedTime(0);
        setIsRunning(false);
    };

    const formatTime = () => {
        return Math.floor(elapsedTime / 1000)
    };

    return (
        <div className="stopwatch">
            <div className="display">{formatTime()}</div>
            <div className="controls">
                <button onClick={start} className="start-button">
                    Start
                </button>
                <button onClick={stop} className="stop-button">
                    Stop
                </button>
                <button onClick={reset} className="reset-button">
                    Reset
                </button>
            </div>
        </div>
    );
};