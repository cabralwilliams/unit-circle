import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RESET_DEFAULTS } from '../../utils/actions';

function Homepage({ selectedLink, setSelectedLink }) {
    
    const sectionDescriptions = [
        {
            sectionName: "Easy",
            description: <p>Easy Unit Circle questions will only ask questions about sine and cosine values of positive angles between 0&deg; and 360&deg; (0 - 2&pi; radians).</p>
        },
        {
            sectionName: "Medium",
            description: <p>Medium Unit Circle questions include everything from the Easy mode but also include the tangent function values.</p>
        },
        {
            sectionName: "Hard",
            description: <p>Hard Unit Circle questions have the same angle constraints as do the Easy questions but will also ask about tangent, cotangent, secant, and cosecant values.</p>
        },
        {
            sectionName: "Extreme",
            description: <p>Extreme Unit Circle questions extend the angle constraints of Hard questions to -360&deg; (-2&pi; radians).</p>
        }
    ];

    function sendTheLink(event) {
        event.preventDefault();
        const targetEl = event.target.parentElement;
        setSelectedLink(targetEl.getAttribute('href'));
    }
    return (
        <div>
            {
                sectionDescriptions.map((secD, i) => {
                    return(
                        <div key={i}>
                            <a href={`/${secD.sectionName.toLowerCase()}`} onClick={sendTheLink}><h2>{secD.sectionName}</h2></a>
                            {secD.description}
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Homepage;