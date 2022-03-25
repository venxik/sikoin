import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type KtpData = {
  gambarKtp?: string;
  gambarSelfie?: string;
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
    addKtpImage: (state, { payload }: PayloadAction<string>) => {
      state.ktpData.gambarKtp = payload;
    },
    addKtpNumber: (state, { payload }: PayloadAction<string>) => {
      state.ktpData.noKtp = payload;
    },
    addKtpSuccess: (state, { payload }) => {
      state.ktpData = payload;
    },
    addKtpFailed: (state, { payload }) => {
      state.error = payload;
    },
    addKtpSelfie: (state, { payload }: PayloadAction<string>) => {
      state.ktpData.gambarSelfie = payload;
    },
  },
});

export const {
  addKtpImage,
  addKtpNumber,
  addKtpFailed,
  addKtpSuccess,
  addKtpSelfie,
} = ktpSlice.actions;

export default ktpSlice.reducer;
