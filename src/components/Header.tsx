import React from 'react';
import { Link } from 'react-router-dom';

import './Header.scss';
import Cart from './Cart';

const Header = () => {
    return (
        <header className="header">
            <nav>
                <ul className="header__list">
                    <li className="header__item">
                        <Link to="/">
                            <img
                                className="header__logo"
                                src="img/logo.png"
                                alt="logo"
                            />
                        </Link>
                    </li>
                    <li className="header__item--card">
                        <Cart />
                    </li>
                </ul>

            </nav>
        </header>
    );
}

export default Header;
