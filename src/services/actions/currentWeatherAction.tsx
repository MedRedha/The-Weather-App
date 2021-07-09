import axios from 'axios';

import {BASE_URL, CURRENT_WEATHER_API} from '../api/api.constant';

export const getCurrentWeather = () => async (dispatch) => {
  console.log('------------ACTION-------------', dispatch);
  try {
    const res = await axios.get(BASE_URL + CURRENT_WEATHER_API);
    console.log(res);
  } catch (error) {
    return error;
  }
};
