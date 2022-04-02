import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ImageSourcePropType } from 'react-native';

export type ProfileResponse = {
  profile_pic: string;
  logo_koperasi: string;
  nama: string;
  no_telp: string;
  email: string;
  member_sejak: string;
  no_anggota: string;
};

export type ProfileRequest = {
  profile_pic: string | ImageSourcePropType;
  nama: string;
  no_telp: string;
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
  error?: string | null;
}

const initialState: RootState = {
  profileData: {
    profile_pic: '',
    logo_koperasi: '',
    nama: '',
    no_telp: '',
    email: '',
    member_sejak: '',
    no_anggota: '',
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
    getProfileSuccess: (state, { payload }: PayloadAction<ProfileResponse>) => {
      state.profileData = payload;
    },
    getProfileFailed: (state, { payload }) => {
      state.error = payload;
    },
    updateProfileSuccess: (
      state,
      { payload }: PayloadAction<ProfileResponse>,
    ) => {
      state.profileData = payload;
    },
    updateProfileFailed: (state, { payload }) => {
      state.error = payload;
    },
    updateProfile: (state, { payload }: PayloadAction<ProfileRequest>) => {
      state.profileData.email = payload.email;
    },
  },
});

export const fetchProfile = createAction('fetchProfile');
export const fetchUpdateProfile =
  createAction<ProfileRequest>('fetchUpdateProfile');

export const {
  updateProfile,
  getProfileFailed,
  getProfileSuccess,
  updateProfileFailed,
  updateProfileSuccess,
} = profileSlice.actions;

export default profileSlice.reducer;
