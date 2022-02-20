import React from 'react';
import GameRunner from '../../components/GameRunner';

function Medium({ setSelectedLink }) {
    return (
        <div className='flex-column'>
            <h2 className='font-color-blackish'>Medium Mode</h2>
            <GameRunner gameMode={'medium'} setSelectedLink={setSelectedLink} />
        </div>
    )
}

export default Medium;