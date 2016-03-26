import React from 'react';

let Header = (props) => (
  <div>
    <div className="header">
      <div className="nav">
        <div className="nav__logo">Podcast<span className="nav__logo--light">Network</span></div>
      </div>
      <div className="message">
        <h1 className="message__title">All your favourites <br></br> right here</h1>
      </div>
    </div>
    <div className="line"></div>
  </div>
);

export default Header;
