import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type TransaksiData = {
  nominal?: number;
  title?: string;
  detail?: string;
  time?: string | Date | number;
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
      time: '2020-04-30T04:00:00.000Z',
    },
    {
      nominal: 721000,
      title: 'Biaya pengiriman produk',
      detail: 'Pemotongan Ongkir via Gojek - INV/20220115/MPL/1951204385',
      time: '2020-04-30T04:00:00.000Z',
    },
    {
      nominal: 999999,
      title: 'Voucher Tokopedia',
      detail: 'Pembelian Voucher tokopedia + Biaya Admin',
      time: '2020-04-30T04:00:00.000Z',
    },
    {
      nominal: 2310021,
      title: 'Testing',
      detail: 'Pembelian Voucher - INV/20220115/MPL/1951204385',
      time: '2020-04-30T04:00:00.000Z',
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
