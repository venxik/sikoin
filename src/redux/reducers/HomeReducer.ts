import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit';

export type KabarPromoData = {
  id: number;
  banner: string;
  judul: string;
  excerpt: string;
  webUrl?: string;
  waktu: string;
};

export interface BerandaUserResponse {
  profilePic: string;
  logoKoperasi: string;
  nama: string;
  noAnggota: string;
  namaKoperasi: string;
  simpanan: number;
  saldoBelanja: number;
  kabar: KabarPromoData[];
  promo: KabarPromoData[];
  conversationId: number;
  userId: number;
}

export type IntitalState = {
  user: BerandaUserResponse;
  error?: unknown;
};

const initialState: IntitalState = {
  user: {
    conversationId: 0,
    kabar: [],
    logoKoperasi: '',
    nama: '',
    namaKoperasi: '',
    noAnggota: '',
    profilePic: '',
    promo: [],
    saldoBelanja: 0,
    simpanan: 0,
    userId: 0,
  },
};

const homeSlice = createSlice({
  name: 'homeSlice',
  initialState,
  reducers: {
    getBerandaUserSuccess: (
      state: IntitalState,
      { payload }: PayloadAction<BerandaUserResponse>,
    ) => {
      state.user = payload;
    },
    getBerandaUserFailed: (
      state: IntitalState,
      { payload }: PayloadAction<unknown>,
    ) => {
      state.error = payload;
    },
    resetUserData: (state: IntitalState) => {
      state.user = initialState.user;
    },
  },
});

export const fetchBerandaUser = createAction('fetchBerandaUser');

export const { getBerandaUserFailed, getBerandaUserSuccess, resetUserData } =
  homeSlice.actions;

export default homeSlice.reducer;
