import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Image,
} from 'react-native';
import { SCREEN_WIDTH } from '../../constants';
import { ProfilePictureProps } from './model';
import { useAppSelector } from '../../config/store/ReduxStore';

const ProfilePicture = (props: ProfilePictureProps) => {
  const { onPress, style, disabled = false, showKoperasi = true } = props || {};
  const { profileData, koperasiData } =
    useAppSelector(state => state.ProfileReducer) || {};
  const { profilePic } = profileData || {};
  const { koperasiPic } = koperasiData || {};
  return (
    <TouchableOpacity onPress={onPress} style={style} disabled={disabled}>
      <ImageBackground
        imageStyle={styles.profilePicStyle}
        source={{ uri: profilePic }}
        style={styles.profilePicStyle}>
        {showKoperasi && (
          <Image
            source={{ uri: koperasiPic }}
            style={styles.koperasiPicStyle}
          />
        )}
      </ImageBackground>
    </TouchableOpacity>
  );
};

export default ProfilePicture;

const styles = StyleSheet.create({
  profilePicStyle: {
    width: SCREEN_WIDTH * 0.25,
    height: SCREEN_WIDTH * 0.25,
    borderRadius: SCREEN_WIDTH * 0.25,
  },
  koperasiPicStyle: {
    width: SCREEN_WIDTH * 0.1,
    height: SCREEN_WIDTH * 0.1,
    borderRadius: SCREEN_WIDTH * 0.1,
    position: 'absolute',
    bottom: -6,
    right: -6,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
