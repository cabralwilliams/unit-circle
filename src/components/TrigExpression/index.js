import React from 'react'

function TrigExpression(props) {
    const { funcNo, isNegative, numerator, denominator } = props;
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
            renderElement = <div className='font-size-3'>{piStripped}&pi;</div>;
        } else {
            renderElement = <div className='font-size-3'>{numerator}</div>
        }
        
    } else {
        const piStripped = numStr.replace('&pi;', '');
        renderElement = <div className='flex-column font-size-4'>
            <div className='bottom-border-blackish'>{piStripped}&pi;</div>
            <div>{denominator}</div>
        </div>
    }
    return (
        <div className='flex-row-align-center font-color-blackish'>
            <div className='font-size-3'>{trigFunctions[funcNo]}</div>
            <div className='font-size-3'>({isNegative && "-"}</div>
            {renderElement}
            <div className='font-size-3'>)</div>
        </div>
    )
}

export default TrigExpression