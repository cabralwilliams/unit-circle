import React from 'react';
import TrigExpression from '../TrigExpression';
import { sines, cosines, tangents, cosecants, secants, cotangents, angles } from '../../utils/trigonometryValues';


function QuestionResult({ resultOb }) {
    // console.log(resultOb);
    const trigFunctions = [sines,cosines,tangents,cosecants,secants,cotangents];
    //Element to display correct answer and numerator/denominator (if necessary)
    let numeratorElement, denominatorElement, renderElement;
    const angIndex = !resultOb.isNegative ? resultOb.problemInfo.angIndex : 16 - resultOb.problemInfo.angIndex;
    const correctOb = trigFunctions[resultOb.problemInfo.fIndex][angIndex];
    const isNegative = correctOb.numerator < 0;

    if(correctOb.denominator === 1) {
        //No denominator
        denominatorElement = null;
        if(correctOb.rational) {
            //Infinite value
            if(correctOb.numerator === Infinity) {
                renderElement = <div className='font-size-1 font-color-blackish'>&infin;</div>;
            } else {
                //Finite value and a whole number, no need for fancy rendering - may need to add styling to adjust size
                renderElement = <div className='font-size-1 font-color-blackish'>{correctOb.numerator}</div>
            }
        } else {
            //If the denominator is 1 and the expression is not rational, only need to know if there is negative sign.  
            renderElement = isNegative ? <div className='font-size-1 font-color-blackish'>-&radic;<span className='overline-blackish'>{-correctOb.numerator}</span></div> : <div className='font-size-1 font-color-blackish'>&radic;<span className='overline-blackish'>{correctOb.numerator}</span></div>
        }
    } else {
        // If the denominator isn't 1, we just place the denominator value inside of a div
        denominatorElement = <div>{correctOb.denominator}</div>;
        if(correctOb.rational) {
            numeratorElement = <div className='bottom-border-blackish'>{Math.abs(correctOb.numerator)}</div>;
        } else {
            if(Math.abs(correctOb.numerator) > 5) {
                numeratorElement = <div className='bottom-border-blackish'>2&radic;<span className='overline-blackish'>3</span></div>;
            } else {
                numeratorElement = <div className='bottom-border-blackish'>&radic;<span className='overline-blackish'>{Math.abs(correctOb.numerator)}</span></div>;
            }
        }
        if(isNegative) {
            renderElement = <div className='flex-row font-size-2  font-color-blackish'>
                <div>-</div>
                <div className='flex-column'>
                    {numeratorElement}
                    {denominatorElement}
                </div>
            </div>;
        } else {
            renderElement = <div className='flex-column font-size-2  font-color-blackish'>
                {numeratorElement}
                {denominatorElement}
            </div>;
        }
    }

    return (
        <li>
            <div className='flex-row-align-center'>
                <TrigExpression 
                    funcNo={resultOb.problemInfo.fIndex}
                    isNegative={resultOb.isNegative}
                    numerator={resultOb.problemInfo.angSelector === 0 ? angles[resultOb.problemInfo.angIndex].degrees : angles[resultOb.problemInfo.angIndex].radians.numerator}
                    denominator={resultOb.problemInfo.angSelector === 0 ? 1 : angles[resultOb.problemInfo.angIndex].radians.denominator}
                    fontCode={{ small: 5, large: 6}}
                />
                <div className='flex-row-align-center margins-30-15'>
                    <div className='font-color-blackish font-size-5'>
                        Correct Answer:{" "}
                    </div>
                    <div>
                        {renderElement}
                    </div>
                </div>
                <div className='flex-row margins-30-15'>
                    <div className='font-color-blackish font-size-5'>
                        Question Status: {resultOb.questionStatus ? "Correct" : "Incorrect"}
                    </div>
                </div>
                <div className='flex-row margins-30-15'>
                    <div className='font-color-blackish font-size-5'>
                        Ellapsed Time: {resultOb.ellapsedTime/1000}
                    </div>
                </div>
                <div className='flex-row margins-30-15'>
                    <div className='font-color-blackish font-size-5'>
                        Points Earned: {resultOb.awardedPoints}
                    </div>
                </div>
            </div>
        </li>
    )
}

export default QuestionResult;