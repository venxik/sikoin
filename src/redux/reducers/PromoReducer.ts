import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { KabarPromoData } from './HomeReducer';

export type PromoDetail = {
  judul: string;
  banner: string;
  deskripsi: string;
  webUrl: string;
};

interface RootState {
  promoDataList: KabarPromoData[];
  promoDetail: PromoDetail;
  error?: unknown;
}

const initialState: RootState = {
  promoDataList: [],
  promoDetail: {
    banner: '',
    deskripsi: '',
    judul: '',
    webUrl: '',
  },
  error: null,
};

const promoSlice = createSlice({
  name: 'promoSlice',
  initialState,
  reducers: {
    fetchPromoDataSuccess: (state: RootState, { payload }: PayloadAction<KabarPromoData[]>) => {
      state.promoDataList = payload;
    },
    fetchPromoDataFailed: (state: RootState, { payload }: PayloadAction<unknown>) => {
      state.error = payload;
    },
    fetchPromoDetailSuccess: (state: RootState, { payload }: PayloadAction<PromoDetail>) => {
      state.promoDetail = payload;
    },
    fetchPromoDetailFailed: (state: RootState, { payload }: PayloadAction<unknown>) => {
      state.error = payload;
    },
  },
});

export const fetchPromo = createAction('fetchPromo');
export const fetchPromoDetail = createAction<number>('fetchPromoDetail');

export const {
  fetchPromoDataFailed,
  fetchPromoDataSuccess,
  fetchPromoDetailFailed,
  fetchPromoDetailSuccess,
} = promoSlice.actions;

export default promoSlice.reducer;
