import React from 'react';

import './Navigation.scss';

const Navigation = () => {
    return (
        <nav className="navigation">
            <ul className="navigation__list">
                <li className="navigation__item">
                    Все
                </li>
                <li className="navigation__item">
                    Плащи
                </li>
                <li className="navigation__item">
                    Кроссовки
                </li>
                <li className="navigation__item">
                    Рубашки
                </li>
                <li className="navigation__item">
                    Брюки
                </li>
            </ul>
        </nav>
    );
};

export default Navigation;
