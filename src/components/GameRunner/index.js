import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { formatTime } from '../../utils/formatTime';
import { sines, cosines, tangents, cosecants, secants, cotangents, angles } from '../../utils/trigonometryValues';
import { LOAD_BUTTONS, RESET_TIME, SET_MODE } from '../../utils/actions';
import GameButton from '../GameButton';
import TrigExpression from '../TrigExpression';
import QuestionResult from '../QuestionResult';
import { saveData } from '../../utils/saveData';

const allChoices = [sines,cosines,tangents,cosecants,secants,cotangents];
const functions = ['sin','cos','tan','csc','sec','cot'];
function getQuestionData(fIndex,angIndex,angSelector,startTime) {
    return {
        fIndex: fIndex,
        angIndex: angIndex,
        angSelector: angSelector,
        startTime: startTime
    };
}
function reorderInts(intLimit = 4) {
    const output = [Math.floor(Math.random()*intLimit)];
    do {
        let nextInt = Math.floor(Math.random()*intLimit);
        let count = 0;
        for(let i = 0; i < output.length; i++) {
            if(nextInt === output[i]) {
                count++;
                break;
            }
        }
        if(count === 0) {
            output.push(nextInt);
        }
    } while(output.length < intLimit);
    return output;
}

function GameRunner({ gameMode, setSelectedLink }) {
    // Stores the reference time
    const [referenceTime, setReferenceTime] = useState(120000);
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
    // Degree or Radian selector
    const [angleSelector, setAngleSelector] = useState(Math.floor(Math.random()*2));
    // Negative Rotation
    const [negativeRotation, setNegativeRotation] = useState(false);
    // Function Index - first question will always ask about sine or cosine in the first quadrant
    const [functionIndex, setFunctionIndex] = useState(Math.floor(Math.random()*2));

    //Overall Limits for which functions and angles will be able to be accessed
    const [fIndexLimit, setfIndexLimit] = useState(2);
    const [allowNegatives,setAllowNegatives] = useState(false);

    const [hasBeenReset,setHasBeenReset] = useState(false);
    const [fontState, setFontState] = useState('blue-pill-font-28-20')

    //Game statistics
    const [gameStats, setGameStats] = useState([]);
    //Game Data - question, answer, etc
    const [gameData, setGameData] = useState([]);
    //Max streak
    const [maxStreak, setMaxStreak] = useState(0);
    //Max Individual Score
    const [maxScore, setMaxScore] = useState(0);

    const state = useSelector(globalState => {
        return { timeLeft: globalState.timeLeft, gameMode: globalState.gameMode, buttonValues: globalState.buttonValues };
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
            setFontState('red-pill-font-28-20');
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

    //Create the game boundaries information
    useEffect(() => {
        switch(gameMode) {
            case 'medium':
                setfIndexLimit(3);
                break;
            case 'hard':
                setfIndexLimit(6);
                break;
            case 'extreme':
                setfIndexLimit(6);
                setAllowNegatives(true);
                break;
            default:
                break;
        }
    },[fIndexLimit,gameMode]);
    
    //Load the buttons
    useEffect(() => {
        // Determine whether the angle will be a negative rotation
        // if(allowNegatives && gameStats.length > 0) {
        //     const negativeAngle = Math.random() < 0.5;
        //     setNegativeRotation(negativeAngle);
        // }
        // First question will always be sine or cosine and in the first quadrant, 0 - 90
        
        let nextData;
        if(gameStats.length === 0) {
            nextData = getQuestionData(functionIndex,angleIndex,angleSelector,120000);
        } else {
            nextData = getQuestionData(functionIndex,angleIndex,angleSelector,state.timeLeft);
        }
        setGameData([...gameData, nextData]);
        //Will house the next set of buttons
        const newButtons = [];
        let tempCorrect = !negativeRotation ? allChoices[functionIndex][angleIndex] : allChoices[functionIndex][16 - angleIndex];
        if(negativeRotation) {
            // console.log(allChoices[functionIndex]);
            // console.log(16 - angleIndex);
            // console.log(tempCorrect);
        }
        const correct = {};
        for(const property in tempCorrect) {
            correct[property] = tempCorrect[property];
        }
        correct.answerCode = 0;
        //Will house the unshuffled buttons
        const tempButtons = [correct]
        //The new button order
        const buttonOrder = reorderInts();
        while(tempButtons.length < 4) {
            let funcNo = Math.floor(Math.random()*fIndexLimit);
            let matchedValues = false;
            let tempNextChoice = allChoices[funcNo][Math.floor(Math.random()*allChoices[funcNo].length)];
            let nextChoice = {};
            for(const property in tempNextChoice) {
                nextChoice[property] = tempNextChoice[property];
            }
            for(let i = 0; i < tempButtons.length; i++) {
                let totalMatches = 0;
                for(const property in nextChoice) {
                    if(nextChoice[property] === tempButtons[i][property]) {
                        totalMatches++;
                    }
                }
                if(totalMatches === 3) {
                    matchedValues = true;
                    break;
                }
            }
            if(!matchedValues) {
                nextChoice.answerCode = tempButtons.length;
                tempButtons.push(nextChoice);
            }
        }
        for(let i = 0; i < 4; i++) {
            newButtons.push(tempButtons[buttonOrder[i]]);
        }
        // console.log(newButtons);
        // console.log([newButtons[0].numerator < 0,newButtons[1].numerator < 0,newButtons[2].numerator < 0,newButtons[3].numerator < 0]);
        dispatch({
            type: LOAD_BUTTONS,
            buttonValues: newButtons
        });
        
    }, [dispatch,angleIndex,angleSelector,functionIndex,gameStats.length,allowNegatives]);

    

    function checkAndChoose(buttonId) {
        // console.log(`Button ${buttonId} was pushed!`);
        let timeEllapsed = referenceTime - state.timeLeft;
        setReferenceTime(state.timeLeft);
        // console.log(timeEllapsed/1000);
        let awardedPoints = 0;
        if(buttonId !== 0) {
            setStreak(0);
        } else {
            //Up the streak
            setStreak(streak + 1);
            //Up the correct count
            setCorrectCount(correctCount + 1);
            //Up the Fibonacci position if the next threshhold is reached
            if(correctCount >= fibonacci[fibonacci.length - 1]) {
                setFibPos(fibonacci.length - 1);
            } else if(correctCount === fibonacci[fibPos + 1]) {
                setFibPos(fibPos + 1);
            }
            awardedPoints = Math.floor(fibonacci[fibPos]/(timeEllapsed/1000)*streak);
            if(awardedPoints === 0) {
                awardedPoints = 1;
            }
            setScore(score + awardedPoints);
            // console.log(score);
            // console.log(score + awardedPoints);
            if(streak > maxStreak) {
                setMaxStreak(streak);
            }
            if(awardedPoints > maxScore) {
                setMaxScore(awardedPoints);
            }
        }
        //Reset the buttons and problem
        let storedData = { problemInfo: gameData[gameData.length - 1]};
        storedData.questionStatus = buttonId === 0;
        storedData.ellapsedTime = timeEllapsed;
        storedData.awardedPoints = awardedPoints;
        storedData.isNegative = negativeRotation;
        setGameStats([...gameStats, storedData]);
        setFunctionIndex(Math.floor(Math.random()*fIndexLimit));
        setAngleIndex(Math.floor(Math.random()*17));
        setAngleSelector(Math.floor(Math.random()*2));
        // Determine whether the angle will be a negative rotation
        if(allowNegatives && gameStats.length > 0) {
            const negativeAngle = Math.random() < 0.5;
            setNegativeRotation(negativeAngle);
        }
    }

    function reloadGame() {
        window.location.reload();
    }

    function seeHighScores() {
        setSelectedLink('/high_scores');
    }

    if(!started && state.timeLeft > 0) {
        return (
            <div className='flex-column'>
                <h3 className='font-color-blackish'>Click the button below to begin!</h3>
                <button onClick={startGame}>Begin!</button>
            </div>
        )
    }

    if(state.timeLeft <= 0) {
        const newMax = correctCount > 0 ? maxStreak + 1 : 0;
        saveData({ score, maxStreak: newMax, correctCount, gameMode, maxScore });
        return <div className='flex-column'>
            <div className='flex-row'>
                <button onClick={reloadGame}>Back Home</button>
                <button onClick={seeHighScores}>See High Scores</button>
            </div>
            <div className='flex-column'>
                <h3 className='font-color-blackish'>Your final score is {score}!</h3>
                <h3 className='font-color-blackish'>You got {correctCount} of {gameStats.length} questions correct!</h3>
                <h3 className='font-color-blackish'>Your maximum streak was {newMax}!</h3>
                <h3 className='font-color-blackish'>Your maximum individual score was {maxScore}!</h3>
                <h3 className='font-color-blackish'>Thanks for playing!</h3>
            </div>
            <ol className='font-color-blackish'>
                {gameStats.map((qData, i) => <QuestionResult key={i} resultOb={qData} />)}
            </ol>
        </div>
    }

    return (
        <div className='flex-column'>
            <div className='flex-row font-size-28-20'>
                <div className='margins-40-20'>
                    <h3 className={fontState}>{formatTime(state.timeLeft)}</h3>
                </div>
                <div className='margins-40-20'><h3 className='font-color-blackish'>Score: {score}</h3></div>
                <div className='margins-40-20'><h3 className='font-color-blackish'>Streak: {streak}</h3></div>
            </div>
            <div className='flex-column'>
                <div className='flex-row bottom-margin-40-20'>
                    <TrigExpression funcNo={functionIndex} isNegative={negativeRotation} numerator={angleSelector === 0 ? angles[angleIndex].degrees : angles[angleIndex].radians.numerator} denominator={angleSelector === 0 ? 1 : angles[angleIndex].radians.denominator} />
                </div>
                <div className='flex-row'>
                    <GameButton buttonInfo={state.buttonValues[0]} isNegative={state.buttonValues[0].numerator < 0} answerCode={state.buttonValues[0].answerCode} clickHandler={checkAndChoose} />
                    <GameButton buttonInfo={state.buttonValues[1]} isNegative={state.buttonValues[1].numerator < 0} answerCode={state.buttonValues[1].answerCode} clickHandler={checkAndChoose} />
                    <GameButton buttonInfo={state.buttonValues[2]} isNegative={state.buttonValues[2].numerator < 0} answerCode={state.buttonValues[2].answerCode} clickHandler={checkAndChoose} />
                    <GameButton buttonInfo={state.buttonValues[3]} isNegative={state.buttonValues[3].numerator < 0} answerCode={state.buttonValues[3].answerCode} clickHandler={checkAndChoose} />
                </div>
                <div className='flex-row'>

                </div>
            </div>
        </div>
    )
}

export default GameRunner;