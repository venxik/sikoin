import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { colors } from '../constants';
import ProfilePicture from './ProfilePicture';

const DetailItemListHeader = () => {
  const { name } = useSelector(s => s.ProfileReducer.profileData) || {};

  return (
    <View style={styles.container}>
      <ProfilePicture disabled showKoperasi={false} />
      <Text style={styles.nameText}>{name}</Text>
    </View>
  );
};
export default DetailItemListHeader;

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  nameText: {
    marginBottom: 40,
    fontWeight: '700',
    fontSize: 24,
    color: colors.bodyText,
  },
});
