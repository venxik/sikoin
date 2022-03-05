import { ADD_BIODATA } from '../types';

const initialState = {
  biodataData: {
    tempatLahir: 'Jakarta',
    tanggalLahir: '10 Sep 1999',
    gender: 'Pria',
    golDarah: 'A',
    kewarganegaraan: 'Indonesia',
    pendidikanTerakhir: 'S1',
    agama: 'Kristen',
    statusPernikahan: 'Single',
    jumlahAnak: '4',
    pekerjaan: 'Main kuda',
    detailPekerjaan: 'Halo ini detail',
  },
  error: null,
};

const BiodataReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_BIODATA: {
      return {
        ...state,
        biodataData: action.payload,
      };
    }
    default:
      return state;
  }
};

export default BiodataReducer;
