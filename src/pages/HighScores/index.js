import React from 'react';
import { getResults } from '../../utils/saveData';

function HighScores() {
    const easyResults = getResults('easy');
    const mediumResults = getResults('medium');
    const hardResults = getResults('hard');
    const extremeResults = getResults('extreme');
    return (
        <div className='flex-column'>
            <h2 className='font-color-blackish'>High Scores</h2>
            <div className='flex-column font-color-blackish'>
                <h3>Easy Mode</h3>
                {easyResults === null ? <div>There are no Easy results yet!</div> : JSON.stringify(easyResults)}
            </div>
            <div className='flex-column font-color-blackish'>
                <h3>Medium Mode</h3>
                {mediumResults === null ? <div>There are no Medium results yet!</div> : JSON.stringify(mediumResults)}
            </div>
            <div className='flex-column font-color-blackish'>
                <h3>Hard Mode</h3>
                {hardResults === null ? <div>There are no Hard results yet!</div> : JSON.stringify(hardResults)}
            </div>
            <div className='flex-column font-color-blackish'>
                <h3>Extreme Mode</h3>
                {extremeResults === null ? <div>There are no Extreme results yet!</div> : JSON.stringify(extremeResults)}
            </div>
        </div>
    )
}

export default HighScores;