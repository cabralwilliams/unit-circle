import React from 'react';
import Navigation from '../Navigation';

function Header({ selectedLink, setSelectedLink }) {
  return (
    <header>
        <h1 id='site-title'>Unit Circle</h1>
        <Navigation selectedLink={selectedLink} setSelectedLink={setSelectedLink} />
    </header>
  )
}

export default Header