import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type KtpData = {
  gambarKtp?: string;
  gambarSelfie?: string;
  noKtp?: string;
};

interface RootState {
  ktpData: KtpData;
  error?: unknown;
}

const initialState: RootState = {
  ktpData: { gambarKtp: '', noKtp: '' },
  error: null,
};

const ktpSlice = createSlice({
  name: 'ktpSlice',
  initialState,
  reducers: {
    addKtpImage: (state: RootState, { payload }: PayloadAction<string>) => {
      state.ktpData.gambarKtp = payload;
    },
    addKtpNumber: (state: RootState, { payload }: PayloadAction<string>) => {
      state.ktpData.noKtp = payload;
    },
    addKtpSuccess: (state: RootState, { payload }: PayloadAction<KtpData>) => {
      state.ktpData = payload;
    },
    addKtpFailed: (state: RootState, { payload }: PayloadAction<unknown>) => {
      state.error = payload;
    },
    addKtpSelfie: (state: RootState, { payload }: PayloadAction<string>) => {
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
