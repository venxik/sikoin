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
  member_koperasi_id: number;
  created_at: number;
  updated_at: number;
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
  alamatList: [],
  error: null,
};

const alamatSlice = createSlice({
  name: 'alamatSlice',
  initialState,
  reducers: {
    fetchGetAlamatSuccess: (
      state,
      { payload }: PayloadAction<AlamatDataResponse[]>,
    ) => {
      state.alamatList = payload;
    },
    fetchGetAlamatFailed: (state, { payload }) => {
      state.error = payload;
    },
    fetchSubmitAlamatSuccess: (
      state,
      { payload }: PayloadAction<AlamatDataResponse[]>,
    ) => {
      state.alamatList = payload;
    },
    fetchSubmitAlamatFailed: (state, { payload }) => {
      state.error = payload;
    },
    fetchUpdateAlamatSuccess: (
      state,
      { payload }: PayloadAction<AlamatDataResponse[]>,
    ) => {
      state.alamatList = payload;
    },
    fetchUpdateAlamatFailed: (state, { payload }) => {
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
        member_koperasi_id: 1,
        created_at: Date.now(),
        updated_at: Date.now(),
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
          member_koperasi_id: 1,
          created_at: Date.now(),
          updated_at: Date.now(),
          id: Number.parseInt(uniqueId()),
        };
    },
  },
});

export const fetchGetAlamat = createAction('fetchGetAlamat');
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
  fetchGetAlamatFailed,
  fetchGetAlamatSuccess,
  fetchUpdateAlamatFailed,
  fetchUpdateAlamatSuccess,
  fetchSubmitAlamatFailed,
  fetchSubmitAlamatSuccess,
} = alamatSlice.actions;

export default alamatSlice.reducer;
