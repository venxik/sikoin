import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  ktpData: null,
  error: null,
};

const ktpSlice = createSlice({
  name: 'ktpSlice',
  initialState,
  reducers: {
    addKtp: (state, { payload }) => {
      state.ktpData = payload;
    },
    addKtpSuccess: (state, { payload }) => {
      state.ktpData = payload;
    },
    addKtpFailed: (state, { payload }) => {
      state.error = payload;
    },
  },
});

export const { addKtp, addKtpFailed, addKtpSuccess } = ktpSlice.actions;

export default ktpSlice.reducer;
