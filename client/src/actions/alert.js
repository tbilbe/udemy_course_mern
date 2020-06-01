import { SET_ALERT, REMOVE_ALERT} from './types';
const uuid = require('uuid');

export const setAlert = (message, alertType, timeout = 4000) => dispatch => {
  const id = uuid.v4();
  dispatch({
    type: SET_ALERT,
    payload: { message, alertType, id }
  });
  setTimeout(() => dispatch({type: REMOVE_ALERT, payload: id}), timeout);
};
