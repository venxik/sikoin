import { images } from '../../constants';
import { SET_EMAIL } from '../types';

const initialState = {
  kabarDataList: [
    {
      title: 'Jababeka Bakal Terbitkan Obligasi Global Rp 5,06 Triliun',
      profile_pic: images.dummy_profile_pic,
      content:
        'Realisasi belanja pemerintah membeli produk UMKM telah mencapai 70 persen dari target Rp 447,28 triliun.',
      name: 'Achmad Ega',
      timestamp: '12 Desember 2021',
    },
    {
      title: 'Jababeka Bakal Terbitkan Obligasi Global Rp 5,06 Triliun',
      profile_pic: images.dummy_profile_pic,
      content:
        'Realisasi belanja pemerintah membeli produk UMKM telah mencapai 70 persen dari target Rp 447,28 triliun.',
      name: 'Achmad Ega',
      timestamp: '12 Desember 2021',
    },
    {
      title: 'Jababeka Bakal Terbitkan Obligasi Global Rp 5,06 Triliun',
      profile_pic: images.dummy_profile_pic,
      content:
        'Realisasi belanja pemerintah membeli produk UMKM telah mencapai 70 persen dari target Rp 447,28 triliun.',
      name: 'Achmad Ega',
      timestamp: '12 Desember 2021',
    },
  ],
  error: null,
};

const KabarReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_EMAIL:
      return { ...state, kabarDataList: action.payload };
    default:
      return state;
  }
};

export default KabarReducer;
