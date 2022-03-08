import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  biodataData: {
    tempatLahir: 'Jakarta',
    tanggalLahir: '10 Sep 1999',
    gender: 'Pria',
    golDarah: 'A',
    kewarganegaraan: 'Indonesia',
    pendidikanTerakhir: 'S1',
    agama: 'Kristen',
    statusPernikahan: 'Single',
    jumlahAnak: '4',
    pekerjaan: 'Main kuda',
    detailPekerjaan: 'Halo ini detail',
  },
  error: null,
};

const biodataSlice = createSlice({
  name: 'biodataSlice',
  initialState,
  reducers: {
    addBiodata: (state, { payload }) => {
      state.biodataData = payload;
    },
    addBiodataSuccess: (state, { payload }) => {
      state.biodataData = payload;
    },
    addBiodataFailed: (state, { payload }) => {
      state.error = payload;
    },
  },
});

export const { addBiodata, addBiodataFailed, addBiodataSuccess } =
  biodataSlice.actions;

export default biodataSlice.reducer;
