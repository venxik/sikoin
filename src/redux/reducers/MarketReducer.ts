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

export type CheckoutParamDetails = { id: number; jumlah: number; catatan: string };

export type CheckoutParam = {
  keranjang: Array<CheckoutParamDetails>;
};

export type OrderProcessParam = {
  alamatId: number;
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
  keranjangId?: number;
  berat?: number;
  jumlah: number;
  isSelected: boolean;
  hargaSatuan: number;
  hargaTotal: number;
};

export type CheckoutAlamatData = {
  id: number;
  namaPenerima: string;
  judul: string;
  detail: string;
  rt: string;
  rw: string;
  provinsi: string;
  kabupaten: string;
  kecamatan: string;
  kodePos: string;
  isUtama: boolean;
  cityIdRajaOngkir: number;
};

export type DeliveryData = {
  code: string;
  service: string;
  cost: number;
  etd: string;
  note: string;
};

export type PaymentDetails = {
  id: number;
  nama: string;
  info?: string;
  saldo?: number;
};

export type PaymentMethodData = {
  bank: PaymentDetails;
  koperasi: PaymentDetails[];
};

export type CheckoutData = {
  alamat: CheckoutAlamatData[];
  keranjang: CartProductData[];
  pengiriman: DeliveryData[];
  totalBarang: number;
  totalBerat: number;
  metodePembayaran: PaymentMethodData;
};

export type ChangeCheckoutAddress = {
  alamatTujuan: CheckoutAlamatData[];
  pengiriman: DeliveryData[];
};

export type ChangeCheckoutAddressParam = {
  alamatId: number;
  totalBerat: number;
};

export type CartData = {
  keranjang: CartProductData[];
};

export type CartItemData = {
  id: number;
  productName: string;
  price: number;
  previousPrice: number;
  image: string;
  qty: number;
  variasi: string[];
  namaToko: string;
  catatan?: string;
};

export type MarketProductDetails = {
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
};

export type PurchaseData = {
  id: number;
  nomorPesanan: string;
  foto: string;
  nama: string;
  totalHarga: number;
  waktu: string;
  status: string;
};

export type PurchaseStatus = {
  status: string;
  nomorPesanan: string;
  waktu: string;
  nama: string;
};

export type DeliveryStatus = {
  kurir: string;
  noResi: string;
  etd: string;
};

export type PaymentStatus = {
  metodePembayaran: string;
  totalHarga: number;
  biayaPengiriman: number;
  totalBayar: number;
};

export type PurchaseDetails = {
  pesanan: PurchaseStatus;
  detailProduk: MarketProductDetails;
  infoPengiriman: DeliveryStatus;
  rincianPembayaran: PaymentStatus;
};

export type CategoryData = {
  id: number;
  nama: string;
  icon: string;
};

type RootState = {
  marketMainData: MarketMainData;
  marketFavoritData: MarketFavoritData;
  marketProductData: MarketProductData;
  marketProductDetails: MarketProductDetails;
  cartData: CartData;
  showPopupAddToCart: Status;
  checkoutData: CheckoutData;
  selectedAlamat: CheckoutAlamatData;
  selectedCartProduct: CheckoutParamDetails[];
  purchaseData: PurchaseData[];
  purchaseDetails: PurchaseDetails;
  categoryData: CategoryData[];
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
  checkoutData: {
    alamat: [],
    keranjang: [],
    metodePembayaran: { bank: { id: 0, nama: '', info: '' }, koperasi: [] },
    pengiriman: [],
    totalBarang: 0,
    totalBerat: 0,
  },
  selectedAlamat: {
    cityIdRajaOngkir: 0,
    detail: '',
    id: 0,
    isUtama: false,
    judul: '',
    kabupaten: '',
    kecamatan: '',
    kodePos: '',
    namaPenerima: '',
    provinsi: '',
    rt: '',
    rw: '',
  },
  selectedCartProduct: [],
  purchaseData: [],
  purchaseDetails: {
    detailProduk: {
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
    infoPengiriman: {
      etd: '',
      kurir: '',
      noResi: '',
    },
    pesanan: {
      nama: '',
      nomorPesanan: '',
      status: '',
      waktu: '',
    },
    rincianPembayaran: {
      biayaPengiriman: 0,
      metodePembayaran: '',
      totalBayar: 0,
      totalHarga: 0,
    },
  },
  categoryData: [],
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
    addCartProduct: (state: RootState, { payload }: PayloadAction<number>) => {
      const cartIndex = state.cartData.keranjang.findIndex((value) => value.id === payload);
      state.cartData.keranjang[cartIndex].isSelected = true;
      // state.selectedCartProduct = state.selectedCartProduct.concat(payload);
    },
    removeCartProduct: (state: RootState, { payload }: PayloadAction<number>) => {
      // const temp = state.selectedCartProduct.filter((value) => value.id !== payload);
      // state.selectedCartProduct = temp;
      const cartIndex = state.cartData.keranjang.findIndex((value) => value.id === payload);
      state.cartData.keranjang[cartIndex].isSelected = false;
    },
    addQtyCart: (state: RootState, { payload }: PayloadAction<number>) => {
      const cartIndex = state.cartData.keranjang.findIndex((value) => value.id === payload);
      if (cartIndex !== -1) {
        state.cartData.keranjang[cartIndex].jumlah += 1;
      }
    },
    subtractQtyCart: (state: RootState, { payload }: PayloadAction<number>) => {
      const cartIndex = state.cartData.keranjang.findIndex((value) => value.id === payload);
      if (cartIndex !== -1) {
        state.cartData.keranjang[cartIndex].jumlah -= 1;
      }
    },
    editNotesCart: (
      state: RootState,
      { payload }: PayloadAction<{ id: number; value: string }>,
    ) => {
      const cartIndex = state.cartData.keranjang.findIndex((value) => value.id === payload.id);
      if (cartIndex !== -1) {
        state.cartData.keranjang[cartIndex].catatan = payload.value;
      }
    },
    checkoutSuccess: (state: RootState, { payload }: PayloadAction<CheckoutData>) => {
      state.checkoutData = payload;
    },
    checkoutFailed: (state: RootState, { payload }: PayloadAction<unknown>) => {
      state.error = payload;
    },
    selectCheckoutAlamat: (state: RootState, { payload }: PayloadAction<CheckoutAlamatData>) => {
      state.selectedAlamat = payload;
    },
    changeCheckoutAddressSuccess: (
      state: RootState,
      { payload }: PayloadAction<ChangeCheckoutAddress>,
    ) => {
      state.checkoutData.alamat = payload.alamatTujuan;
      state.checkoutData.pengiriman = payload.pengiriman;
    },
    changeCheckoutAddressFailed: (state: RootState, { payload }: PayloadAction<unknown>) => {
      state.error = payload;
    },
    orderProcessSuccess: () => {},
    orderProcessFailed: (state: RootState, { payload }: PayloadAction<unknown>) => {
      state.error = payload;
    },
    getPurchaseSuccess: (state: RootState, { payload }: PayloadAction<PurchaseData[]>) => {
      state.purchaseData = payload;
    },
    getPurchaseFailed: (state: RootState, { payload }: PayloadAction<unknown>) => {
      state.error = payload;
    },
    getPurchaseDetailsSuccess: (state: RootState, { payload }: PayloadAction<PurchaseDetails>) => {
      state.purchaseDetails = payload;
    },
    getPurchaseDetailsFailed: (state: RootState, { payload }: PayloadAction<unknown>) => {
      state.error = payload;
    },
    setPurchaseDoneSuccess: () => {},
    setPurchaseDoneFailed: (state: RootState, { payload }: PayloadAction<unknown>) => {
      state.error = payload;
    },
    getCategorySuccess: (state: RootState, { payload }: PayloadAction<CategoryData[]>) => {
      state.categoryData = payload;
    },
    getCategoryFailed: (state: RootState, { payload }: PayloadAction<unknown>) => {
      state.error = payload;
    },
    getCategoryProductSuccess: (
      state: RootState,
      { payload }: PayloadAction<MarketProductData>,
    ) => {
      state.marketProductData = payload;
    },
    getCategoryProductFailed: (state: RootState, { payload }: PayloadAction<unknown>) => {
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
export const fetchCheckout = createAction<CheckoutParam>('fetchCheckout');
export const fetchChangeCheckoutAddress = createAction<ChangeCheckoutAddressParam>(
  'fetchChangeCheckoutAddress',
);
export const fetchOrderProcess = createAction<OrderProcessParam>('fetchOrderProcess');
export const fetchPurchaseData = createAction('fetchPurchaseData');
export const fetchPurchaseDetails = createAction<number>('fetchPurchaseDetails');
export const fetchSetPurchaseDone = createAction<number>('fetchSetPurchaseDone');
export const fetchCategoryData = createAction('fetchCategoryData');
export const fetchCategoryProductData = createAction<number>('fetchCategoryProductData');

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
  checkoutFailed,
  checkoutSuccess,
  selectCheckoutAlamat,
  addCartProduct,
  removeCartProduct,
  addQtyCart,
  editNotesCart,
  subtractQtyCart,
  changeCheckoutAddressFailed,
  changeCheckoutAddressSuccess,
  orderProcessFailed,
  orderProcessSuccess,
  getPurchaseFailed,
  getPurchaseSuccess,
  getPurchaseDetailsFailed,
  getPurchaseDetailsSuccess,
  setPurchaseDoneFailed,
  setPurchaseDoneSuccess,
  getCategoryFailed,
  getCategorySuccess,
  getCategoryProductFailed,
  getCategoryProductSuccess,
} = marketSlice.actions;

export default marketSlice.reducer;
