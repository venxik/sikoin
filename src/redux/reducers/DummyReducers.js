import { FETCH_DATA_FAILED, FETCH_DATA_SUCCESS } from '../types';

const initialState = {
  data: [],
  error: null,
};

const DummyReducers = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_DATA_SUCCESS:
      return { ...state, data: action.payload };
    case FETCH_DATA_FAILED:
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

export default DummyReducers;
