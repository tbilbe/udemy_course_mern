import axios from 'axios';
import { setAlert } from './alert';

import {
  PROPERTY_SEARCH,
  PROPERTY_SEARCH_FAIL,
  PROPERTY_ADD_FAVOURITE,
  PROPERTY_ADD_FAVOURITE_FAIL
} from './types';


// Create search for properties
export const searchForPropertyDeals = formData => async dispatch => {
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

    dispatch(setAlert('Property Search Started', 'success'));
    // history.push('/dashboard');

  } catch (err) {
    // const errors = err.response.data.errors;
    // if(errors) {
    //   errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    // };

    dispatch({
      type: PROPERTY_SEARCH_FAIL,
      payload: { msg: err, status: err.response.status}
    })
  }
};

// create favourites
export const addPropertiesToFavourites = id => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    const res = await axios.put('api/profile/favourites/property', id, config)
    dispatch({
      type: PROPERTY_ADD_FAVOURITE,
      payload: res.data
    })
  } catch (err) {
    dispatch({
      type: PROPERTY_ADD_FAVOURITE_FAIL,
      payload: { msg: err, status: err.response.status}
    })
  }
}