import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Image,
} from 'react-native';
import { useSelector } from 'react-redux';
import { dimensions } from '../utils';
import PropTypes from 'prop-types';

const ProfilePicture = props => {
  const { onPress, style, disabled } = props || {};
  const { profileData } = useSelector(state => state.ProfileDataReducer);
  const { profilePic, koperasiPic } = profileData || {};
  return (
    <TouchableOpacity onPress={onPress} style={style} disabled={disabled}>
      <ImageBackground source={profilePic} style={styles.profilePicStyle}>
        <Image source={koperasiPic} style={styles.koperasiPicStyle} />
      </ImageBackground>
    </TouchableOpacity>
  );
};

ProfilePicture.propTypes = {
  onPress: PropTypes.func,
  disabled: PropTypes.bool,
};

ProfilePicture.defaultProp = {
  onPress: null,
  disabled: false,
};

export default ProfilePicture;

const styles = StyleSheet.create({
  profilePicStyle: {
    width: dimensions.SCREEN_WIDTH * 0.25,
    height: dimensions.SCREEN_WIDTH * 0.25,
  },
  koperasiPicStyle: {
    width: dimensions.SCREEN_WIDTH * 0.2,
    height: dimensions.SCREEN_WIDTH * 0.2,
    position: 'absolute',
    bottom: -dimensions.SCREEN_WIDTH * 0.08,
    right: -dimensions.SCREEN_WIDTH * 0.05,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
