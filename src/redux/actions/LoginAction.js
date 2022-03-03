import { SET_EMAIL } from '../types';

const setEmailToReducer = email => {
  return {
    type: SET_EMAIL,
    payload: email,
  };
};

export { setEmailToReducer };
