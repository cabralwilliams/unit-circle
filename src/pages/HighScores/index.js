import React from 'react';
import { getResults } from '../../utils/saveData';

function HighScores() {
    const easyResults = getResults('easy');
    const mediumResults = getResults('medium');
    const hardResults = getResults('hard');
    const extremeResults = getResults('extreme');
    function processData(inputData) {
        return <div>
            <div>Top Total Score: {inputData.score.score} | {inputData.score.date}</div>
            <div>Top Individual Score: {inputData.maxScore.maxScore} | {inputData.maxScore.date}</div>
            <div>Longest Streak: {inputData.maxStreak.maxStreak} | {inputData.maxStreak.date}</div>
            <div>Most Correct: {inputData.correctCount.correctCount} | {inputData.correctCount.date}</div>
        </div>
    }
    return (
        <div className='flex-column'>
            <h2 className='font-color-blackish'>High Scores</h2>
            <div className='flex-column font-color-blackish'>
                <h3>Easy Mode</h3>
                {easyResults === null ? <div>There are no Easy results yet!</div> : processData(easyResults)}
            </div>
            <div className='flex-column font-color-blackish'>
                <h3>Medium Mode</h3>
                {mediumResults === null ? <div>There are no Medium results yet!</div> : processData(mediumResults)}
            </div>
            <div className='flex-column font-color-blackish'>
                <h3>Hard Mode</h3>
                {hardResults === null ? <div>There are no Hard results yet!</div> : processData(hardResults)}
            </div>
            <div className='flex-column font-color-blackish'>
                <h3>Extreme Mode</h3>
                {extremeResults === null ? <div>There are no Extreme results yet!</div> : processData(extremeResults)}
            </div>
        </div>
    )
}

export default HighScores;