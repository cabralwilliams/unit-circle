import React from 'react';
import GameRunner from '../../components/GameRunner';

function Easy({ setSelectedLink }) {
  return (
    <div className='flex-column'>
        <h2 className='font-color-blackish'>Easy Mode</h2>
        <GameRunner gameMode={'easy'} setSelectedLink={setSelectedLink} />
    </div>
  )
}

export default Easy;