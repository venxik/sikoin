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
  status_pernkahan: string;
  jumlah_anak: number;
  pekerjaan: string;
  detail_pekerjaan: string;
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
    status_pernkahan: '',
    jumlah_anak: 0,
    pekerjaan: '',
    detail_pekerjaan: '',
  },
};

const biodataSlice = createSlice({
  name: 'biodataSlice',
  initialState,
  reducers: {
    fetchBiodataSuccess: (
      state,
      { payload }: PayloadAction<BiodataResponse>,
    ) => {
      state.biodataData = payload;
    },
    fetchBiodataFailed: (state, { payload }) => {
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
  fetchBiodataFailed,
  fetchBiodataSuccess,
  updateBiodataFailed,
  updateBiodataSuccess,
} = biodataSlice.actions;

export default biodataSlice.reducer;
