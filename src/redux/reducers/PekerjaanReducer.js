import { ADD_PEKERJAAN } from '../types';

const initialState = {
  pekerjaanData: null,
  error: null,
};

const PekerjaanReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_PEKERJAAN: {
      return {
        ...state,
        pekerjaanData: action.payload,
      };
    }
    default:
      return state;
  }
};

export default PekerjaanReducer;
