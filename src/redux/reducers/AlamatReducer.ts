import { createSlice } from '@reduxjs/toolkit';

export type AlamatData = {
  judul: string;
  alamatLengkap: string;
  rt: string;
  rw: string;
  provinsi: string;
  kabupaten: string;
  kecamatan: string;
  kodepos: string;
};

interface RootState {
  alamatList: AlamatData[];
  error: null;
}

const initialState: RootState = {
  alamatList: [
    {
      judul: 'Rumah',
      alamatLengkap:
        '50/F, Menara BCA Grand Indonesia JI.MH. Thamrin No.1 Jakarta, RT.1/RW.5, Menteng, Central Jakarta City, Jakarta 10310',
      rt: '01',
      rw: '02',
      provinsi: 'jakarta',
      kabupaten: 'sdsadasdas',
      kecamatan: 'Test',
      kodepos: '123123',
    },
    {
      judul: 'Apart',
      alamatLengkap:
        '50/F, Menara BCA Grand Indonesia JI.MH. Thamrin No.1 Jakarta, RT.1/RW.5, Menteng, Central Jakarta City, Jakarta 10310',
      rt: '01',
      rw: '02',
      provinsi: 'jakarta',
      kabupaten: 'sdsadasdas',
      kecamatan: 'Test',
      kodepos: '123123',
    },
    {
      judul: 'Test',
      alamatLengkap:
        '50/F, Menara BCA Grand Indonesia JI.MH. Thamrin No.1 Jakarta, RT.1/RW.5, Menteng, Central Jakarta City, Jakarta 10310',
      rt: '01',
      rw: '02',
      provinsi: 'jakarta',
      kabupaten: 'sdsadasdas',
      kecamatan: 'Test',
      kodepos: '123123',
    },
    {
      judul: 'Heheheh',
      alamatLengkap:
        '50/F, Menara BCA Grand Indonesia JI.MH. Thamrin No.1 Jakarta, RT.1/RW.5, Menteng, Central Jakarta City, Jakarta 10310',
      rt: '01',
      rw: '02',
      provinsi: 'jakarta',
      kabupaten: 'sdsadasdas',
      kecamatan: 'Test',
      kodepos: '123123',
    },
    {
      judul: 'Rumah ke 2',
      alamatLengkap:
        '50/F, Menara BCA Grand Indonesia JI.MH. Thamrin No.1 Jakarta, RT.1/RW.5, Menteng, Central Jakarta City, Jakarta 10310',
      rt: '01',
      rw: '02',
      provinsi: 'jakarta',
      kabupaten: 'sdsadasdas',
      kecamatan: 'Test',
      kodepos: '123123',
    },
  ],
  error: null,
};

const alamatSlice = createSlice({
  name: 'alamatSlice',
  initialState,
  reducers: {
    addAlamat: (state, { payload }) => {
      state.alamatList.push(payload);
    },
    deleteAlamat: (state, { payload }) => {
      state.alamatList = state.alamatList.filter(
        item => item.judul.toLowerCase() != payload.judul.toLowerCase(),
      );
    },
    updateAlamat: (state, { payload }) => {
      const { data, index } = payload || {};
      state.alamatList[index] = data;
    },
    addAlamatSuccess: state => {
      state.error = null;
    },
    addAlamatFailed: (state, { payload }) => {
      state.error = payload;
    },
  },
});

export const {
  addAlamat,
  addAlamatSuccess,
  addAlamatFailed,
  deleteAlamat,
  updateAlamat,
} = alamatSlice.actions;

export default alamatSlice.reducer;
