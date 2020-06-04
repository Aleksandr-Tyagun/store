import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { Dispatch } from 'react';

import * as api from '../helpers/api';
import { setError } from './error';
import productsReducer, { setProducts } from './products';
import sortByReducer from './sort';
import errorReducer from './error';
import cartReducer from './cart';
import sidebarReducer from './sidebar';
import filterReducer from './filter';

const rootReducer = combineReducers({
  products: productsReducer,
  errorMessage: errorReducer,
  sortBy: sortByReducer,
  cart: cartReducer,
  sidebarIsOpen: sidebarReducer,
  filterBy: filterReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export const getProducts = (state: RootState) => state.products;
export const getSortBy = (state: RootState) => state.sortBy;
export const getCartItems = (state: RootState) => state.cart;
export const getIsSidebarOpen = (state: RootState) => state.sidebarIsOpen;
export const getFilterBy = (state: RootState) => state.filterBy;

export const loadProducts = () => {
  return async (dispatch: Dispatch<any>) => {
    dispatch(setError(''));

    try {
      const products = await api.fetchProducts();

      dispatch(setProducts(products))
    } catch (e) {
      dispatch(setError(e.message));
    }
  };
};

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk)),
);

export default store;