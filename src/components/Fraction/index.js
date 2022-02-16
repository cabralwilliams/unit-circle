import React from 'react';
import Radical from '../Radical';

function Fraction(props) {
    let preface = props.isNegative ? "-" : "";
    const mainEl = props.isRadical ? <Radical numVal={props.numVal} /> : <span>{props.numVal}</span>;
    return (
        <div className='flex-column'>
            <div className='fraction-line'>
                {preface}
                {mainEl}
            </div>
            <div>
                <span>{props.denVal}</span>
            </div>
        </div>
    )
}

export default Fraction;