import { images } from '../../constants';
import { UPDATE_PROFILE } from '../types';

const initialState = {
  profileData: {
    profilePic: images.dummy_profile_pic,
    koperasiPic: images.dummy_koperasi_pic,
    name: 'Test 12321321',
    code: 'JBC-0001',
    koperasiName: 'Jababeka & co',
    email: 'sdsadasdas',
    noTelp: '081312321321',
  },
  error: null,
};

const ProfileDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_PROFILE: {
      return {
        ...state,
        profileData: {
          ...state.profileData,
          email: action.payload.email,
          noTelp: action.payload.noTelp,
          name: action.payload.nama,
        },
      };
    }

    default:
      return state;
  }
};

export default ProfileDataReducer;
