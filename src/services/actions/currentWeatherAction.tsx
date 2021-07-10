import axios from 'axios';

import {API_KEY, BASE_URL, CURRENT_WEATHER_API} from '../api/api.constant';
import {
  WEATHER_FETCH_SUCCESS,
  WEATHER_FETCH_START,
  WEATHER_FETCH_ERROR,
} from '../constants';

export const getCurrentWeather = (city) => async (dispatch) => {
  dispatch({type: WEATHER_FETCH_START});
  try {
    const res = await axios.get(BASE_URL + CURRENT_WEATHER_API, {
      params: {
        key: API_KEY,
        city,
      },
    });
    dispatch({type: WEATHER_FETCH_SUCCESS, value: res.data});
  } catch (error) {
    dispatch({type: WEATHER_FETCH_ERROR, value: error.data});
    return error;
  }
};
