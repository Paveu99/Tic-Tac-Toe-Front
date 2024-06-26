import { useEffect, useRef, useState } from 'react';
import '../styles/Stopwatch.scss';

interface Props {
    start: boolean;
    reset: boolean;
    time: (time: string) => void;
}

export const Stopwatch = ({ start, reset, time }: Props) => {
    const [isRunning, setIsRunning] = useState<boolean>(false);
    const [elapsedTime, setElapsedTime] = useState<number>(0);
    const intervalIdRef = useRef<NodeJS.Timeout | null>(null);
    const startTimeRef = useRef<number>(0);

    useEffect(() => {
        if (start) {
            setIsRunning(true);
            startTimeRef.current = Date.now() - elapsedTime;
            intervalIdRef.current = setInterval(() => {
                setElapsedTime(Date.now() - startTimeRef.current);
            }, 10) as NodeJS.Timeout;
        } else if (!start && isRunning) {
            setIsRunning(false);
            time(formatTime());
            if (intervalIdRef.current) clearInterval(intervalIdRef.current);
        } else if (reset) {
            setIsRunning(false);
            setElapsedTime(0);
        }

        return () => {
            if (intervalIdRef.current) clearInterval(intervalIdRef.current);
        };
    }, [start, reset, isRunning, elapsedTime]);

    const formatTime = () => {

        let minutes: number | string = Math.floor((elapsedTime / (1000 * 60)) % 60);
        let seconds: number | string = Math.floor((elapsedTime / 1000) % 60);
        let milliseconds: number | string = Math.floor((elapsedTime % 1000) / 10);

        minutes = String(minutes).padStart(2, '0');
        seconds = String(seconds).padStart(2, '0');
        milliseconds = String(milliseconds).padStart(2, '0');

        return `${minutes}:${seconds}:${milliseconds}`;
    };

    return (
        <div className="stopwatch">
            <div className="display">{formatTime()}</div>
        </div>
    );
};
