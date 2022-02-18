import React from 'react';
import GameRunner from '../../components/GameRunner';

function Easy() {
  return (
    <div className='flex-column'>
        <h2 className='font-color-blackish'>Easy Mode</h2>
        <GameRunner gameMode={'easy'} />
    </div>
  )
}

export default Easy;