import React, { FC } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import FastImage from 'react-native-fast-image';
import RenderHTML from 'react-native-render-html';

import { HeaderBack } from '../../components';
import { useAppSelector } from '../../config';
import { ChatStackParamList } from '../../config/navigation/model';
import { colors, SCREEN_WIDTH, sizes } from '../../constants';

type Props = NativeStackScreenProps<ChatStackParamList, 'ChatDetailScreen'>;

const ChatDetailScreen: FC<Props> = () => {
  const { body, logoKoperasi, pengirim, perihal, waktu } = useAppSelector(
    (s) => s.NotifikasiReducer.notifikasiDetail,
  );

  return (
    <View style={{ flex: 1, backgroundColor: colors.white }}>
      <HeaderBack
        title={perihal}
        rightIcon={<FastImage source={{ uri: logoKoperasi }} style={styles.iconHeader} />}
      />
      <View style={styles.mainContainer}>
        <View style={styles.headerContainer}>
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
              {pengirim}
            </Text>
          </View>
        </View>
        <RenderHTML
          contentWidth={SCREEN_WIDTH}
          source={{ html: body }}
          baseStyle={{ color: 'black' }}
        />
      </View>
    </View>
  );
};

export default ChatDetailScreen;

const styles = StyleSheet.create({
  mainContainer: {
    paddingHorizontal: sizes.padding * 1.5,
  },
  iconHeader: {
    width: sizes.icon_size,
    height: sizes.icon_size,
    borderRadius: sizes.icon_size,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: sizes.padding * 2,
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
