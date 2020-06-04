import React, { useMemo, useEffect } from 'react';
import classNames from 'classnames';
import { useSelector, useDispatch } from 'react-redux';

import './Sidebar.scss';
import { getIsSidebarOpen } from '../store';
import { setSidebar } from '../store/sidebar';
import { getCartItems } from '../store';
import { setQuantity, removeFromCart } from '../store/cart';

const Sidebar = () => {
  const isSidebarOpen = useSelector(getIsSidebarOpen);
  const dispatch = useDispatch();
  const cartItems = useSelector(getCartItems);

  const cartItemsTotal = useMemo(() => {
    let total = 0;

    if (cartItems.length !== 0) {
      cartItems.map(({ price, quantity }) => total += (price * quantity))
    }

    return total;
  }, [cartItems]);

  useEffect(() => {
    cartItems.forEach(({ id, quantity }) => {
      if (quantity < 1) {
        dispatch(removeFromCart(id))
      }
    })
  }, [cartItems, dispatch]);

  useEffect(() => {
    if(cartItems.length === 0) {
      dispatch(setSidebar(false));
    }
  }, [cartItems, dispatch]);

  return (
    <aside
      className={classNames(
        'sidebar',
        { 'sidebar--opened': isSidebarOpen }
      )}
    >
      <button
        className="sidebar__close"
        onClick={() => dispatch(setSidebar(false))}
      />

      {cartItems && (
        <ul className="sidebar__list">
          {cartItems.map(({ id, title, quantity, imageUrl, price }) => (
            <li key={id} className="sidebar__item">
              <img
                className="sidebar__image"
                src={imageUrl}
                alt={title}
              />
              <div className="sidebar__details">
                <div className="sidebar__details-title">
                  {title}
                </div>
                <div className="sidebar__details-actions">
                  <div className="sidebar__details-quantity">
                    <button
                      className="sidebar__quantity-button"
                      type="button"
                      onClick={() => dispatch(setQuantity(id, -1))}
                    >
                      -
                    </button>
                    <div className="sidebar__quantity">
                      {quantity}
                    </div>
                    <button
                      className="sidebar__quantity-button"
                      type="button"
                      onClick={() => dispatch(setQuantity(id, +1))}
                    >
                      +
                    </button>
                  </div>
                  <div className="sidebar__details-price">
                    $
                    {price}
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}

      {cartItemsTotal > 0 && (
        <div className="sidebar__total">
          <div className="sidebar__total-title">
            Итого
          </div>
          <div className="sidebar__total-value">
            $
            {cartItemsTotal}
          </div>
        </div>
      )}
      <button
        className="sidebar__buy"
      >
        Купить
      </button>
    </aside>
  );
}

export default Sidebar;
