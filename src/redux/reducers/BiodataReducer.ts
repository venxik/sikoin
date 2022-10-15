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
  statusPernikahan: string;
  jumlahAnak: number;
};

interface RootState {
  biodataData: BiodataResponse;
  error?: unknown;
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
    statusPernikahan: '',
    jumlahAnak: 0,
  },
};

const biodataSlice = createSlice({
  name: 'biodataSlice',
  initialState,
  reducers: {
    getBiodataSuccess: (state: RootState, { payload }: PayloadAction<BiodataResponse>) => {
      state.biodataData = payload;
    },
    getBiodataFailed: (state: RootState, { payload }: PayloadAction<unknown>) => {
      state.error = payload;
    },
    updateBiodataSuccess: (state: RootState, { payload }: PayloadAction<BiodataResponse>) => {
      state.biodataData = payload;
    },
    updateBiodataFailed: (state: RootState, { payload }: PayloadAction<unknown>) => {
      state.error = payload;
    },
  },
});

export const fetchBiodata = createAction('fetchBiodata');
export const fetchUpdateBiodata = createAction<BiodataResponse>('fetchUpdateBiodata');

export const { getBiodataFailed, getBiodataSuccess, updateBiodataFailed, updateBiodataSuccess } =
  biodataSlice.actions;

export default biodataSlice.reducer;
