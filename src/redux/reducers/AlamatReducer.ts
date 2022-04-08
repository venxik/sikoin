import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { uniqueId } from 'lodash';

export type AlamatDataResponse = {
  id: number;
  judul: string;
  detail: string;
  no_rt: string;
  no_rw: string;
  provinsi: string;
  kabupaten: string;
  kecamatan: string;
  kode_pos: string;
  lati: number;
  lang: number;
};

export type AlamatDataRequest = {
  judul: string;
  alamat: string;
  rt: string;
  rw: string;
  provinsi: string;
  kabupaten: string;
  kecamatan: string;
  kode_pos: string;
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
      detail: 'Lorem Ipsum adasdsa dsa das de Dne djheADHbaiudQ DB',
      no_rt: '02',
      no_rw: '04',
      provinsi: 'Jakarta',
      kabupaten: 'Jakarta',
      kecamatan: 'Jakarta',
      kode_pos: '12321',
      lang: 123213,
      lati: 131312,
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
    addAlamat: (state, { payload }: PayloadAction<AlamatDataRequest>) => {
      state.alamatList.push({
        ...payload,
        detail: payload.alamat,
        no_rt: payload.rt,
        no_rw: payload.rw,
        lati: 0,
        lang: 0,
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
      { payload }: PayloadAction<{ data: AlamatDataRequest; index?: number }>,
    ) => {
      const { data, index } = payload || {};
      if (index !== undefined)
        state.alamatList[index] = {
          ...data,
          detail: data.alamat,
          no_rt: data.rt,
          no_rw: data.rw,
          lati: 0,
          lang: 0,
          id: Number.parseInt(uniqueId()),
        };
    },
  },
});

export const fetchAlamatList = createAction('fetchAlamatList');
export const fetchUpdateAlamat = createAction<{
  data: AlamatDataRequest;
  id: number;
}>('fetchUpdateAlamat');
export const fetchSubmitAlamat =
  createAction<AlamatDataRequest>('fetchSubmitAlamat');

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
