import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type PekerjaanData = {
  masaKerjaTahun?: string;
  masaKerjaBulan?: string;
  gajiBulanan?: string;
  namaPerusahaan?: string;
  alamatKantor?: string;
  provinsiKota?: string;
  jabatanTerakhir?: string;
  noTelpKantor?: string;
};

interface RootState {
  pekerjaanData: PekerjaanData | null;
  error: null;
}

const initialState: RootState = {
  pekerjaanData: null,
  error: null,
};

const pekerjaanSlice = createSlice({
  name: 'pekerjaanSlice',
  initialState,
  reducers: {
    addPekerjaan: (state, { payload }: PayloadAction<PekerjaanData>) => {
      state.pekerjaanData = payload;
    },
    addPekerjaanSuccess: (state, { payload }: PayloadAction<PekerjaanData>) => {
      state.pekerjaanData = payload;
    },
    addPekerjaanFailed: (state, { payload }) => {
      state.error = payload;
    },
  },
});

export const { addPekerjaan, addPekerjaanFailed, addPekerjaanSuccess } =
  pekerjaanSlice.actions;

export default pekerjaanSlice.reducer;
