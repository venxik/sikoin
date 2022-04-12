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
  error?: string | null;
}

const initialState: BerandaUserResponse = {
  profilePic: '',
  nama: '',
  noAnggota: '',
  logoKoperasi: '',
  namaKoperasi: '',
  simpanan: 0,
  saldoBelanja: 0,
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
        logoKoperasi,
        nama,
        namaKoperasi,
        noAnggota,
        profilePic,
        promo,
        saldoBelanja,
        simpanan,
      } = payload;
      state.kabar = kabar;
      state.logoKoperasi = logoKoperasi;
      state.nama = nama;
      state.namaKoperasi = namaKoperasi;
      state.noAnggota = noAnggota;
      state.saldoBelanja = saldoBelanja;
      state.simpanan = simpanan;
      state.profilePic = profilePic;
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
