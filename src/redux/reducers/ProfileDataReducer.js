import { images } from '../../constants';
import { SET_EMAIL } from '../types';

const initialState = {
  profileData: {
    profilePic: images.dummy_profile_pic,
    koperasiPic: images.dummy_koperasi_pic,
    name: 'Test 12321321',
    code: 'JBC-0001',
    koperasiName: 'Jababeka & co',
  },
  error: null,
};

const ProfileDataReducer = (state = initialState, action) => {
  switch (action.type) {
    // case SET_EMAIL:
    //   return { ...state, profileData: action.payload };
    default:
      return state;
  }
};

export default ProfileDataReducer;
