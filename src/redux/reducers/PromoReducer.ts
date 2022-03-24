import { createSlice } from '@reduxjs/toolkit';

export type KoperasiData = {
  title?: string;
  image?: string;
  content?: string;
};

interface RootState {
  promoDataList: KoperasiData[];
  error: null;
}

const initialState: RootState = {
  promoDataList: [
    {
      title: 'Jababeka Bakal Terbitkan Obligasi Global Rp 5,06 Triliun',
      image: 'https://picsum.photos/id/78/400/400',
      content:
        'Realisasi belanja pemerintah membeli produk UMKM telah mencapai 70 persen dari target Rp 447,28 triliun.',
    },
    {
      title: 'Jababeka Bakal Terbitkan Obligasi Global Rp 5,06 Triliun',
      image: 'https://picsum.photos/id/3/400/400',
      content:
        'Realisasi belanja pemerintah membeli produk UMKM telah mencapai 70 persen dari target Rp 447,28 triliun.',
    },
    {
      title: 'Jababeka Bakal Terbitkan Obligasi Global Rp 5,06 Triliun',
      image: 'https://picsum.photos/id/9/400/400',
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
    fetchPromoData: (state, { payload }) => {
      state.promoDataList = payload;
    },
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