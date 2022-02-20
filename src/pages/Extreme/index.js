import React from 'react';
import GameRunner from '../../components/GameRunner';

function Extreme({ setSelectedLink }) {
    return (
      <div className='flex-column'>
          <h2 className='font-color-blackish'>Extreme Mode</h2>
          <GameRunner gameMode={'extreme'} setSelectedLink={setSelectedLink} />
      </div>
    )
}

export default Extreme;