import { TRENDING_SEARCH } from "../actions/types";

const initialState = {
  trending: [],
  loading: true,
  error: {}
}

export default function(state=initialState, action) {
  const { type, payload } = action;

  switch(type) {
    case TRENDING_SEARCH:
      return {
        ...state,
        trending: payload,
        loading: false
      }
      default:
        return state;
  }
}