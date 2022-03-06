import { ADD_PEKERJAAN } from '../types';

const addPekerjaanDataToReducer = data => {
  return {
    type: ADD_PEKERJAAN,
    payload: data,
  };
};

export default { addPekerjaanDataToReducer };
