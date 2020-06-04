import { AnyAction } from 'redux';


const GET_PRODUCTS = 'GET_PRODUCTS';

export const setProducts = (products: Product[]) => ({ type: GET_PRODUCTS, products });

const reducer = (products: Product[] = [], action: AnyAction) => {
  switch (action.type) {
    case GET_PRODUCTS:
      return action.products;

    default:
      return products;
  }
};

export default reducer;
