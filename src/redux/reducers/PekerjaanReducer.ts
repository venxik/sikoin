import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit';

export type PekerjaanResponse = {
  pekerjaan?: string;
  detailPekerjaan?: string;
  masaKerjaTahun?: number;
  masaKerjaBulan?: number;
  gajiBulanan?: string;
  namaPerusahaan?: string;
  alamatKantor?: string;
  provinsi?: string;
  kota?: string;
};

interface RootState {
  pekerjaanData: PekerjaanResponse | null;
  error?: unknown;
}

const initialState: RootState = {
  pekerjaanData: null,
};

const pekerjaanSlice = createSlice({
  name: 'pekerjaanSlice',
  initialState,
  reducers: {
    addPekerjaan: (state: RootState, { payload }: PayloadAction<PekerjaanResponse>) => {
      state.pekerjaanData = payload;
    },
    getPekerjaanSuccess: (state: RootState, { payload }: PayloadAction<PekerjaanResponse>) => {
      state.pekerjaanData = payload;
    },
    getPekerjaanFailed: (state: RootState, { payload }: PayloadAction<unknown>) => {
      state.error = payload;
    },
    updatePekerjaanSuccess: (state: RootState, { payload }: PayloadAction<PekerjaanResponse>) => {
      state.pekerjaanData = payload;
    },
    updatePekerjaanFailed: (state: RootState, { payload }: PayloadAction<unknown>) => {
      state.error = payload;
    },
  },
});

export const fetchPekerjaan = createAction('fetchPekerjaan');
export const fetchUpdatePekerjaan = createAction<PekerjaanResponse>('fetchUpdatePekerjaan');

export const {
  addPekerjaan,
  getPekerjaanFailed,
  getPekerjaanSuccess,
  updatePekerjaanFailed,
  updatePekerjaanSuccess,
} = pekerjaanSlice.actions;

export default pekerjaanSlice.reducer;
