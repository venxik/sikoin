import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { colors, sizes } from '../constants';
import ProfilePicture from './ProfilePicture';

const DetailItemProfileHeader = () => {
  const { nama } = useSelector(s => s.ProfileReducer.profileData) || {};

  return (
    <View style={styles.container}>
      <ProfilePicture disabled showKoperasi={false} />
      <Text style={styles.nameText}>{nama}</Text>
    </View>
  );
};

export default DetailItemProfileHeader;

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  nameText: {
    marginBottom: sizes.padding,
    marginTop: 10,
    fontFamily: 'Poppins-Bold',
    fontSize: 24,
    color: colors.bodyText,
  },
});
