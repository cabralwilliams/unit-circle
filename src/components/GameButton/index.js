import React from 'react';

function GameButton({ buttonInfo, clickHandler, answerCode }) {
    let numeratorElement, denominatorElement, renderElement;
    const isNegative = buttonInfo.numerator < 0;
    if(buttonInfo.denominator === 1) {
        //No denominator
        denominatorElement = null;
        if(buttonInfo.rational) {
            //Infinite value
            if(buttonInfo.numerator === Infinity) {
                renderElement = <div className='font-size-1'>&infin;</div>;
            } else {
                //Finite value and a whole number, no need for fancy rendering - may need to add styling to adjust size
                renderElement = <div className='font-size-1'>{buttonInfo.numerator}</div>
            }
        } else {
            //If the denominator is 1 and the expression is not rational, only need to know if there is negative sign.  
            renderElement = isNegative ? <div className='font-size-1'>-&radic;<span className='overline'>{-buttonInfo.numerator}</span></div> : <div className='font-size-1'>&radic;<span className='overline'>{buttonInfo.numerator}</span></div>
        }
    } else {
        // If the denominator isn't 1, we just place the denominator value inside of a div
        denominatorElement = <div>{buttonInfo.denominator}</div>;
        if(buttonInfo.rational) {
            numeratorElement = <div className='bottom-border-2'>{Math.abs(buttonInfo.numerator)}</div>;
        } else {
            if(Math.abs(buttonInfo.numerator) > 5) {
                numeratorElement = <div className='bottom-border-2'>2&radic;<span className='overline'>3</span></div>;
            } else {
                numeratorElement = <div className='bottom-border-2'>&radic;<span className='overline'>{Math.abs(buttonInfo.numerator)}</span></div>;
            }
        }
        if(isNegative) {
            renderElement = <div className='flex-row font-size-2'>
                <div>-</div>
                <div className='flex-column'>
                    {numeratorElement}
                    {denominatorElement}
                </div>
            </div>;
        } else {
            renderElement = <div className='flex-column font-size-2'>
                {numeratorElement}
                {denominatorElement}
            </div>;
        }
    }
    return (
        <button className='margins-30-15' onClick={() => { clickHandler(answerCode) }}>
            {renderElement}
        </button>
    )
}

export default GameButton