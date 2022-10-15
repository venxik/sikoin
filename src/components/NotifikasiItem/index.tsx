import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import FastImage from 'react-native-fast-image';

import { useAppSelector } from '../../config';
import { colors, sizes } from '../../constants';
import { NotifikasiItemProps } from './model';

const NotifikasiItem = (props: NotifikasiItemProps) => {
  const { item, onPress, style } = props || null;
  const { excerpt, perihal, waktu } = item || {};

  //get logo koperasi directly from redux
  const { logoKoperasi } = useAppSelector((s) => s.NotifikasiReducer.notifikasiDataList);

  return (
    <View style={[styles.container, style]}>
      <TouchableOpacity onPress={onPress} style={styles.chatContainer}>
        <FastImage
          source={{ uri: logoKoperasi || 'https://picsum.photos/200/300' }}
          style={styles.iconContainer}
        />
        <View style={styles.textContainer}>
          <View style={styles.textInnerContainer}>
            <Text numberOfLines={1} style={styles.textName}>
              {perihal}
            </Text>
            <Text style={styles.textTime}>{waktu}</Text>
          </View>
          <Text style={styles.textContent} numberOfLines={1}>
            {excerpt}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default NotifikasiItem;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    paddingHorizontal: sizes.padding,
  },
  chatContainer: {
    flexDirection: 'row',
    padding: sizes.padding,
    alignItems: 'center',
  },
  iconContainer: { width: 50, height: 50, borderRadius: 50 },
  textContainer: { marginLeft: sizes.padding / 2, width: '100%' },
  textInnerContainer: {
    flexDirection: 'row',
    width: '80%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textName: {
    color: colors.bodyText,
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
  },
  textContent: {
    color: colors.bodyText,
    width: '70%',
    fontFamily: 'Inter-Regular',
  },
  textTime: { color: colors.primaryLight, fontFamily: 'Poppins-Medium' },
});
