import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  keluargaList: [
    {
      status: 'Ayah',
      noTelp: '0802121212',
      nama: 'Testing 12',
      noKtp: '313213213211321',
    },
    {
      status: 'Ibu',
      noTelp: '21321312',
      nama: 'Halo ini Ibu',
      noKtp: '123456789012',
    },
  ],
  error: null,
};

const refKeluargaSlice = createSlice({
  name: 'refKeluargaSlice',
  initialState,
  reducers: {
    addKeluarga: (state, { payload }) => {
      state.keluargaList.push(payload);
    },
    deleteKeluarga: (state, { payload }) => {
      state.keluargaList = state.keluargaList.filter(
        item => item.status.toLowerCase() != payload.status.toLowerCase(),
      );
    },
    updateKeluarga: (state, { payload }) => {
      const { data, index } = payload || {};
      state.keluargaList[index] = data;
    },
    addKeluargaSuccess: state => {
      state.error = null;
    },
    addKeluargaFailed: (state, { payload }) => {
      state.error = payload;
    },
  },
});

export const {
  addKeluarga,
  addKeluargaFailed,
  addKeluargaSuccess,
  deleteKeluarga,
  updateKeluarga,
} = refKeluargaSlice.actions;

export default refKeluargaSlice.reducer;
