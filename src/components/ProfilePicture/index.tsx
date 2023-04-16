import React, { useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

import { isEmpty } from 'lodash';
import FastImage from 'react-native-fast-image';

import { useAppSelector } from '../../config';
import { icons, SCREEN_WIDTH } from '../../constants';
import { ProfilePictureProps } from './model';

const ProfilePicture = (props: ProfilePictureProps) => {
  const { onPress, style, disabled = false, showKoperasi = true, isProfile = false } = props || {};

  const { logoKoperasi, profilePic } = useAppSelector((s) => s.HomeReducer.user) || {};
  const { profilePic: profilePic2, logoKoperasi: logoKoperasi2 } =
    useAppSelector((s) => s.ProfileReducer.profileData) || {};

  const [profileSource, setProfileSource] = useState({
    uri: isProfile ? profilePic2 : profilePic,
  });
  const [koperasiSource, setKoperasiSource] = useState({
    uri: isProfile ? logoKoperasi2 : logoKoperasi,
  });

  useEffect(() => {
    if (!isEmpty(profilePic)) setProfileSource({ uri: profilePic });
    if (!isEmpty(logoKoperasi)) setKoperasiSource({ uri: logoKoperasi });
  }, [profilePic, logoKoperasi]);

  return (
    <TouchableOpacity onPress={onPress} style={[styles.container, style]} disabled={disabled}>
      <FastImage
        source={!isEmpty(profileSource.uri) ? profileSource : icons.popup_failed}
        style={styles.profilePicStyle}
      />
      {showKoperasi && (
        <FastImage
          source={!isEmpty(koperasiSource.uri) ? koperasiSource : icons.popup_failed}
          style={styles.koperasiPicStyle}
        />
      )}
    </TouchableOpacity>
  );
};

export default ProfilePicture;

const styles = StyleSheet.create({
  container: { width: SCREEN_WIDTH * 0.25, height: SCREEN_WIDTH * 0.25 },
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
    zIndex: 99,
  },
});
