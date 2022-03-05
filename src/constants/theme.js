import { Dimensions } from 'react-native';

export const SCREEN_HEIGHT = Dimensions.get('window').height;
export const SCREEN_WIDTH = Dimensions.get('window').width;

export const sizes = {
  padding: SCREEN_WIDTH * 0.05,
  icon_size: 24,
  profile_pic_size: SCREEN_WIDTH * 0.25,
};

export default { SCREEN_WIDTH, SCREEN_HEIGHT, sizes };
