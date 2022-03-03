import { UPDATE_PROFILE } from '../types';

const setProfileDataToReducer = data => {
  return {
    type: UPDATE_PROFILE,
    payload: data,
  };
};

export { setProfileDataToReducer };
