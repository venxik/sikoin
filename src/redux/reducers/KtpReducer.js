import { ADD_KTP } from '../types';

const initialState = {
  ktpData: null,
  error: null,
};

const KtpReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_KTP: {
      return {
        ...state,
        ktpData: action.payload,
      };
    }
    default:
      return state;
  }
};

export default KtpReducer;
