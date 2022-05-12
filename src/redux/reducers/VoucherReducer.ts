import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { images } from '../../constants';

export type VoucherDetail = {
  namaToko?: string;
  logoToko?: unknown;
  detail?: string;
  SnK?: string;
  detailToko?: string;
  listVoucher?: number[];
};

interface RootState {
  voucherDataList: VoucherDetail[];
  myVoucherList: unknown[];
  error?: unknown;
}

const initialState: RootState = {
  voucherDataList: [
    {
      namaToko: 'Ace Hardware',
      logoToko: images.img_bca,
      SnK: `Voucher berlaku setiap hari termasuk Weekend dan Hari Libur Nasional.
            \nPenggunaan Voucher dapat digabung dalam 1 transaksi.
            \nVoucher berlaku tanpa minimum transaksi.
            \nRedemption wajib dilakukan oleh Staff/Kasir.`,
      detailToko:
        'PT ACE Hardware Indonesia Tbk adalah sebuah perusahaan ritel yang bergerak dalam bidang perlengkapan rumah dan produk gaya hidup. ACE Hardware menjadi salah satu jaringan modern terbesar dari bisnis ritel perlengkapan rumah dan gaya hidup di Indonesia.\n\nPerusahaan berbasis koperasi ritel ini berasal dari Amerika Serikat. ACE Hardware menjadi pionir dan Pusat Perlengkapan Rumah & Gaya Hidup Terlengkap, dengan 156 toko di beraneka pusat keramaian di kota-kota besar Indonesia.',
      listVoucher: [50000, 100000, 150000, 200000, 250000],
    },
    {
      namaToko: 'BCA testing 1231',
      logoToko: images.img_bni,
      SnK: `Voucher berlaku setiap hari termasuk Weekend dan Hari Libur Nasional.
            \nPenggunaan Voucher dapat digabung dalam 1 transaksi.
            \nVoucher berlaku tanpa minimum transaksi.
            \nRedemption wajib dilakukan oleh Staff/Kasir.`,
      detailToko:
        'PT ACE Hardware Indonesia Tbk adalah sebuah perusahaan ritel yang bergerak dalam bidang perlengkapan rumah dan produk gaya hidup. ACE Hardware menjadi salah satu jaringan modern terbesar dari bisnis ritel perlengkapan rumah dan gaya hidup di Indonesia.\n\nPerusahaan berbasis koperasi ritel ini berasal dari Amerika Serikat. ACE Hardware menjadi pionir dan Pusat Perlengkapan Rumah & Gaya Hidup Terlengkap, dengan 156 toko di beraneka pusat keramaian di kota-kota besar Indonesia.',
      listVoucher: [50000, 100000, 250000],
    },
    {
      namaToko: 'Testing Halo 123',
      logoToko: images.dummy_ktp,
      SnK: `Voucher berlaku setiap hari termasuk Weekend dan Hari Libur Nasional.
            \nPenggunaan Voucher dapat digabung dalam 1 transaksi.
            \nVoucher berlaku tanpa minimum transaksi.
            \nRedemption wajib dilakukan oleh Staff/Kasir.`,
      detailToko:
        'PT ACE Hardware Indonesia Tbk adalah sebuah perusahaan ritel yang bergerak dalam bidang perlengkapan rumah dan produk gaya hidup. ACE Hardware menjadi salah satu jaringan modern terbesar dari bisnis ritel perlengkapan rumah dan gaya hidup di Indonesia.\n\nPerusahaan berbasis koperasi ritel ini berasal dari Amerika Serikat. ACE Hardware menjadi pionir dan Pusat Perlengkapan Rumah & Gaya Hidup Terlengkap, dengan 156 toko di beraneka pusat keramaian di kota-kota besar Indonesia.',
      listVoucher: [250000],
    },
    {
      namaToko: 'Ace HAHAHAHAHAH',
      logoToko: images.img_mandiri,
      SnK: `Voucher berlaku setiap hari termasuk Weekend dan Hari Libur Nasional.
            \nPenggunaan Voucher dapat digabung dalam 1 transaksi.
            \nVoucher berlaku tanpa minimum transaksi.
            \nRedemption wajib dilakukan oleh Staff/Kasir.`,
      detailToko:
        'PT ACE Hardware Indonesia Tbk adalah sebuah perusahaan ritel yang bergerak dalam bidang perlengkapan rumah dan produk gaya hidup. ACE Hardware menjadi salah satu jaringan modern terbesar dari bisnis ritel perlengkapan rumah dan gaya hidup di Indonesia.\n\nPerusahaan berbasis koperasi ritel ini berasal dari Amerika Serikat. ACE Hardware menjadi pionir dan Pusat Perlengkapan Rumah & Gaya Hidup Terlengkap, dengan 156 toko di beraneka pusat keramaian di kota-kota besar Indonesia.',
      listVoucher: [50000, 100000, 150000, 200000, 250000, 500000, 1000000],
    },
  ],
  myVoucherList: [],
  error: null,
};

const voucherSlice = createSlice({
  name: 'voucherSlice',
  initialState,
  reducers: {
    fetchVoucherData: (
      state: RootState,
      { payload }: PayloadAction<VoucherDetail[]>,
    ) => {
      state.voucherDataList = payload;
    },
    fetchVoucherDataSuccess: (
      state: RootState,
      { payload }: PayloadAction<VoucherDetail[]>,
    ) => {
      state.voucherDataList = payload;
    },
    fetchVoucherDataFailed: (
      state: RootState,
      { payload }: PayloadAction<unknown>,
    ) => {
      state.error = payload;
    },
    // addToMyVoucher: (state, { payload }: PayloadAction<VoucherDetail>) => {
    //   if (isEmpty(state.myVoucherList)) {
    //     state.myVoucherList.concat(payload);
    //   } else {
    //     //CHECK INDEX OF SAME TOKO
    //     const index = state.myVoucherList.findIndex(
    //       item => item.namaToko.toLowerCase() != payload.namaToko?.toLowerCase(),
    //     );
    //     console.log(index);
    //     if (index !== -1) {
    //       //IF TOKO FOUND IN ARRAY
    //       if (
    //         state.myVoucherList[index].vouchers.value === payload.vouchers.value
    //       ) {
    //         //IF VOUCHER VALUE IS SAME ADD THE QTY
    //         state.myVoucherList[index].qty += 1;
    //       } else {
    //         //IF VOUCHER VALUE IS NOT SAME CONCAT THE ARRAY
    //         state.myVoucherList[index].vouchers.concat(payload.vouchers);
    //       }
    //     } else {
    //       //IF TOKO NOT FOUND IN ARRAY JUST CONCAT INTO THE ARRAY
    //       state.myVoucherList.concat(payload);
    //     }
    //   }
    // },
    // addToMyVoucherSuccess: (state, { payload }) => {
    //   if (isEmpty(state.myVoucherList)) {
    //     state.myVoucherList = payload;
    //   } else {
    //     //CHECK INDEX OF SAME TOKO
    //     const index = state.myVoucherList.findIndex(
    //       item => item.namaToko.toLowerCase() != payload.namaToko.toLowerCase(),
    //     );
    //     console.log(index);
    //     if (index !== -1) {
    //       //IF TOKO FOUND IN ARRAY
    //       if (
    //         state.myVoucherList[index].vouchers.value === payload.vouchers.value
    //       ) {
    //         //IF VOUCHER VALUE IS SAME ADD THE QTY
    //         state.myVoucherList[index].qty += 1;
    //       } else {
    //         //IF VOUCHER VALUE IS NOT SAME CONCAT THE ARRAY
    //         state.myVoucherList[index].vouchers.concat(payload.vouchers);
    //       }
    //     } else {
    //       //IF TOKO NOT FOUND IN ARRAY JUST CONCAT INTO THE ARRAY
    //       state.myVoucherList.concat(payload);
    //     }
    //   }
    // },
    // addToMyVoucherFailed: (state, { payload }) => {
    //   state.error = payload;
    // },
  },
});

export const {
  // addToMyVoucher,
  // addToMyVoucherFailed,
  // addToMyVoucherSuccess,
  fetchVoucherData,
  fetchVoucherDataFailed,
  fetchVoucherDataSuccess,
} = voucherSlice.actions;

export default voucherSlice.reducer;
