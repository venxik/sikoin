import { createSlice } from '@reduxjs/toolkit';

export type KtpData = {
  gambarKtp?: string;
  noKtp?: string;
};

interface RootState {
  ktpData: KtpData;
  error: object | undefined | null;
}

const initialState: RootState = {
  ktpData: { gambarKtp: '', noKtp: '' },
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
