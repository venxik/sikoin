import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit';

export type DokumenData = {
  id: number;
  namaFile: string;
  deskripsi: string;
  dokumen: string;
  waktu: string;
  extension: string;
};

interface RootState {
  dokumenDataList: DokumenData[];
  error?: unknown;
}

const initialState: RootState = {
  dokumenDataList: [],
};

const dokumenSlice = createSlice({
  name: 'dokumenSlice',
  initialState,
  reducers: {
    fetchDokumenSuccess: (state: RootState, { payload }: PayloadAction<DokumenData[]>) => {
      state.dokumenDataList = payload;
    },
    fetchDokumenFailed: (state: RootState, { payload }: PayloadAction<unknown>) => {
      state.error = payload;
    },
  },
});

export const fetchDokumen = createAction('fetchDokumen');

export const { fetchDokumenFailed, fetchDokumenSuccess } = dokumenSlice.actions;

export default dokumenSlice.reducer;
