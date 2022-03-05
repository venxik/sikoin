import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Image,
} from 'react-native';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { SCREEN_WIDTH } from '../constants';

const ProfilePicture = props => {
  const { onPress, style, disabled, showKoperasi } = props || {};
  const { profileData } = useSelector(state => state.ProfileReducer) || {};
  const { profilePic, koperasiPic } = profileData || {};
  return (
    <TouchableOpacity onPress={onPress} style={style} disabled={disabled}>
      <ImageBackground source={profilePic} style={styles.profilePicStyle}>
        {showKoperasi && (
          <Image source={koperasiPic} style={styles.koperasiPicStyle} />
        )}
      </ImageBackground>
    </TouchableOpacity>
  );
};

ProfilePicture.propTypes = {
  onPress: PropTypes.func,
  disabled: PropTypes.bool,
  style: PropTypes.object,
  showKoperasi: PropTypes.bool,
};

ProfilePicture.defaultProp = {
  onPress: null,
  disabled: false,
  style: null,
  showKoperasi: true,
};

export default ProfilePicture;

const styles = StyleSheet.create({
  profilePicStyle: {
    width: SCREEN_WIDTH * 0.25,
    height: SCREEN_WIDTH * 0.25,
  },
  koperasiPicStyle: {
    width: SCREEN_WIDTH * 0.2,
    height: SCREEN_WIDTH * 0.2,
    position: 'absolute',
    bottom: -SCREEN_WIDTH * 0.08,
    right: -SCREEN_WIDTH * 0.05,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
