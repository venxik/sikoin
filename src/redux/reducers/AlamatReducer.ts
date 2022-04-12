import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { uniqueId } from 'lodash';

export type AlamatDataResponse = {
  id?: number;
  judul: string;
  alamat: string;
  rt: string;
  rw: string;
  provinsi: string;
  kabupaten: string;
  kecamatan: string;
  kodePos: string;
};

interface RootState {
  alamatList: AlamatDataResponse[];
  error: null;
}

const initialState: RootState = {
  alamatList: [
    {
      id: 1,
      judul: 'Test',
      alamat: 'Lorem Ipsum adasdsa dsa das de Dne djheADHbaiudQ DB',
      rt: '02',
      rw: '04',
      provinsi: 'Jakarta',
      kabupaten: 'Jakarta',
      kecamatan: 'Jakarta',
      kodePos: '12321',
    },
  ],
  error: null,
};

const alamatSlice = createSlice({
  name: 'alamatSlice',
  initialState,
  reducers: {
    getAlamatListSuccess: (
      state,
      { payload }: PayloadAction<AlamatDataResponse[]>,
    ) => {
      state.alamatList = payload;
    },
    getAlamatListFailed: (state, { payload }) => {
      state.error = payload;
    },
    submitAlamatSuccess: (
      state,
      { payload }: PayloadAction<AlamatDataResponse[]>,
    ) => {
      state.alamatList = payload;
    },
    submitAlamatFailed: (state, { payload }) => {
      state.error = payload;
    },
    updateAlamatSuccess: (
      state,
      { payload }: PayloadAction<AlamatDataResponse[]>,
    ) => {
      state.alamatList = payload;
    },
    updateAlamatFailed: (state, { payload }) => {
      state.error = payload;
    },
    addAlamat: (state, { payload }: PayloadAction<AlamatDataResponse>) => {
      state.alamatList.push({
        ...payload,
        id: Number.parseInt(uniqueId()),
      });
    },
    deleteAlamat: (
      state,
      { payload }: PayloadAction<AlamatDataResponse | null>,
    ) => {
      state.alamatList = state.alamatList.filter(
        item => item.judul.toLowerCase() != payload?.judul?.toLowerCase(),
      );
    },
    updateAlamat: (
      state,
      { payload }: PayloadAction<{ data: AlamatDataResponse; index?: number }>,
    ) => {
      const { data, index } = payload || {};
      if (index !== undefined)
        state.alamatList[index] = {
          ...data,
          id: Number.parseInt(uniqueId()),
        };
    },
  },
});

export const fetchAlamatList = createAction('fetchAlamatList');
export const fetchUpdateAlamat = createAction<{
  data: AlamatDataResponse;
  id: number;
}>('fetchUpdateAlamat');
export const fetchSubmitAlamat =
  createAction<AlamatDataResponse>('fetchSubmitAlamat');

export const {
  addAlamat,
  deleteAlamat,
  updateAlamat,
  getAlamatListFailed,
  getAlamatListSuccess,
  updateAlamatFailed,
  updateAlamatSuccess,
  submitAlamatFailed,
  submitAlamatSuccess,
} = alamatSlice.actions;

export default alamatSlice.reducer;
