import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit';

export type KtpData = {
  gambarKtp?: string;
  gambarSelfie?: string;
  noKtp?: string;
};

export type KtpDokumenResponse = {
  linkGambarKtp: string;
  linkSelfieKtp: string;
  linkDokumen: string;
  namaDokumen: string;
  noKtp: string;
};

interface RootState {
  ktpData: KtpData;
  ktpDokumen?: KtpDokumenResponse;
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
    fetchKtpDokumenSuccess: (
      state: RootState,
      { payload }: PayloadAction<KtpDokumenResponse>,
    ) => {
      state.ktpDokumen = payload;
    },
    fetchKtpDokumenFailed: (
      state: RootState,
      { payload }: PayloadAction<unknown>,
    ) => {
      state.error = payload;
    },
    addKtpSelfie: (state: RootState, { payload }: PayloadAction<string>) => {
      state.ktpData.gambarSelfie = payload;
    },
  },
});

export const fetchKtpDokumen = createAction('fetchKtpDokumen');

export const {
  fetchKtpDokumenFailed,
  fetchKtpDokumenSuccess,
  addKtpImage,
  addKtpNumber,
  addKtpSelfie,
} = ktpSlice.actions;

export default ktpSlice.reducer;
