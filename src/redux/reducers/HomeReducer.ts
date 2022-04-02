import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface BerandaUserResponse {
  profile_pic: string;
  logo_koperasi: string;
  nama: string;
  no_anggota: string;
  nama_koperasi: string;
  simpanan: number;
  saldo_belanja: number;
  kabar: [];
  promo: [];
  error?: string | null;
}

const initialState: BerandaUserResponse = {
  profile_pic: '',
  nama: '',
  no_anggota: '',
  logo_koperasi: '',
  nama_koperasi: '',
  simpanan: 0,
  saldo_belanja: 0,
  kabar: [],
  promo: [],
};

const homeSlice = createSlice({
  name: 'homeSlice',
  initialState,
  reducers: {
    getBerandaUserSuccess: (
      state,
      { payload }: PayloadAction<BerandaUserResponse>,
    ) => {
      const {
        kabar,
        logo_koperasi,
        nama,
        nama_koperasi,
        no_anggota,
        profile_pic,
        promo,
        saldo_belanja,
        simpanan,
      } = payload;
      state.kabar = kabar;
      state.logo_koperasi = logo_koperasi;
      state.nama = nama;
      state.nama_koperasi = nama_koperasi;
      state.no_anggota = no_anggota;
      state.saldo_belanja = saldo_belanja;
      state.simpanan = simpanan;
      state.profile_pic = profile_pic;
      state.promo = promo;
    },
    getBerandaUserFailed: (state, { payload }) => {
      state.error = payload;
    },
  },
});

export const fetchBerandaUser = createAction('fetchBerandaUser');

export const { getBerandaUserFailed, getBerandaUserSuccess } =
  homeSlice.actions;

export default homeSlice.reducer;
