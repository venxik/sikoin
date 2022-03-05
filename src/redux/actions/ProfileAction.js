import { UPDATE_PROFILE, SET_EMAIL } from '../types';

const setProfileDataToReducer = data => {
  return {
    type: UPDATE_PROFILE,
    payload: data,
  };
};

const setEmailToReducer = email => {
  return {
    type: SET_EMAIL,
    payload: email,
  };
};

export default { setProfileDataToReducer, setEmailToReducer };
