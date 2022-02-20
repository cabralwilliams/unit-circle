import React from 'react';

function Navigation({ selectedLink, setSelectedLink }) {
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
            displayName: "Medium",
            href: "/medium"
        },
        {
            displayName: "Hard",
            href: "/hard"
        },
        {
            displayName: "Extreme",
            href: "/extreme"
        },
        {
            displayName: "High Scores",
            href: "/high_scores"
        }
    ];

    function sendTheLink(event) {
        event.preventDefault();
        const targetEl = event.target;
        setSelectedLink(targetEl.getAttribute('href'));
    }
    return (
        <nav id='site-nav'>
            <ul className='flex-row' id='main-ul'>
                {
                    links.map((link, i) => {
                        return <li key={i} className='flex-row-li'><a href={link.href} className={link.href === selectedLink ? 'navActive' : ''} onClick={sendTheLink}>{link.displayName}</a></li>
                    })
                }
            </ul>
        </nav>
    )
}

export default Navigation