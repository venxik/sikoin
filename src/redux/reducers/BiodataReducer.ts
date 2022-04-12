import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit';

export type BiodataResponse = {
  profiePic: string;
  nama: string;
  tempatLahir: string;
  tanggalLahir: string;
  jenisKelamin: string;
  golDarah: string;
  kewarganegaraan: string;
  pendidikanTerakhir: string;
  agama: string;
  bank: string;
  noRek: string;
  statusPernkahan: string;
  jumlahAnak: number;
};

interface RootState {
  biodataData: BiodataResponse;
  error?: string | null;
}

const initialState: RootState = {
  biodataData: {
    profiePic: '',
    nama: '',
    tempatLahir: '',
    tanggalLahir: '',
    jenisKelamin: '',
    golDarah: '',
    kewarganegaraan: '',
    pendidikanTerakhir: '',
    agama: '',
    bank: '',
    noRek: '',
    statusPernkahan: '',
    jumlahAnak: 0,
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
