import React from 'react'
import logo from '../images/joycard-logo.png'
import Burger from './Burger'

const Header = props => {
    return (
        <div className="header-container">
            <img src={logo} alt="joycard logo" />
            <Burger />
        </div>
    )
}

export default Header
