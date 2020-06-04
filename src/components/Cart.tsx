import React from 'react';
import classNames from 'classnames';

import './Cart.scss';
import { getCartItems, getIsSidebarOpen } from '../store';
import { useSelector, useDispatch } from 'react-redux';
import { setSidebar } from '../store/sidebar';

const Cart = () => {
  const itemsCount = useSelector(getCartItems);
  const isSidebarOpen = useSelector(getIsSidebarOpen);
  const dispatch = useDispatch();

  return (
    <div
      className="cart"
      onClick={() => {
        if (itemsCount.length > 0) {
          dispatch(setSidebar(!isSidebarOpen))
        }
      }}
    >
      <button
        className={classNames(
          'cart__button',
          { 'cart__button--active': itemsCount.length !== 0 }
        )}
        type="button"
      />
      {itemsCount.length !== 0 && (
        <span
          className="cart__count"
        >
          {itemsCount.length}
        </span>
      )}
    </div>
  );
};

export default Cart;