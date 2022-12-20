import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit';

export type KoperasiDataResponse = {
  namaKoperasi: string;
  noIndukKoperasi: string;
  alamat: string;
  noTelp: string;
  website: string;
  logoKoperasi: string;
};

interface RootState {
  koperasiData: KoperasiDataResponse;
  error?: unknown;
}

const initialState: RootState = {
  koperasiData: {
    alamat: '',
    namaKoperasi: '',
    noTelp: '',
    noIndukKoperasi: '',
    website: '',
    logoKoperasi: '',
  },
};

const koperasiSlice = createSlice({
  name: 'koperasiSlice',
  initialState,
  reducers: {
    getKoperasiDataSuccess: (
      state: RootState,
      { payload }: PayloadAction<KoperasiDataResponse>,
    ) => {
      state.koperasiData = payload;
    },
    getKoperasiDataFailed: (state: RootState, { payload }: PayloadAction<unknown>) => {
      state.error = payload;
    },
  },
});

export const fetchKoperasiData = createAction('fetchKoperasiData');

export const { getKoperasiDataFailed, getKoperasiDataSuccess } = koperasiSlice.actions;

export default koperasiSlice.reducer;
