import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface BerandaUserResponse {
  profilePic: string;
  logoKoperasi: string;
  nama: string;
  noAnggota: string;
  namaKoperasi: string;
  simpanan: number;
  saldoBelanja: number;
  kabar: [];
  promo: [];
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
  },
});

export const fetchBerandaUser = createAction('fetchBerandaUser');

export const { getBerandaUserFailed, getBerandaUserSuccess } =
  homeSlice.actions;

export default homeSlice.reducer;
