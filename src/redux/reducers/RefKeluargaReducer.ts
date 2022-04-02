import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { uniqueId } from 'lodash';

export type RefKeluargaResponse = {
  id: number;
  status: string;
  noTelp: string;
  nama: string;
  noKtp: string;
  member_koperasi_id: number;
  created_at: number;
  updated_at: number;
};

export type RefKeluargaRequest = {
  status: string;
  noTelp: string;
  nama: string;
  noKtp: string;
};

interface RootState {
  keluargaList: RefKeluargaResponse[];
  error: null;
}

const initialState: RootState = {
  keluargaList: [],
  error: null,
};

const refKeluargaSlice = createSlice({
  name: 'refKeluargaSlice',
  initialState,
  reducers: {
    fetchGetRefKeluargaSuccess: (
      state,
      { payload }: PayloadAction<RefKeluargaResponse[]>,
    ) => {
      state.keluargaList = payload;
    },
    fetchGetRefKeluargaFailed: (state, { payload }) => {
      state.error = payload;
    },
    fetchSubmitRefKeluargaSuccess: (
      state,
      { payload }: PayloadAction<RefKeluargaResponse[]>,
    ) => {
      state.keluargaList = payload;
    },
    fetchSubmitRefKeluargaFailed: (state, { payload }) => {
      state.error = payload;
    },
    fetchUpdateRefKeluargaSuccess: (
      state,
      { payload }: PayloadAction<RefKeluargaResponse[]>,
    ) => {
      state.keluargaList = payload;
    },
    fetchUpdateRefKeluargaFailed: (state, { payload }) => {
      state.error = payload;
    },
    fetchDeleteRefKeluargaSuccess: (
      state,
      { payload }: PayloadAction<RefKeluargaResponse[]>,
    ) => {
      state.keluargaList = payload;
    },
    fetchDeleteRefKeluargaFailed: (state, { payload }) => {
      state.error = payload;
    },
    addKeluarga: (state, { payload }: PayloadAction<RefKeluargaRequest>) => {
      state.keluargaList.push({
        ...payload,
        member_koperasi_id: 1,
        created_at: Date.now(),
        updated_at: Date.now(),
        id: Number.parseInt(uniqueId()),
      });
    },
    deleteKeluarga: (
      state,
      { payload }: PayloadAction<RefKeluargaRequest | null>,
    ) => {
      state.keluargaList = state.keluargaList.filter(
        item => item?.status?.toLowerCase() != payload?.status?.toLowerCase(),
      );
    },
    updateKeluarga: (
      state,
      { payload }: PayloadAction<{ data: RefKeluargaRequest; index?: number }>,
    ) => {
      const { data, index } = payload || {};
      if (index !== undefined)
        state.keluargaList[index] = {
          ...data,
          member_koperasi_id: 1,
          created_at: Date.now(),
          updated_at: Date.now(),
          id: Number.parseInt(uniqueId()),
        };
    },
  },
});

export const fetchGetRefKeluarga = createAction('fetchGetRefKeluarga');
export const fetchUpdateRefKeluarga = createAction<{
  data: RefKeluargaRequest;
  id: number;
}>('fetchUpdateRefKeluarga');
export const fetchSubmitRefKeluarga = createAction<RefKeluargaRequest>(
  'fetchSubmitRefKeluarga',
);

export const {
  addKeluarga,
  deleteKeluarga,
  updateKeluarga,
  fetchDeleteRefKeluargaFailed,
  fetchDeleteRefKeluargaSuccess,
  fetchGetRefKeluargaFailed,
  fetchGetRefKeluargaSuccess,
  fetchSubmitRefKeluargaFailed,
  fetchSubmitRefKeluargaSuccess,
  fetchUpdateRefKeluargaFailed,
  fetchUpdateRefKeluargaSuccess,
} = refKeluargaSlice.actions;

export default refKeluargaSlice.reducer;
