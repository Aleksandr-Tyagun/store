import { AnyAction } from 'redux';


const SET_SIDEBAR = 'SET_SIDEBAR';

export const setSidebar = (value: boolean) => ({ type: SET_SIDEBAR, value });

const reducer = (isSidebarOpen: boolean = false, action: AnyAction) => {
  switch (action.type) {
    case SET_SIDEBAR:
      return action.value;

    default:
      return isSidebarOpen;
  }
};

export default reducer;
