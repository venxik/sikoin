import { createSlice } from '@reduxjs/toolkit';

export type MarketData = {
  productName: string;
  price: string;
  image: string;
};

interface RootState {
  marketDataList: MarketData[];
  error: null;
}

const initialState: RootState = {
  marketDataList: [
    {
      productName: 'Jababeka Bakal Terbitkan ',
      price: 'Rp 17.000.000',
      image: 'https://picsum.photos/id/121/400/400',
    },
    {
      productName: '5,06 Triliun',
      price: 'Rp 17.000.000',
      image: 'https://picsum.photos/id/1/400/400',
    },
    {
      productName: 'Jababeka Triliun',
      price: 'Rp 17.000.000',
      image: 'https://picsum.photos/id/11/400/400',
    },
    {
      productName: 'Obligasi Global',
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
    fetchMarketData: (state, { payload }) => {
      state.marketDataList = payload;
    },
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
