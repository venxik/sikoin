import { ADD_TTD } from '../types';

const addTtdDataToReducer = data => {
  return {
    type: ADD_TTD,
    payload: data,
  };
};

export default { addTtdDataToReducer };
