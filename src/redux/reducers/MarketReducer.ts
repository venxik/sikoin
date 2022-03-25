import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type MarketData = {
  productName: string;
  price: number;
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
      price: 17000000,
      image: 'https://picsum.photos/id/121/400/400',
    },
    {
      productName: '5,06 Triliun',
      price: 1121000,
      image: 'https://picsum.photos/id/1/400/400',
    },
    {
      productName: 'Jababeka Triliun',
      price: 9921210,
      image: 'https://picsum.photos/id/11/400/400',
    },
    {
      productName: 'Obligasi Global',
      price: 256324300,
      image: 'https://picsum.photos/id/34/400/400',
    },
  ],

  error: null,
};

const marketSlice = createSlice({
  name: 'marketSlice',
  initialState,
  reducers: {
    fetchMarketData: (state, { payload }: PayloadAction<MarketData[]>) => {
      state.marketDataList = payload;
    },
    fetchMarketDataSuccess: (
      state,
      { payload }: PayloadAction<MarketData[]>,
    ) => {
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
