import { ADD_TTD } from '../types';

const initialState = {
  ttdBase64: '',
  error: null,
};

const TtdReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TTD: {
      return {
        ...state,
        ttdBase64: action.payload,
      };
    }
    default:
      return state;
  }
};

export default TtdReducer;
