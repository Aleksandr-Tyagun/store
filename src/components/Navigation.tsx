import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';

import './Navigation.scss';
import { setFilterBy } from '../store/filter';
import { CATEGORY } from '../constants';
import { getFilterBy } from '../store';

const Navigation = () => {
  const dispatch = useDispatch();
  const activeCategory = useSelector(getFilterBy);

  return (
    <nav className="navigation">
      <ul className="navigation__list">
        {Object.entries(CATEGORY).map(([, categoryName]) => (
          <li
            className={classNames(
              'navigation__item',
              { 'navigation__item--active': activeCategory === categoryName }
            )}
            key={categoryName}
            onClick={() => dispatch(setFilterBy(categoryName))}
          >
            {categoryName}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navigation;
