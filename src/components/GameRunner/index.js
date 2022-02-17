import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { formatTime } from '../../utils/formatTime';
import { sines, cosines, tangents, cosecants, angles } from '../../utils/trigonometryValues';
import { RESET_TIME, SET_MODE } from '../../utils/actions';

function GameRunner({ gameMode }) {
    // Keeps record of number correct
    const [correctCount, setCorrectCount] = useState(0);
    // Keeps record of current streak
    const [streak, setStreak] = useState(0);
    // Keeps record of time ellapsed between answers
    const [ellapsed, setEllapsed] = useState(0);
    // Keeps record of score
    const [score, setScore] = useState(0);
    // Keeps record of whether game has started
    const [started, setStarted] = useState(false);
    // Keeps record of position in fibonacci array
    const [fibPos, setFibPos] = useState(0);
    // Fibonacci Series
    const fibonacci = [1,2,3,5,8,13,21,34,55];
    // Angle index
    const [angleIndex, setAngleIndex] = useState(Math.floor(Math.random()*5));

    const [hasBeenReset,setHasBeenReset] = useState(false);
    const [fontState, setFontState] = useState('blue-pill-font')

    const state = useSelector(globalState => {
        return { timeLeft: globalState.timeLeft, gameMode: globalState.gameMode };
    });

    const dispatch = useDispatch();

    const startGame = () => {
        setStarted(true);
    }

    useEffect(() => {
        if(correctCount >= 55) {
            setFibPos(8);
        } else if(correctCount > fibonacci[fibPos]) {
            setFibPos(fibPos + 1);
        }
    },[correctCount,fibPos]);

    // Make sure the timer is reset every time the component is initially accessed
    if(!hasBeenReset) {
        dispatch({
            type: RESET_TIME,
            timeLeft: 120000
        });
        setHasBeenReset(true);
    }

    //Set the gameMode in global state
    useEffect(() => {
        if(!started) {
            dispatch({
                type: SET_MODE,
                gameMode: gameMode
            })
        }
    },[dispatch,started,gameMode]);

    //Change the time font color to indicate that there is less than 30 seconds left
    useEffect(() => {
        if(state.timeLeft <= 30000) {
            setFontState('red-pill-font');
        }
        if(state.timeLeft > 0 && started) {
            setTimeout(() => {
                dispatch({
                    type: 'UPDATE_TIME',
                    timeLeft: state.timeLeft - 100
                })
            }, 100);
        }
    },[dispatch,state.timeLeft,fontState,started]);
    

    if(!started && state.timeLeft > 0) {
        return (
            <div className='flex-column'>
                <h3>Click the button below to begin!</h3>
                <button onClick={startGame}>Begin!</button>
            </div>
        )
    }

    return (
        <div className='flex-column'>
            <div className='flex-row'>
                <div>
                    <h3 className={fontState}>{formatTime(state.timeLeft)}</h3>
                </div>
                <div><h3>Score: {score}</h3></div>
                <div><h3>Streak: {streak}</h3></div>
            </div>
            <div className='flex-column'>
                <div className='flex-row'></div>
                <div className='flex-row'></div>
                <div className='flex-row'></div>
            </div>
        </div>
    )
}

export default GameRunner;