import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Status } from './LoginReducer';

export type ProductData = {
  id: number;
  foto: string;
  nama: 'Produk pertama';
  kategori: string;
  harga: number;
  isFavorit: boolean;
};

export type MarketMainData = {
  produkTerbaru: ProductData[];
};

export type MarketFavoritData = {
  produkFavorit: ProductData[];
};

export type MarketProductData = {
  produk: ProductData[];
};

export type AddToCartParam = {
  jumlah: number;
  variasiPertama: string;
  variasiKedua: string;
  catatan: string;
  produkId: number;
};

export type OrderProccessParam = {
  alamatId: string;
  keranjangId: number[];
  pengiriman: {
    code: string;
    service: string;
    cost: number;
    etd: string;
    note: string;
  };
  totalBarangDanOngkir: number;
  metodePembayaranId: number;
};

export type CartProductData = {
  id: number;
  fotoProduk: string;
  namaProduk: string;
  hargaProduk: number;
  namaVariasiPertama: string | null;
  namaVariasiKedua: string | null;
  pilihanVariasiPertama: string | null;
  pilihanVariasiKedua: string | null;
  catatan: string;
};

export type CartData = {
  keranjang: CartProductData[];
};

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

export interface MarketProductDetails {
  id: number;
  fotoProduk: string[];
  nama: string;
  deskripsi: string;
  kategori: string;
  stok: number;
  harga: number;
  isKondisiBaru: boolean;
  status: string;
  variasiPertama: {
    nama: string | null;
    pilihan: string[];
  };
  variasiKedua: {
    nama: string | null;
    pilihan: string[];
  };
  isFavorit: boolean;
}

type RootState = {
  marketMainData: MarketMainData;
  marketFavoritData: MarketFavoritData;
  marketProductData: MarketProductData;
  marketProductDetails: MarketProductDetails;
  cartData: CartData;
  cartItemDataList: CartItemData[];
  showPopupAddToCart: Status;
  error?: unknown;
};

const initialState: RootState = {
  marketMainData: {
    produkTerbaru: [],
  },
  marketFavoritData: {
    produkFavorit: [],
  },
  marketProductData: {
    produk: [],
  },
  marketProductDetails: {
    deskripsi: '',
    fotoProduk: [''],
    harga: 0,
    id: 0,
    isFavorit: false,
    isKondisiBaru: false,
    kategori: '',
    nama: '',
    status: '',
    stok: 0,
    variasiKedua: { nama: null, pilihan: [] },
    variasiPertama: { nama: null, pilihan: [] },
  },
  showPopupAddToCart: 'idle',
  cartData: { keranjang: [] },
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
    getMarketMainDataSuccess: (state: RootState, { payload }: PayloadAction<MarketMainData>) => {
      state.marketMainData = payload;
    },
    getMarketMainDataFailed: (state: RootState, { payload }: PayloadAction<unknown>) => {
      state.error = payload;
    },
    getMarketFavoritDataSuccess: (
      state: RootState,
      { payload }: PayloadAction<MarketFavoritData>,
    ) => {
      state.marketFavoritData = payload;
    },
    getMarketFavoritDataFailed: (state: RootState, { payload }: PayloadAction<unknown>) => {
      state.error = payload;
    },
    addToFavoriteSuccess: (state: RootState, { payload }: PayloadAction<number>) => {
      const temp = state.marketMainData.produkTerbaru;

      const indexNewProduct = temp.findIndex((item) => item.id === payload);
      if (indexNewProduct > -1) {
        if (state.marketMainData.produkTerbaru[indexNewProduct].isFavorit)
          state.marketMainData.produkTerbaru[indexNewProduct].isFavorit = false;
        else state.marketMainData.produkTerbaru[indexNewProduct].isFavorit = true;
      }

      const indexFavorite = state.marketFavoritData.produkFavorit.findIndex(
        (item) => item.id === payload,
      );
      if (indexFavorite > -1) {
        if (state.marketFavoritData.produkFavorit[indexFavorite].isFavorit)
          state.marketFavoritData.produkFavorit[indexFavorite].isFavorit = false;
        else state.marketFavoritData.produkFavorit[indexFavorite].isFavorit = true;
      }

      const indexProduct = state.marketProductData.produk.findIndex((item) => item.id === payload);
      if (indexProduct > -1) {
        if (state.marketProductData.produk[indexProduct].isFavorit)
          state.marketProductData.produk[indexProduct].isFavorit = false;
        else state.marketProductData.produk[indexProduct].isFavorit = true;
      }

      if (state.marketProductDetails.isFavorit) state.marketProductDetails.isFavorit = false;
      else state.marketProductDetails.isFavorit = true;
    },
    addToFavoriteFailed: (state: RootState, { payload }: PayloadAction<unknown>) => {
      state.error = payload;
    },
    getMarketAllProductSuccess: (
      state: RootState,
      { payload }: PayloadAction<MarketProductData>,
    ) => {
      state.marketProductData = payload;
    },
    getMarketAllProductFailed: (state: RootState, { payload }: PayloadAction<unknown>) => {
      state.error = payload;
    },
    searchMarketProductSuccess: (
      state: RootState,
      { payload }: PayloadAction<MarketProductData>,
    ) => {
      state.marketProductData = payload;
    },
    searchMarketProductFailed: (state: RootState, { payload }: PayloadAction<unknown>) => {
      state.error = payload;
    },
    getProductDetailsSuccess: (
      state: RootState,
      { payload }: PayloadAction<MarketProductDetails>,
    ) => {
      state.marketProductDetails = payload;
    },
    getProductDetailsFailed: (state: RootState, { payload }: PayloadAction<unknown>) => {
      state.error = payload;
    },
    addToCartSuccees: (state: RootState, { payload }: PayloadAction<Status>) => {
      state.showPopupAddToCart = payload;
    },
    addToCartFailed: (state: RootState, { payload }: PayloadAction<unknown>) => {
      state.error = payload;
    },
    setShowPopupAddToCartStatus: (state: RootState, { payload }: PayloadAction<Status>) => {
      state.showPopupAddToCart = payload;
    },
    getCartDataSuccess: (state: RootState, { payload }: PayloadAction<CartData>) => {
      state.cartData = payload;
    },
    getCartDataFailed: (state: RootState, { payload }: PayloadAction<unknown>) => {
      state.error = payload;
    },
    deleteCartProductSuccess: () => {},
    deleteCartProductFailed: (state: RootState, { payload }: PayloadAction<unknown>) => {
      state.error = payload;
    },
  },
});

export const fetchMarketMainData = createAction('fetchMarketMainData');
export const fetchMarketFavoritData = createAction('fetchMarketFavoritData');
export const fetchAddToFavorit = createAction<number>('fetchAddToFavorit');
export const fetchMarketAllProduct = createAction('fetchMarketAllProduct');
export const fetchSearchMarketProduct = createAction<string>('fetchSearchMarketProduct');
export const fetchMarketProductDetails = createAction<number>('fetchMarketProductDetails');
export const fetchAddToCart = createAction<AddToCartParam>('fetchAddToCart');
export const fetchCartData = createAction('fetchCartData');
export const fetchDeleteCartProduct = createAction<number>('fetchDeleteCartProduct');

export const {
  getMarketMainDataFailed,
  getMarketMainDataSuccess,
  getMarketFavoritDataFailed,
  getMarketFavoritDataSuccess,
  addToFavoriteFailed,
  addToFavoriteSuccess,
  getMarketAllProductFailed,
  getMarketAllProductSuccess,
  searchMarketProductFailed,
  searchMarketProductSuccess,
  getProductDetailsFailed,
  getProductDetailsSuccess,
  addToCartFailed,
  addToCartSuccees,
  setShowPopupAddToCartStatus,
  getCartDataFailed,
  getCartDataSuccess,
  deleteCartProductFailed,
  deleteCartProductSuccess,
} = marketSlice.actions;

export default marketSlice.reducer;
