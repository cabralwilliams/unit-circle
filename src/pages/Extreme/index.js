import React from 'react';
import GameRunner from '../../components/GameRunner';

function Extreme() {
    return (
      <div className='flex-column'>
          <h2 className='font-color-blackish'>Extreme Mode</h2>
          <GameRunner gameMode={'extreme'} />
      </div>
    )
}

export default Extreme;