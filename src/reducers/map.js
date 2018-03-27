import Types from '../actions/types';

const INITIAL_STATE = {
  error: null,
  locations: [],
  activeLocation: null
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case Types.map.ERROR: {
      let { error } = action;
      return {
        ...state,
        error
      };
    }

    case Types.map.SET_DATA: {
      let { locations } = action;
      return {
        ...state,
        locations
      };
    }
    case Types.map.SET_ACTIVE_LOCATION: {
      let { activeLocation } = action;
      return {
        ...state,
        activeLocation
      };
    }
    default:
      return state;
  }
};
