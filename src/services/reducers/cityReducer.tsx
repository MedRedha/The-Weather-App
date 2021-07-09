import {HAS_CITY} from '../constants';

const initialState = {
  hasCity: false,
};

function cityReducer(state = initialState, action) {
  switch (action.type) {
    case HAS_CITY:
      return {
        ...state,
        hasCity: action.value,
      };
    default:
      return state;
  }
}

export default cityReducer;
