import { createSlice } from '@reduxjs/toolkit';
import { images } from '../../constants';

const initialState = {
  profileData: {
    profilePic: images.dummy_profile_pic,
    koperasiPic: images.dummy_koperasi_pic,
    nama: 'Test 12321321',
    code: 'JBC-0001',
    koperasiName: 'Jababeka & co',
    email: 'sdsadasdas',
    noTelp: '081312321321',
  },
  koperasiData: {
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
    updateProfile: (state, { payload }) => {
      state.profileData.email = payload.email;
      state.profileData.noTelp = payload.noTelp;
      state.profileData.nama = payload.nama;
    },
  },
});

export const { updateProfile } = profileSlice.actions;

export default profileSlice.reducer;
