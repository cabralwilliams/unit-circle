import React from 'react';

function Radical(props) {
  return (
    <span>&radic;<span className='overlined'>{props.numVal}</span></span>
  );
}

export default Radical;