import uuid from 'uuid/v4';
import { SET_ALERT, REMOVE_ALERT} from './types';

export const setAlert = (message, alertType, timeout = 4000) => dispatch => {
  const id = uuid();
  dispatch({
    type: SET_ALERT,
    payload: { message, alertType, id }
  });
  setTimeout(() => dispatch({type: REMOVE_ALERT, payload: id}), timeout);
};
