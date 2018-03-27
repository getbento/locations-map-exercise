import Types from '../actions/types';

const INITIAL_STATE = {
  active: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case Types.loader.SHOW_LOADER: {
      return { ...state, active: true };
    }
    case Types.loader.HIDE_LOADER: {
      return { ...state, active: false };
    }
    default:
      return state;
  }
};
