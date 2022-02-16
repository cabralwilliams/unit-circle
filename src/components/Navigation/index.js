import React from 'react';
import { Link } from 'react-router-dom';

function Navigation() {
    const links = [
        {
            displayName: "Home",
            href: "/"
        },
        {
            displayName: "Easy",
            href: "/easy"
        },
        {
            displayName: "Hard",
            href: "hard"
        },
        {
            displayName: "Extreme",
            href: "extreme"
        }
    ];
    return (
        <nav id='site-nav'>
            <ul className='flex-row' id='main-ul'>
                {
                    links.map((link, i) => {
                        return <li key={i} className='flex-row-li'><Link to={link.href}>{link.displayName}</Link></li>
                    })
                }
            </ul>
        </nav>
    )
}

export default Navigation