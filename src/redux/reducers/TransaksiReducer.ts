import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type TransaksiData = {
  nominal?: number;
  title?: string;
  detail?: string;
  time?: string;
};

interface RootState {
  transaksiDataList: TransaksiData[];
  error: null;
}

const initialState: RootState = {
  transaksiDataList: [
    {
      nominal: 10000,
      title: 'Voucher ACE Hardware',
      detail: 'Pembelian Voucher ACE Hardware Rp 50.000 + Biaya Admin',
      time: '19 Jan 2022, 10:39 WIB',
    },
    {
      nominal: 721000,
      title: 'Biaya pengiriman produk',
      detail: 'Pemotongan Ongkir via Gojek - INV/20220115/MPL/1951204385',
      time: '16 Jan 2022, 15:36 WIB',
    },
    {
      nominal: 999999,
      title: 'Voucher Tokopedia',
      detail: 'Pembelian Voucher tokopedia + Biaya Admin',
      time: '19 Jan 2022, 10:39 WIB',
    },
    {
      nominal: 2310021,
      title: 'Testing',
      detail: 'Pembelian Voucher - INV/20220115/MPL/1951204385',
      time: '19 Jan 2022, 10:39 WIB',
    },
  ],
  error: null,
};

const transaksiSlice = createSlice({
  name: 'transaksiSlice',
  initialState,
  reducers: {
    fetchTransaksiData: (
      state,
      { payload }: PayloadAction<TransaksiData[]>,
    ) => {
      state.transaksiDataList = payload;
    },
    fetchTransaksiDataSuccess: (
      state,
      { payload }: PayloadAction<TransaksiData[]>,
    ) => {
      state.transaksiDataList = payload;
    },
    fetchTransaksiDataFailed: (state, { payload }) => {
      state.error = payload;
    },
  },
});

export const {
  fetchTransaksiData,
  fetchTransaksiDataFailed,
  fetchTransaksiDataSuccess,
} = transaksiSlice.actions;

export default transaksiSlice.reducer;
