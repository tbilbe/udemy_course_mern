import {
  GET_HOUSES, GET_HOUSES_ERROR
} from './types'


// get all searched houses
export const getHouses = () => async dispatch => {
  // can just dispatch something to clear the state if needed! 
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    const res = await axios.get('/api/search/houses', formData, config)
    dispatch({
      type: GET_HOUSES,
      payload: res.data
    })
  } catch (err) {
    const errors = err.response.data.errors;
    if(errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    };

    dispatch({
      type: GET_HOUSES_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status}
    })
  }
}

// get house by id
export const getHouseById = (id) => async dispatch => {
  // can just dispatch something to clear the state if needed! 
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    const res = await axios.get(`/api/search/houses`, formData, config)
    dispatch({
      type: GET_HOUSES,
      payload: res.data
    })
  } catch (err) {
    const errors = err.response.data.errors;
    if(errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    };

    dispatch({
      type: GET_HOUSES_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status}
    })
  }
}

// get all houses for 15% roi

// get all houses for 20% roi