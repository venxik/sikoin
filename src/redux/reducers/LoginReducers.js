import { SET_EMAIL } from '../types';

const initialState = {
  email: null,
  error: null,
};

const LoginReducers = (state = initialState, action) => {
  switch (action.type) {
    case SET_EMAIL:
      return { ...state, email: action.payload };
    default:
      return state;
  }
};

export default LoginReducers;
