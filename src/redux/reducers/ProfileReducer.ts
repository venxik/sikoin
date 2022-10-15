import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit';

export type ProfileResponse = {
  profilePic: string;
  logoKoperasi: string;
  nama: string;
  noTelp: string;
  email: string;
  memberSejak: string;
  noAnggota: string;
};

export type ProfileRequest = {
  nama: string;
  noTelp: string;
  email: string;
};

export type KoperasiData = {
  koperasiPic?: string;
  namaKoperasi?: string;
  noBadanHukum?: string;
  alamat?: string;
  noTelp?: string;
  website?: string;
};

interface RootState {
  profileData: ProfileResponse;
  koperasiData: KoperasiData;
  error?: unknown;
}

const initialState: RootState = {
  profileData: {
    profilePic: '',
    logoKoperasi: '',
    nama: '',
    noTelp: '',
    email: '',
    memberSejak: '',
    noAnggota: '',
  },
  koperasiData: {
    koperasiPic: 'https://picsum.photos/id/237/200/300',
    namaKoperasi: 'Koperasi AB',
    noBadanHukum: '123213213',
    alamat:
      'Jl. Raya Daan Mogot No.6, RT.6/RW.3, Wijaya Kusuma, Kec. Grogol petamburan, Kota Jakarta Barat, Daerah Khusus Ibukota Jakarta 11460',
    noTelp: '02131321',
    website: 'www.koperasi.id',
  },
  error: null,
};

const profileSlice = createSlice({
  name: 'profileSlice',
  initialState,
  reducers: {
    getProfileSuccess: (state: RootState, { payload }: PayloadAction<ProfileResponse>) => {
      state.profileData = payload;
    },
    getProfileFailed: (state: RootState, { payload }: PayloadAction<unknown>) => {
      state.error = payload;
    },
    updateProfileSuccess: (state: RootState, { payload }: PayloadAction<ProfileResponse>) => {
      state.profileData = payload;
    },
    updateProfileFailed: (state: RootState, { payload }: PayloadAction<unknown>) => {
      state.error = payload;
    },
  },
});

export const fetchProfile = createAction('fetchProfile');
export const fetchUpdateProfile = createAction<FormData>('fetchUpdateProfile');

export const { getProfileFailed, getProfileSuccess, updateProfileFailed, updateProfileSuccess } =
  profileSlice.actions;

export default profileSlice.reducer;
