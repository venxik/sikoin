import { ADD_KTP } from '../types';

const addKtpDataToReducer = data => {
  return {
    type: ADD_KTP,
    payload: data,
  };
};

export default { addKtpDataToReducer };
