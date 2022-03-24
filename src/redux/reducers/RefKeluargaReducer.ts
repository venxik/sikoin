import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type KeluargaData = {
  status?: string;
  noTelp?: string;
  nama?: string;
  noKtp?: string;
};

interface RootState {
  keluargaList: KeluargaData[];
  error: null;
}

const initialState: RootState = {
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
    addKeluarga: (state, { payload }: PayloadAction<KeluargaData>) => {
      state.keluargaList.push(payload);
    },
    addKeluargaSuccess: state => {
      state.error = null;
    },
    addKeluargaFailed: (state, { payload }) => {
      state.error = payload;
    },
    deleteKeluarga: (state, { payload }: PayloadAction<KeluargaData>) => {
      state.keluargaList = state.keluargaList.filter(
        item => item.status?.toLowerCase() != payload.status?.toLowerCase(),
      );
    },
    updateKeluarga: (state, { payload }) => {
      const { data, index } = payload || {};
      state.keluargaList[index] = data;
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
