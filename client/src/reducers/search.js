import {
  PROPERTY_SEARCH,
  PROPERTY_SEARCH_FAIL,
  PROPERTY_ADD_FAVOURITE,
  PROPERTY_ADD_FAVOURITE_FAIL
} from '../actions/types';


const initialState = {
  properties: [],
  loading: true,
  error: {}
};

export default function (state = initialState, action) {
  const { type, payload } = action
  switch (type) {
    case PROPERTY_SEARCH:
    case PROPERTY_ADD_FAVOURITE:
      return {
        ...state,
        properties: payload,
        loading: false
      };
    case PROPERTY_SEARCH_FAIL:
    case PROPERTY_ADD_FAVOURITE_FAIL:
      return {
        ...state,
        properties: [],
        loading: false
      }
    default:
      return initialState;
  }
};