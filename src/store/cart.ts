import { AnyAction } from 'redux';


const ADD_TO_CART = 'ADD_TO_CART';
const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
const SET_QUANTITY = 'SET_QUANTITY';

export const addToCart = (cartItem: CartItem) => ({ type: ADD_TO_CART, cartItem });
export const removeFromCart = (itemId: CartItem) => ({ type: REMOVE_FROM_CART, itemId });
export const setQuantity = (itemId: number, amount: number) => ({ type: SET_QUANTITY, itemId, amount });

const reducer = (cart: CartItem[] = [], action: AnyAction) => {
  switch (action.type) {
    case ADD_TO_CART:
      if(cart.some(item => item.id === action.cartItem.id)) {
        return cart.map(item => {
          if(item.id === action.cartItem.id) {
            return {
              ...item,
              quantity: item.quantity + 1,
            }
          }

          return item
        })
      }

      return [...cart, action.cartItem];

    case SET_QUANTITY: 
      return cart.map(item => {
        if(item.id === action.itemId) {
          const result = item.quantity + action.amount

          return {
            ...item,
            quantity: result
          }
        }

        return item
      })

    case REMOVE_FROM_CART: 
      return cart.filter(item => item.id !== action.itemId)

    default:
      return cart;
  }
};

export default reducer;
