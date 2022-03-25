import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type ProfileData = {
  profilePic?: string;
  nama?: string;
  code?: string;
  koperasiName?: string;
  email?: string;
  noTelp?: string;
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
  profileData: ProfileData;
  koperasiData: KoperasiData;
  error: null;
}

const initialState: RootState = {
  profileData: {
    profilePic: 'https://picsum.photos/200/300',
    nama: 'Test 12321321',
    code: 'JBC-0001',
    email: 'test@test.com',
    noTelp: '081312321321',
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
    updateProfile: (state, { payload }: PayloadAction<ProfileData>) => {
      state.profileData.email = payload.email;
      state.profileData.noTelp = payload.noTelp;
      state.profileData.nama = payload.nama;
      state.profileData.profilePic = payload.profilePic;
    },
  },
});

export const { updateProfile } = profileSlice.actions;

export default profileSlice.reducer;
