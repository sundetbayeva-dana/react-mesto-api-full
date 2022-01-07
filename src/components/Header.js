import React from 'react';
import logo from './../images/logo.svg';
import { NavLink } from 'react-router-dom';

function Header({linkText, link, onSignOut, userEmail}) {
    return (
        <header className="header">
            <img src={logo} alt="Логотип" className="header__logo" />
            <nav className="navbar">
            <p className="navbar__email">
                {userEmail}
            </p>
            <ul className="navbar__nav">
                <li>
                    <NavLink to={link} className="navbar__link" onClick={onSignOut} >{linkText}</NavLink>
                </li>
            </ul>
        </nav>
        </header>
    )
}

export default Header;