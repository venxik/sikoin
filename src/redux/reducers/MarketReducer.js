import { images } from '../../constants';
import { SET_EMAIL } from '../types';

const initialState = {
  marketDataList: [
    {
      productName: 'Jababeka Bakal Terbitkan Obligasi Global Rp 5,06 Triliun',
      price: 'Rp 17.000.000',
      image: images.daftar_koperasi_bg,
    },
    {
      productName: 'Jababeka Bakal Terbitkan Obligasi Global Rp 5,06 Triliun',
      price: 'Rp 17.000.000',
      image: images.daftar_koperasi_bg,
    },
    {
      productName: 'Jababeka Bakal Terbitkan Obligasi Global Rp 5,06 Triliun',
      price: 'Rp 17.000.000',
      image: images.daftar_koperasi_bg,
    },
    {
      productName: 'Jababeka Bakal Terbitkan Obligasi Global Rp 5,06 Triliun',
      price: 'Rp 17.000.000',
      image: images.daftar_koperasi_bg,
    },
  ],
  error: null,
};

const MarketReducer = (state = initialState, action) => {
  switch (action.type) {
    // case SET_EMAIL:
    //   return { ...state, marketDataList: action.payload };
    default:
      return state;
  }
};

export default MarketReducer;
