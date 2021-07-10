import {
  HAS_CITY,
  SELECTED_CITY,
  WEATHER_FETCH_ERROR,
  WEATHER_FETCH_START,
  WEATHER_FETCH_SUCCESS,
} from '../constants';

const initialState = {
  hasCity: false,
  selectedCity: '',
  weather: {
    isLoading: false,
    info: {},
    error: null,
  },
};

function weatherReducer(state = initialState, action) {
  switch (action.type) {
    case HAS_CITY:
      return {
        ...state,
        hasCity: action.value,
      };
    case SELECTED_CITY:
      return {
        ...state,
        selectedCity: action.value,
      };
    case WEATHER_FETCH_START:
      return {
        ...state,
        weather: {
          isLoading: true,
          error: null,
        },
      };
    case WEATHER_FETCH_SUCCESS:
      return {
        ...state,
        weather: {
          isLoading: false,
          info: action.value,
          error: null,
        },
      };
    case WEATHER_FETCH_ERROR:
      return {
        ...state,
        weather: {
          isLoading: false,
          error: action.value,
        },
      };
    default:
      return state;
  }
}

export default weatherReducer;
