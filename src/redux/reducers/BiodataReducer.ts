import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit';

export type BiodataResponse = {
  profie_pic: string;
  nama: string;
  tempat_lahir: string;
  tanggal_lahir: string;
  jenis_kelamin: string;
  gol_darah: string;
  kewarganegaraan: string;
  pendidikan_terakhir: string;
  agama: string;
  bank: string;
  no_rek: string;
  status_pernikahan: string;
  jumlah_anak: number;
};

interface RootState {
  biodataData: BiodataResponse;
  error?: string | null;
}

const initialState: RootState = {
  biodataData: {
    profie_pic: '',
    nama: '',
    tempat_lahir: '',
    tanggal_lahir: '',
    jenis_kelamin: '',
    gol_darah: '',
    kewarganegaraan: '',
    pendidikan_terakhir: '',
    agama: '',
    bank: '',
    no_rek: '',
    status_pernikahan: '',
    jumlah_anak: 0,
  },
  error: null,
};

const biodataSlice = createSlice({
  name: 'biodataSlice',
  initialState,
  reducers: {
    getBiodataSuccess: (state, { payload }: PayloadAction<BiodataResponse>) => {
      console.log('getBiodataSuccess', payload);

      state.biodataData = payload;
    },
    getBiodataFailed: (state, { payload }) => {
      state.error = payload;
    },
    updateBiodataSuccess: (
      state,
      { payload }: PayloadAction<BiodataResponse>,
    ) => {
      state.biodataData = payload;
    },
    updateBiodataFailed: (state, { payload }) => {
      state.error = payload;
    },
  },
});

export const fetchBiodata = createAction('fetchBiodata');
export const fetchUpdateBiodata =
  createAction<BiodataResponse>('fetchUpdateBiodata');

export const {
  getBiodataFailed,
  getBiodataSuccess,
  updateBiodataFailed,
  updateBiodataSuccess,
} = biodataSlice.actions;

export default biodataSlice.reducer;
