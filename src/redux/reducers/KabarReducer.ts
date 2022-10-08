import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { KabarPromoData } from './HomeReducer';

export type KabarDetail = {
  kategori: string;
  judul: string;
  banner: string;
  konten: string;
};

interface RootState {
  kabarDataList: KabarPromoData[];
  kabarDetail: KabarDetail;
  error?: unknown;
}

const initialState: RootState = {
  kabarDataList: [],
  kabarDetail: {
    banner: '',
    judul: '',
    kategori: '',
    konten: '',
  },
  error: null,
};

const kabarSlice = createSlice({
  name: 'kabarSlice',
  initialState,
  reducers: {
    fetchKabarSuccess: (
      state: RootState,
      { payload }: PayloadAction<KabarPromoData[]>,
    ) => {
      state.kabarDataList = payload;
    },
    fetchKabarFailed: (
      state: RootState,
      { payload }: PayloadAction<unknown>,
    ) => {
      state.error = payload;
    },
    fetchKabarDetailSuccess: (
      state: RootState,
      { payload }: PayloadAction<KabarDetail>,
    ) => {
      state.kabarDetail = payload;
    },
    fetchKabarDetailFailed: (
      state: RootState,
      { payload }: PayloadAction<unknown>,
    ) => {
      state.error = payload;
    },
  },
});

export const fetchKabar = createAction('fetchKabar');
export const fetchKabarDetail = createAction<number>('fetchKabarDetail');

export const {
  fetchKabarSuccess,
  fetchKabarFailed,
  fetchKabarDetailFailed,
  fetchKabarDetailSuccess,
} = kabarSlice.actions;

export default kabarSlice.reducer;
