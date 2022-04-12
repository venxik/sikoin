import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { uniqueId } from 'lodash';

export type RefKeluargaResponse = {
  id?: number;
  status: string;
  telp: string;
  nama: string;
  ktp: string;
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
    getRefKeluargaSuccess: (
      state,
      { payload }: PayloadAction<RefKeluargaResponse[]>,
    ) => {
      state.keluargaList = payload;
    },
    getRefKeluargaFailed: (state, { payload }) => {
      state.error = payload;
    },
    submitRefKeluargaSuccess: (
      state,
      { payload }: PayloadAction<RefKeluargaResponse[]>,
    ) => {
      state.keluargaList = payload;
    },
    submitRefKeluargaFailed: (state, { payload }) => {
      state.error = payload;
    },
    updateRefKeluargaSuccess: (
      state,
      { payload }: PayloadAction<RefKeluargaResponse[]>,
    ) => {
      state.keluargaList = payload;
    },
    updateRefKeluargaFailed: (state, { payload }) => {
      state.error = payload;
    },
    deleteRefKeluargaSuccess: (
      state,
      { payload }: PayloadAction<RefKeluargaResponse[]>,
    ) => {
      state.keluargaList = payload;
    },
    deleteRefKeluargaFailed: (state, { payload }) => {
      state.error = payload;
    },
    addKeluarga: (state, { payload }: PayloadAction<RefKeluargaResponse>) => {
      state.keluargaList.push({
        ...payload,
        id: Number.parseInt(uniqueId()),
      });
    },
    deleteKeluarga: (
      state,
      { payload }: PayloadAction<RefKeluargaResponse | null>,
    ) => {
      state.keluargaList = state.keluargaList.filter(
        item => item?.status?.toLowerCase() != payload?.status?.toLowerCase(),
      );
    },
    updateKeluarga: (
      state,
      { payload }: PayloadAction<{ data: RefKeluargaResponse; index?: number }>,
    ) => {
      const { data, index } = payload || {};
      if (index !== undefined)
        state.keluargaList[index] = {
          ...data,
          id: Number.parseInt(uniqueId()),
        };
    },
  },
});

export const fetchGetRefKeluarga = createAction('fetchGetRefKeluarga');
export const fetchUpdateRefKeluarga = createAction<{
  data: RefKeluargaResponse;
  id: number;
}>('fetchUpdateRefKeluarga');
export const fetchSubmitRefKeluarga = createAction<RefKeluargaResponse>(
  'fetchSubmitRefKeluarga',
);

export const {
  addKeluarga,
  deleteKeluarga,
  updateKeluarga,
  deleteRefKeluargaSuccess,
  deleteRefKeluargaFailed,
  getRefKeluargaFailed,
  getRefKeluargaSuccess,
  submitRefKeluargaFailed,
  submitRefKeluargaSuccess,
  updateRefKeluargaFailed,
  updateRefKeluargaSuccess,
} = refKeluargaSlice.actions;

export default refKeluargaSlice.reducer;
