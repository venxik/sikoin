import { ADD_ALAMAT, DELETE_ALAMAT, UPDATE_ALAMAT } from '../types';

const initialState = {
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

const AlamatReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ALAMAT: {
      return { ...state, alamatList: state.alamatList.concat(action.payload) };
    }
    case DELETE_ALAMAT: {
      return {
        alamatList: state.alamatList.filter(
          (item, index) =>
            item.judul.toLowerCase() !== action.payload.judul.toLowerCase(),
        ),
      };
    }
    case UPDATE_ALAMAT: {
      return {
        ...state,
        alamatList: state.alamatList.map((p, index) =>
          index === action.index ? action.payload : p,
        ),
      };
    }
    default:
      return state;
  }
};

export default AlamatReducer;
