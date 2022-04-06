import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit';

export type PekerjaanResponse = {
  pekerjaan?: string;
  detailPekerjaan?: string;
  masaKerjaTahun?: string;
  masaKerjaBulan?: string;
  gajiBulanan?: string;
  namaPerusahaan?: string;
  alamatKantor?: string;
  provinsiKota?: string;
};

interface RootState {
  pekerjaanData: PekerjaanResponse | null;
  error?: string | null;
}

const initialState: RootState = {
  pekerjaanData: null,
};

const pekerjaanSlice = createSlice({
  name: 'pekerjaanSlice',
  initialState,
  reducers: {
    addPekerjaan: (state, { payload }: PayloadAction<PekerjaanResponse>) => {
      state.pekerjaanData = payload;
    },
    getPekerjaanSuccess: (
      state,
      { payload }: PayloadAction<PekerjaanResponse>,
    ) => {
      state.pekerjaanData = payload;
    },
    getPekerjaanFailed: (state, { payload }) => {
      state.error = payload;
    },
    updatePekerjaanSuccess: (
      state,
      { payload }: PayloadAction<PekerjaanResponse>,
    ) => {
      state.pekerjaanData = payload;
    },
    updatePekerjaanFailed: (state, { payload }) => {
      state.error = payload;
    },
  },
});

export const fetchPekerjaan = createAction('fetchPekerjaan');
export const fetchUpdatePekerjaan = createAction<PekerjaanResponse>(
  'fetchUpdatePekerjaan',
);
export const {
  addPekerjaan,
  getPekerjaanFailed,
  getPekerjaanSuccess,
  updatePekerjaanFailed,
  updatePekerjaanSuccess,
} = pekerjaanSlice.actions;

export default pekerjaanSlice.reducer;
