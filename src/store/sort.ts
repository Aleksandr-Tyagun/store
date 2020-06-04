import { AnyAction } from 'redux';

import { SORT_BY } from '../constants';

const SET_SORT_BY = 'SET_SORT_BY';

export const setSortBy = (field: string) => ({ type: SET_SORT_BY, field });

const reducer = (sortBy = SORT_BY.priceDesc, action: AnyAction) => {
  switch (action.type) {
    case SET_SORT_BY:
      return action.field;

    default:
      return sortBy;
  }
};

export default reducer;