import { createSlice } from '@reduxjs/toolkit';
import { images } from '../../constants';

const initialState = {
  marketDataList: [
    {
      productName: 'Jababeka Bakal Terbitkan Obligasi Global Rp 5,06 Triliun',
      price: 'Rp 17.000.000',
      image: images.daftar_koperasi_bg,
    },
    {
      productName: 'Jababeka Bakal Terbitkan Obligasi Global Rp 5,06 Triliun',
      price: 'Rp 17.000.000',
      image: images.daftar_koperasi_bg,
    },
    {
      productName: 'Jababeka Bakal Terbitkan Obligasi Global Rp 5,06 Triliun',
      price: 'Rp 17.000.000',
      image: images.daftar_koperasi_bg,
    },
    {
      productName: 'Jababeka Bakal Terbitkan Obligasi Global Rp 5,06 Triliun',
      price: 'Rp 17.000.000',
      image: images.daftar_koperasi_bg,
    },
  ],
  error: null,
};

const marketSlice = createSlice({
  name: 'marketSlice',
  initialState,
  reducers: {
    fetchMarketData: () => {},
    fetchMarketDataSuccess: (state, { payload }) => {
      state.marketDataList = payload;
    },
    fetchMarketDataFailed: (state, { payload }) => {
      state.error = payload;
    },
  },
});

export const {
  fetchMarketData,
  fetchMarketDataFailed,
  fetchMarketDataSuccess,
} = marketSlice.actions;

export default marketSlice.reducer;
