import './TimeCounter.css';
import { useState, useEffect, useRef } from 'react';

function TimeCounter() {

    const [isRunning, setIsRunning] = useState(false);
    const [timeLapsed, setTimeLapsed] = useState(0);
    const startTime = useRef(null);
    const intervalId = useRef(null);

    useEffect(() => {
        if (isRunning) {
            intervalId.current = setInterval(() => {
                setTimeLapsed(Date.now() - startTime.current);
            }, 90);
        }
        console.log("re-render");
        return () => {
            clearInterval(intervalId.current);
        }
    }, [isRunning]);


    function start() {
        startTime.current = Date.now();
        setIsRunning(true);   
    }

    function stop() {
        setIsRunning(false);
    }

    function reset() {
        setIsRunning(false);
        setTimeLapsed(0);
    }

    function formatTime() {
        const totalSeconds = Math.floor(timeLapsed / 1000);
        const miliSeconds = Math.floor(timeLapsed % 1000) % 60;
        const seconds = totalSeconds % 60;
        const minutes = Math.floor(totalSeconds / 60) % 60;
        const hours = Math.floor(totalSeconds / 3600);

        return `${String(hours).padStart(2, '0')} :
                ${String(minutes).padStart(2, '0')} :
                ${String(seconds).padStart(2, '0')} :
                ${String(miliSeconds).padStart(2, '0')}
                `;
    }

    return (
        <div className='counter-container'>
            <div className='time'>{formatTime()}</div>
            <div className='actions'>
                <button className='start-button' onClick={start}>Start</button>
                <button className='stop-button' onClick={stop}>Stop</button>
                <button className='reset-button' onClick={reset}>Reset</button>
            </div>
        </div>
    );
}

export default TimeCounter
