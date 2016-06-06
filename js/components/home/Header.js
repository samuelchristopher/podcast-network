import React from 'react'
import { Link } from 'react-router'

let Header = (props) => (
  <div>
    <div className="header">
      <div className="nav">
        <Link className="nav__logo" to="/">Kirubaiye</Link>
      </div>
      <div className="message">
        <h1 className="message__title">All your favourites <br></br> right here</h1>
      </div>
    </div>
    <div className="line"></div>
  </div>
)

export default Header
