import React from 'react'

function TrigExpression(props) {
    const { funcNo, isNegative, numerator, denominator, fontCode } = props;
    const fontSize = !fontCode ? { small: 3, large: 4 } : fontCode;
    const trigFunctions = ['sin','cos','tan','csc','sec','cot'];
    const numStr = numerator.toString();

    //Determine whether there is a &pi; in the expression
    const containsPi = numStr.indexOf('&pi;') === -1 ? false : true;

    const numerArr = numStr.charAt(0) === '&' ? [numStr] : numStr.split('&');
    //Will determine the structure of the function argument
    let renderElement;

    if(denominator === 1) {
        if(containsPi) {
            const piStripped = numStr.replace('&pi;', '');
            renderElement = <div className={`font-size-${fontSize.small}`}>{piStripped}&pi;</div>;
        } else {
            renderElement = <div className={`font-size-${fontSize.small}`}>{numerator}</div>
        }
        
    } else {
        const piStripped = numStr.replace('&pi;', '');
        renderElement = <div className={`flex-column font-size-${fontSize.large}`}>
            <div className='bottom-border-blackish'>{piStripped}&pi;</div>
            <div>{denominator}</div>
        </div>
    }
    return (
        <div className='flex-row-align-center font-color-blackish'>
            <div className={`font-size-${fontSize.small}`}>{trigFunctions[funcNo]}</div>
            <div className={`font-size-${fontSize.small}`}>({isNegative && "-"}</div>
            {renderElement}
            <div className={`font-size-${fontSize.small}`}>)</div>
        </div>
    )
}

export default TrigExpression