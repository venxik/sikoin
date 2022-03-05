import { ADD_KELUARGA, DELETE_KELUARGA, UPDATE_KELUARGA } from '../types';

const initialState = {
  keluargaList: [
    {
      status: 'Ayah',
      noTelp: '0802121212',
      nama: 'Testing 12',
      noKtp: '313213213211321',
    },
    {
      status: 'Ibu',
      noTelp: '21321312',
      nama: 'Halo ini Ibu',
      noKtp: '123456789012',
    },
    {
      status: 'Kakak',
      noTelp: '081312212',
      nama: 'Testing 12',
      noKtp: '784214120021341',
    },
  ],
  error: null,
};

const RefKeluargaReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_KELUARGA: {
      return {
        ...state,
        keluargaList: state.keluargaList.concat(action.payload),
      };
    }
    case DELETE_KELUARGA: {
      return {
        keluargaList: state.keluargaList.filter(
          (item, index) =>
            item.status.toLowerCase() !== action.payload.status.toLowerCase(),
        ),
      };
    }
    case UPDATE_KELUARGA: {
      return {
        ...state,
        keluargaList: state.keluargaList.map((p, index) =>
          index === action.index ? action.payload : p,
        ),
      };
    }
    default:
      return state;
  }
};

export default RefKeluargaReducer;
