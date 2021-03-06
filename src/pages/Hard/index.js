import React from 'react';
import GameRunner from '../../components/GameRunner';

function Hard({ setSelectedLink }) {
    return (
        <div className='flex-column'>
            <h2 className='font-color-blackish'>Hard Mode</h2>
            <GameRunner gameMode={'hard'} setSelectedLink={setSelectedLink} />
        </div>
    )
}

export default Hard;