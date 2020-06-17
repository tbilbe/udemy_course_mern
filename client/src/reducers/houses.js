import {
  GET_HOUSES,  GET_HOUSES_ERROR
} from '../actions/types';

const initialState = {
  profile: null, 
  houses: null,
  loading: true,
  error: {}
}

export default function(state=initialState, action) {

  const { type, payload } = action;

  switch(type) {
    case GET_HOUSES:
      return {
        ...state,
        houses: payload,
        loading: false
      }
    case GET_HOUSES_ERROR:
      return {
        ...state,
        houses: null,
        loading: false,
      }
    default:
      return initialState
  }
}