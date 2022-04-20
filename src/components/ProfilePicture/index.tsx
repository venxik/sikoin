import { isEmpty } from 'lodash';
import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Image,
} from 'react-native';
import { useAppSelector } from '../../config';
import { icons, SCREEN_WIDTH } from '../../constants';
import { ProfilePictureProps } from './model';

const ProfilePicture = (props: ProfilePictureProps) => {
  const { onPress, style, disabled = false, showKoperasi = true } = props || {};

  const { profilePic, logoKoperasi } = useAppSelector(s => s.HomeReducer) || {};

  const [profileSource, setProfileSource] = useState({ uri: profilePic });
  const [koperasiSource, setKoperasiSource] = useState({ uri: logoKoperasi });

  const [loadingSource] = useState(icons.popup_failed);
  const [errorSource] = useState(icons.popup_failed);

  const [isDefault, setIsDefault] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (!isEmpty(profilePic)) setProfileSource({ uri: profilePic });
    if (!isEmpty(logoKoperasi)) setKoperasiSource({ uri: logoKoperasi });
  }, [profilePic, logoKoperasi]);

  const profileImage = isDefault
    ? loadingSource
    : isError
    ? errorSource
    : profileSource;
  const koperasiImage = isDefault
    ? loadingSource
    : isError
    ? errorSource
    : koperasiSource;

  const onErrorProfile = () => {
    setIsError(true);
  };

  const onLoadEndProfile = () => {
    setIsDefault(false);
  };

  const onErrorKoperasi = () => {
    setIsError(true);
  };

  const onLoadEndKoperasi = () => {
    setIsDefault(false);
  };

  return (
    <TouchableOpacity onPress={onPress} style={style} disabled={disabled}>
      <ImageBackground
        onLoadEnd={onLoadEndProfile}
        onError={onErrorProfile}
        imageStyle={styles.profilePicStyle}
        source={profileImage}
        style={styles.profilePicStyle}>
        {showKoperasi && (
          <Image
            source={koperasiImage}
            style={styles.koperasiPicStyle}
            onLoadEnd={onLoadEndKoperasi}
            onError={onErrorKoperasi}
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
