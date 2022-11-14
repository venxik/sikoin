import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import dayjs from 'dayjs';
import FastImage from 'react-native-fast-image';

import { useAppSelector } from '../../config';
import { colors, sizes } from '../../constants';
import { getFormattedDate } from '../../utils';
import { NotifikasiItemProps } from './model';

const NotifikasiItem = (props: NotifikasiItemProps) => {
  const { item, onPress, style } = props || null;
  const { excerpt, perihal, waktu, isTerbaca } = item || {};

  //get logo koperasi directly from redux
  const { logoKoperasi } = useAppSelector((s) => s.NotifikasiReducer.notifikasiDataList);

  return (
    <View style={[styles.container, style, { opacity: isTerbaca ? 0.5 : 1 }]}>
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
            <Text numberOfLines={1} style={styles.textTime}>
              {dayjs().diff(waktu, 'day') === 0
                ? dayjs(waktu).format('HH:mm')
                : getFormattedDate(waktu)}
            </Text>
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
    paddingVertical: sizes.padding,
    paddingHorizontal: sizes.padding / 2,
    alignItems: 'center',
  },
  iconContainer: { width: 50, height: 50, borderRadius: 50 },
  textContainer: { marginLeft: sizes.padding / 2, width: '100%' },
  textInnerContainer: {
    flexDirection: 'row',
    width: '90%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textName: {
    color: colors.bodyText,
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    flex: 0.65,
  },
  textContent: {
    color: colors.bodyText,
    width: '70%',
    fontFamily: 'Inter-Regular',
  },
  textTime: {
    color: colors.primaryLight,
    fontFamily: 'Poppins-Medium',
    flex: 0.35,
    textAlign: 'right',
    paddingRight: sizes.padding,
  },
});
