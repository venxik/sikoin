import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type MarketData = {
  productName: string;
  price: number;
  image: string;
};

interface RootState {
  marketDataList: MarketData[];
  dummyList?: any;
  error?: string | null;
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
    fetchDummyData: () => {
      null;
    },
    fetchDummyDataSuccess: (state, { payload }: PayloadAction<any>) => {
      state.dummyList = payload;
    },
    fetchDummyDataFailed: (state, { payload }: PayloadAction<string>) => {
      state.error = payload;
    },
  },
});

export const {
  fetchMarketData,
  fetchMarketDataFailed,
  fetchMarketDataSuccess,
  fetchDummyData,
  fetchDummyDataFailed,
  fetchDummyDataSuccess,
} = marketSlice.actions;

export default marketSlice.reducer;
