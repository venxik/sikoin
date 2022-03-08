import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  ttdBase64: '',
  error: null,
};

const ttdSlice = createSlice({
  name: 'ttdSlice',
  initialState,
  reducers: {
    addTtd: (state, { payload }) => {
      const { signature } = payload || {};
      console.log('hehe', signature);
      state.ttdBase64 = signature;
    },
    addTtdSuccess: (state, { payload }) => {
      state.ttdBase64 = payload;
    },
    addTtdFailed: (state, { payload }) => {
      state.error = payload;
    },
  },
});

export const { addTtd, addTtdFailed, addTtdSuccess } = ttdSlice.actions;

export default ttdSlice.reducer;
