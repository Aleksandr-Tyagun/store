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
import { CATEGORY, SORT_BY } from '../constants';

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

export const getVisibleProducts = (state: RootState) => {
  const visibleProducts: Product[] = state.products.filter((item: Product) => {
    if(state.filterBy !== '' && state.filterBy !== CATEGORY.all) {
      return item.category === state.filterBy
    }

    return item
  });

  switch (state.sortBy) {
    case SORT_BY.priceAsc:
      return visibleProducts
        .sort((a, b) => a.price - b.price);

    case SORT_BY.priceDesc:
      return visibleProducts
        .sort((a, b) => b.price - a.price);

    case SORT_BY.popular:
      return visibleProducts
        .sort((a, b) => b.reviews - a.reviews);

    case SORT_BY.new:
      return visibleProducts
        .sort((a, b) => Date.parse(a.date) - Date.parse(b.date));

    default:
      return visibleProducts;
  }
}

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk)),
);

export default store;