import React, { useState } from 'react';
import classNames from 'classnames';

import './Sort.scss';
import { SORT_BY } from '../constants';
import { useDispatch, useSelector } from 'react-redux';
import { setSortBy } from '../store/sort';
import { getSortBy } from '../store';

const dropdownOptions = [
  {
    value: SORT_BY.priceDesc,
    title: 'От дорогих к дешевым',
  },
  {
    value: SORT_BY.priceAsc,
    title: 'От дешевых к дорогим',
  },
  {
    value: SORT_BY.popular,
    title: 'Популярные',
  },
  {
    value: SORT_BY.new,
    title: 'Новые',
  },
];

const Sort = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const activeSortBy = useSelector(getSortBy);

  return (
    <div className="dropdown">
      <span
        className={classNames(
          'dropdown__button',
          { 'dropdown__button--active': isOpen }
        )}
        onClick={() => setIsOpen(!isOpen)}
      >
        Сортировать
      </span>

      <ul
        className={classNames(
          'dropdown__list',
          { 'dropdown__list--active': isOpen }
        )}
      >
        {dropdownOptions.map(({ value, title }) => (
          <li key={value}>
            <button
              className={
                classNames(
                  'dropdown__item',
                  { 'dropdown__item--active': value === activeSortBy }
                )
              }
              type="button"
              onClick={() => {
                dispatch(setSortBy(value))
                setIsOpen(false)
              }}
            >
              {title}
            </button>
          </li>
        ))}
      </ul>

    </div>
  );
};

export default Sort;
