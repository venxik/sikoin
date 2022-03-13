import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  ktpData: { gambarKtp: null, noKtp: '' },
  error: null,
};

const ktpSlice = createSlice({
  name: 'ktpSlice',
  initialState,
  reducers: {
    addKtpImage: (state, { payload }) => {
      state.ktpData.gambarKtp = payload;
    },
    addKtpNumber: (state, { payload }) => {
      state.ktpData.noKtp = payload;
    },
    addKtpSuccess: (state, { payload }) => {
      state.ktpData = payload;
    },
    addKtpFailed: (state, { payload }) => {
      state.error = payload;
    },
  },
});

export const { addKtpImage, addKtpNumber, addKtpFailed, addKtpSuccess } =
  ktpSlice.actions;

export default ktpSlice.reducer;
