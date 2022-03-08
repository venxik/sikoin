import { createSlice } from '@reduxjs/toolkit';
import { images } from '../../constants';

const initialState = {
  promoDataList: [
    {
      title: 'Jababeka Bakal Terbitkan Obligasi Global Rp 5,06 Triliun',
      image: images.daftar_koperasi_bg,
      content:
        'Realisasi belanja pemerintah membeli produk UMKM telah mencapai 70 persen dari target Rp 447,28 triliun.',
    },
    {
      title: 'Jababeka Bakal Terbitkan Obligasi Global Rp 5,06 Triliun',
      image: images.daftar_koperasi_bg,
      content:
        'Realisasi belanja pemerintah membeli produk UMKM telah mencapai 70 persen dari target Rp 447,28 triliun.',
    },
    {
      title: 'Jababeka Bakal Terbitkan Obligasi Global Rp 5,06 Triliun',
      image: images.daftar_koperasi_bg,
      content:
        'Realisasi belanja pemerintah membeli produk UMKM telah mencapai 70 persen dari target Rp 447,28 triliun.',
    },
  ],
  error: null,
};

const promoSlice = createSlice({
  name: 'promoSlice',
  initialState,
  reducers: {
    fetchPromoData: () => {},
    fetchPromoDataSuccess: (state, { payload }) => {
      state.promoDataList = payload;
    },
    fetchPromoDataFailed: (state, { payload }) => {
      state.error = payload;
    },
  },
});

export const { fetchPromoData, fetchPromoDataFailed, fetchPromoDataSuccess } =
  promoSlice.actions;

export default promoSlice.reducer;
