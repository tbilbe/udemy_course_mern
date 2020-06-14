import axios from 'axios';
import { setAlert } from './alert';

import {
  GET_PROFILE,
  PROFILE_ERROR,
  UPDATE_PROFILE,
  CLEAR_PROFILE,
  ACCOUNT_DELETED
} from './types';

export const getCurrentProfile = () => async dispatch => {
  try {
    const res = await axios.get('api/profile/me');

    dispatch({
      type: GET_PROFILE,
      payload: res.data
    })
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status}
    })
  }
}

// to create or update profile
export const createProfile = (formData, history, edit = false) => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    const res = await axios.post('/api/profile', formData, config)
    dispatch({
      type: GET_PROFILE,
      payload: res.data
    })

    dispatch(setAlert(edit ? 'Profile Updated' : 'Profile Created', 'success', 8000));

    if (!edit) {
      history.push('/dashboard');
    }


  } catch (err) {
    const errors = err.response.data.errors;
    if(errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    };

    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status}
    })
  }
}


// Add Portfolio properties
export const addPropertiesToPortfolio = (formData, history) => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    const res = await axios.put('/api/profile/portfolio', formData, config)
    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data
    })

    dispatch(setAlert('Portfolio property added', 'success', 8000));
    history.push('/dashboard');

  } catch (err) {
    const errors = err.response.data.errors;
    if(errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    };

    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status}
    })
  }
};

// delete the portfolio
export const deletePropertiesFromPortfolio = (id) => async dispatch => {
  
  dispatch({
    type: UPDATE_PROFILE,
    payload: id
  })
  dispatch(setAlert(`hello! ${id}`,'success'));
  
  // try {
  //   const res = await axios.delete(`/api/profile/portfolio/${id}`);

  //   dispatch({
  //     type: UPDATE_PROFILE,
  //     payload: res.data
  //   })
  //   dispatch(setAlert('Portfolio property removed', 'success', 8000));
  // } catch (err) {
  //   dispatch({
  //     type: PROFILE_ERROR,
  //     payload: { msg: err.response.statusText, status: err.response.status}
  //   })
  // }
}

// delete the favorite house from Portfolio
// export const deletePropertiesFromFavorites = () => async dispatch => {
//   try {
//     const res = await axios.delete(`api/profile/`)
//   } catch (err) {
//     dispatch({
//       type: PROFILE_ERROR,
//       payload: { msg: err.response.statusText, status: err.response.status}
//     })
//   }
// }

// TODO - NEED TO ADD THE EXPERIENCE MODEL AND ENDPOINTS ON THE BACKEND
// Add Experience
// export const addExperience = (formData, history) = async dispatch => {
//   try {
//     const config = {
//       headers: {
//         'Content-Type': 'application/json'
//       }
//     }
//     const res = await axios.put('/api/profile/experience', formData, config)
//     dispatch({
//       type: UPDATE_PROFILE,
//       payload: res.data
//     })

//     dispatch(setAlert('Property experience added', 'success', 8000));
//     history.push('/dashboard');

//   } catch (err) {
//     const errors = err.response.data.errors;
//     if(errors) {
//       errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
//     };

//     dispatch({
//       type: PROFILE_ERROR,
//       payload: { msg: err.response.statusText, status: err.response.status}
//     })
//   }
// };







/*
 Delete the Profile and Account
*/
export const deleteAccountAndProfile = () => async dispatch => {
  
  if(window.confirm('Are you sure? this cannot be undone!')) {
    try {
      await axios.delete(`/api/profile/`);
  
      dispatch({type: CLEAR_PROFILE})
      dispatch({type: ACCOUNT_DELETED})
      dispatch(setAlert('Your account has been permenantly deleted', 'danger', 8000));
    } catch (err) {
      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status}
      })
    }
  }
  
  
}