import axios from 'axios';
import { setAlert } from './alert';

import {
  PROPERTY_SEARCH,
  PROPERTY_SEARCH_FAIL
} from './types';


// Create search for properties
export const addPropertiesToPortfolio = (formData, history) => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    const res = await axios.post('api/houses/search/customsearch', formData, config)
    dispatch({
      type: PROPERTY_SEARCH,
      payload: res.data
    })

    dispatch(setAlert('Property Search Started added', 'success', 8000));
    history.push('/dashboard');

  } catch (err) {
    const errors = err.response.data.errors;
    if(errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    };

    dispatch({
      type: PROPERTY_SEARCH_FAIL,
      payload: { msg: err.response.statusText, status: err.response.status}
    })
  }
};