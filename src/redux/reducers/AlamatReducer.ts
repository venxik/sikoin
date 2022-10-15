import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit';

export type AlamatDataResponse = {
  id: number;
  judul: string;
  alamat: string;
  rt: string;
  rw: string;
  provinsi: string;
  kabupaten: string;
  kecamatan: string;
  kodePos: string;
};

type DeleteAlamatStatus = 'idle' | 'success' | 'failed';

interface RootState {
  alamatList: AlamatDataResponse[];
  error?: unknown;
  deleteAlamatStatus?: DeleteAlamatStatus;
}

const initialState: RootState = {
  alamatList: [],
};

const alamatSlice = createSlice({
  name: 'alamatSlice',
  initialState,
  reducers: {
    getAlamatListSuccess: (state: RootState, { payload }: PayloadAction<AlamatDataResponse[]>) => {
      state.alamatList = payload;
    },
    getAlamatListFailed: (state: RootState, { payload }: PayloadAction<unknown>) => {
      state.error = payload;
    },
    submitAlamatSuccess: (state: RootState, { payload }: PayloadAction<AlamatDataResponse[]>) => {
      state.alamatList = payload;
    },
    submitAlamatFailed: (state: RootState, { payload }: PayloadAction<unknown>) => {
      state.error = payload;
    },
    updateAlamatSuccess: (state: RootState, { payload }: PayloadAction<AlamatDataResponse[]>) => {
      state.alamatList = payload;
    },
    updateAlamatFailed: (state: RootState, { payload }: PayloadAction<unknown>) => {
      state.error = payload;
    },
    setDeleteAlamatStatus: (state: RootState, { payload }: PayloadAction<DeleteAlamatStatus>) => {
      state.deleteAlamatStatus = payload;
    },
    deleteAlamatSuccess: (state: RootState, { payload }: PayloadAction<AlamatDataResponse[]>) => {
      state.alamatList = payload;
    },
    deleteAlamatFailed: (state: RootState, { payload }: PayloadAction<unknown>) => {
      state.error = payload;
    },
    // addAlamat: (state, { payload }: PayloadAction<AlamatDataResponse>) => {
    //   state.alamatList.push({
    //     ...payload,
    //     id: Number.parseInt(uniqueId()),
    //   });
    // },
    // deleteAlamat: (
    //   state,
    //   { payload }: PayloadAction<AlamatDataResponse | null>,
    // ) => {
    //   state.alamatList = state.alamatList.filter(
    //     item => item.judul.toLowerCase() != payload?.judul?.toLowerCase(),
    //   );
    // },
    // updateAlamat: (
    //   state,
    //   { payload }: PayloadAction<{ data: AlamatDataResponse; index?: number }>,
    // ) => {
    //   const { data, index } = payload || {};
    //   if (index !== undefined)
    //     state.alamatList[index] = {
    //       ...data,
    //       id: Number.parseInt(uniqueId()),
    //     };
    // },
  },
});

export const fetchAlamatList = createAction('fetchAlamatList');
export const fetchDeleteAlamat = createAction<number>('deleteAlamatList');
export const fetchUpdateAlamat = createAction<{
  data: AlamatDataResponse;
  id: number;
}>('fetchUpdateAlamat');
export const fetchSubmitAlamat = createAction<AlamatDataResponse>('fetchSubmitAlamat');

export const {
  getAlamatListFailed,
  getAlamatListSuccess,
  updateAlamatFailed,
  updateAlamatSuccess,
  submitAlamatFailed,
  submitAlamatSuccess,
  deleteAlamatFailed,
  deleteAlamatSuccess,
  setDeleteAlamatStatus,
} = alamatSlice.actions;

export default alamatSlice.reducer;
