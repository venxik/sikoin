import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface MarketDataResponse {
  id: number;
  productName: string;
  price: number;
  image: string;
}

export interface CartItemData {
  id: number;
  productName: string;
  price: number;
  previousPrice: number;
  image: string;
  qty: number;
  variasi: string[];
  namaToko: string;
  catatan?: string;
}

export interface MarketItemDetailsResponse {
  id: number;
  price: number;
  photos: string[];
  name: string;
  terjual: number;
  kondisi: string;
  rating: string;
  berat: string;
  deskripsi: string;
  asuransi: string;
  ukuran: string[];
  warna: string[];
  namaToko: string;
  stok: number;
  logoToko: string;
  lokasiToko: string;
}

interface RootState {
  marketDataList: MarketDataResponse[];
  marketItemDetails: MarketItemDetailsResponse;
  cartItemDataList: CartItemData[];
  error?: unknown;
}

const initialState: RootState = {
  marketDataList: [
    {
      id: 1,
      productName: 'Jababeka Bakal Terbitkan ',
      price: 17000000,
      image: 'https://picsum.photos/id/121/400/400',
    },
    {
      id: 2,
      productName: '5,06 Triliun',
      price: 1121000,
      image: 'https://picsum.photos/id/1/400/400',
    },
    {
      id: 3,
      productName: 'Jababeka Triliun',
      price: 9921210,
      image: 'https://picsum.photos/id/11/400/400',
    },
    {
      id: 4,
      productName: 'Obligasi Global',
      price: 256324300,
      image: 'https://picsum.photos/id/34/400/400',
    },
  ],
  marketItemDetails: {
    id: 1,
    asuransi: 'Optional',
    berat: '4.9 Gram',
    deskripsi:
      'Tejs t saded edad ed ADdadawdwa Lora reamda dcofnijfy fneiaFd lbewiFE8asf fulef ASD dIASDNIdBADBKASdkjlASKLJDSAJDN akldnalskd askldn asldaildiow qnwd.q',
    kondisi: 'Baru',
    name: 'Test Nama ini 1',
    photos: [
      'https://picsum.photos/id/34/400/400',
      'https://picsum.photos/id/24/400/400',
      'https://picsum.photos/id/14/400/400',
    ],
    price: 700000,
    rating: '4.5',
    stok: 12,
    terjual: 16,
    ukuran: ['X', 'L', 'S', 'M', 'XL'],
    warna: ['Hijau', 'Merah', 'Putih'],
    namaToko: 'Testing 1',
    logoToko: 'https://picsum.photos/id/82/400/400',
    lokasiToko: 'Jakarta, Indonesia',
  },
  cartItemDataList: [
    {
      price: 5000000,
      id: 1,
      image: 'https://picsum.photos/id/34/400/400',
      namaToko: 'Test 1',
      previousPrice: 7000000,
      productName: 'Product 1',
      qty: 2,
      variasi: ['Merah', 'Xl'],
    },
    {
      price: 50000,
      id: 2,
      image: 'https://picsum.photos/id/34/400/400',
      namaToko: 'Test 2',
      previousPrice: 890000,
      productName: 'Product 2',
      qty: 5,
      variasi: ['Hijau', 'S'],
    },
    {
      price: 1231123,
      id: 3,
      image: 'https://picsum.photos/id/34/400/400',
      namaToko: 'Test 3',
      previousPrice: 6667454,
      productName: 'Product 3',
      qty: 7,
      variasi: ['Putih', 'XXXLL'],
    },
  ],
};

const marketSlice = createSlice({
  name: 'marketSlice',
  initialState,
  reducers: {
    getMarketDataSuccess: (
      state: RootState,
      { payload }: PayloadAction<MarketDataResponse[]>,
    ) => {
      state.marketDataList = payload;
    },
    getMarketDataFailed: (
      state: RootState,
      { payload }: PayloadAction<unknown>,
    ) => {
      state.error = payload;
    },
    addCartQty: (state: RootState, { payload }: PayloadAction<number>) => {
      const index = state.cartItemDataList.findIndex(
        (item: { id: number }) => item.id === payload,
      );
      state.cartItemDataList[index].qty += 1;
    },
    substartCartQty: (state: RootState, { payload }: PayloadAction<number>) => {
      const index = state.cartItemDataList.findIndex(
        (item: { id: number }) => item.id === payload,
      );
      state.cartItemDataList[index].qty -= 1;
    },
    deleteCartItem: (state: RootState, { payload }: PayloadAction<number>) => {
      state.cartItemDataList = state.cartItemDataList.filter(
        (item: { id: number }) => item.id !== payload,
      );
    },
    addCartItem: (
      state: RootState,
      { payload }: PayloadAction<CartItemData>,
    ) => {
      const index = state.cartItemDataList.findIndex(
        (item: { id: number }) => item.id === payload.id,
      );

      if (index < 0) {
        state.cartItemDataList.push(payload);
      } else {
        state.cartItemDataList[index].qty += 1;
      }
    },
  },
});

export const fetchMarketData = createAction('fetchMarketData');

export const {
  getMarketDataFailed,
  getMarketDataSuccess,
  addCartItem,
  addCartQty,
  deleteCartItem,
  substartCartQty,
} = marketSlice.actions;

export default marketSlice.reducer;
