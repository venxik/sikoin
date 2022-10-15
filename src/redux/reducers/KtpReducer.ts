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
    removeKtpImage: (state: RootState) => {
      state.ktpData.gambarKtp = '';
    },
    addKtpSelfie: (state: RootState, { payload }: PayloadAction<string>) => {
      state.ktpData.gambarSelfie = payload;
    },
    removeKtpSelfie: (state: RootState) => {
      state.ktpData.gambarSelfie = '';
    },
    fetchKtpDokumenSuccess: (state: RootState, { payload }: PayloadAction<KtpDokumenResponse>) => {
      state.ktpDokumen = payload;
    },
    fetchKtpDokumenFailed: (state: RootState, { payload }: PayloadAction<unknown>) => {
      state.error = payload;
    },
    fetchUploadGambarKtpSuccess: (
      state: RootState,
      { payload }: PayloadAction<KtpDokumenResponse>,
    ) => {
      state.ktpData = payload;
    },
    fetchUploadGambarKtpFailed: (state: RootState, { payload }: PayloadAction<unknown>) => {
      state.error = payload;
    },
  },
});

export const fetchKtpDokumen = createAction('fetchKtpDokumen');
export const fetchUploadGambarKtp = createAction<FormData>('fetchUploadGambarKtp');

export const {
  fetchKtpDokumenFailed,
  fetchKtpDokumenSuccess,
  addKtpImage,
  addKtpSelfie,
  fetchUploadGambarKtpFailed,
  fetchUploadGambarKtpSuccess,
  removeKtpImage,
  removeKtpSelfie,
} = ktpSlice.actions;

export default ktpSlice.reducer;
