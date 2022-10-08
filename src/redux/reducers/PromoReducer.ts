import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { KabarPromoData } from './HomeReducer';

interface RootState {
  promoDataList: KabarPromoData[];
  error?: unknown;
}

const initialState: RootState = {
  promoDataList: [],
  error: null,
};

const promoSlice = createSlice({
  name: 'promoSlice',
  initialState,
  reducers: {
    fetchPromoData: (
      state: RootState,
      { payload }: PayloadAction<KabarPromoData[]>,
    ) => {
      state.promoDataList = payload;
    },
    fetchPromoDataSuccess: (
      state: RootState,
      { payload }: PayloadAction<KabarPromoData[]>,
    ) => {
      state.promoDataList = payload;
    },
    fetchPromoDataFailed: (
      state: RootState,
      { payload }: PayloadAction<unknown>,
    ) => {
      state.error = payload;
    },
  },
});

export const { fetchPromoData, fetchPromoDataFailed, fetchPromoDataSuccess } =
  promoSlice.actions;

export default promoSlice.reducer;
