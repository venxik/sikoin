import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  marketDataList: [
    {
      productName: 'Jababeka Bakal Terbitkan Obligasi Global Rp 5,06 Triliun',
      price: 'Rp 17.000.000',
      image: 'https://picsum.photos/id/121/400/400',
    },
    {
      productName: 'Jababeka Bakal Terbitkan Obligasi Global Rp 5,06 Triliun',
      price: 'Rp 17.000.000',
      image: 'https://picsum.photos/id/1/400/400',
    },
    {
      productName: 'Jababeka Bakal Terbitkan Obligasi Global Rp 5,06 Triliun',
      price: 'Rp 17.000.000',
      image: 'https://picsum.photos/id/11/400/400',
    },
    {
      productName: 'Jababeka Bakal Terbitkan Obligasi Global Rp 5,06 Triliun',
      price: 'Rp 17.000.000',
      image: 'https://picsum.photos/id/34/400/400',
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
