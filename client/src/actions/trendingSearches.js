import axios from 'axios';
import { setAlert } from './alert';

import {
  TRENDING_SEARCH
} from './types';


// Create search for properties
export const getTrendingSearchHistory = () => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    const res = await axios.post('api/houses/search/trendingSearches', config)
    dispatch({
      type: TRENDING_SEARCH,
      payload: res.data
    })

  } catch (err) {
    const errors = err.response.data.errors;
    if(errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    };
  }
};