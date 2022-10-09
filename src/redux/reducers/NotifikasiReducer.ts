import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit';

export type NotifikasiData = {
  id: number;
  perihal: string;
  excerpt: string;
  waktu: string;
};

export type NotifikasiDetail = {
  logoKoperasi: string;
  perihal: string;
  pengirim: string;
  waktu: string;
  body: string;
};

export type NotifikasiResponse = {
  notifikasi: NotifikasiData[];
  logoKoperasi: string;
};

interface RootState {
  notifikasiDataList: NotifikasiResponse;
  notifikasiDetail: NotifikasiDetail;
  error?: unknown;
}

const initialState: RootState = {
  notifikasiDataList: { logoKoperasi: '', notifikasi: [] },
  notifikasiDetail: {
    body: '',
    logoKoperasi: '',
    pengirim: '',
    perihal: '',
    waktu: '',
  },
  error: null,
};

const notifikasiSlice = createSlice({
  name: 'notifikasiSlice',
  initialState,
  reducers: {
    fetchNotifikasiSuccess: (
      state: RootState,
      { payload }: PayloadAction<NotifikasiResponse>,
    ) => {
      state.notifikasiDataList = payload;
    },
    fetchNotifikasiFailed: (
      state: RootState,
      { payload }: PayloadAction<unknown>,
    ) => {
      state.error = payload;
    },
    fetchNotifikasiDetailSuccess: (
      state: RootState,
      { payload }: PayloadAction<NotifikasiDetail>,
    ) => {
      state.notifikasiDetail = payload;
    },
    fetchNotifikasiDetailFailed: (
      state: RootState,
      { payload }: PayloadAction<unknown>,
    ) => {
      state.error = payload;
    },
  },
});

export const fetchNotifikasi = createAction('fetchNotifikasi');
export const fetchNotifikasiDetail = createAction<number>(
  'fetchNotifikasiDetail',
);

export const {
  fetchNotifikasiSuccess,
  fetchNotifikasiFailed,
  fetchNotifikasiDetailFailed,
  fetchNotifikasiDetailSuccess,
} = notifikasiSlice.actions;

export default notifikasiSlice.reducer;
