import { ADD_BIODATA } from '../types';

const addBiodataToReducer = data => {
  return {
    type: ADD_BIODATA,
    payload: data,
  };
};

export default { addBiodataToReducer };
