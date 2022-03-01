import { SET_EMAIL } from '../types';

const setEmailToReducer = email => ({
  type: SET_EMAIL,
  payload: email,
});

export { setEmailToReducer };
