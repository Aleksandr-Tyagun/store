import { AnyAction } from 'redux';

import { CATEGORY } from '../constants';

const FILTER_BY = 'FILTER_BY';

export const setFilterBy = (field: string) => ({ type: FILTER_BY, field });

const reducer = (filter = CATEGORY.all, action: AnyAction) => {
  switch (action.type) {
    case FILTER_BY:
      return action.field;

    default:
      return filter;
  }
};

export default reducer;