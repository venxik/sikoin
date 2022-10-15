import React, { FC } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import FastImage from 'react-native-fast-image';
import RenderHTML from 'react-native-render-html';

import { HeaderBack } from '../../components';
import { useAppSelector } from '../../config';
import { HomeStackParamList } from '../../config/navigation/model';
import { colors, SCREEN_HEIGHT, SCREEN_WIDTH, sizes } from '../../constants';

type Props = NativeStackScreenProps<HomeStackParamList, 'KabarDetailScreen'>;

const KabarDetailScreen: FC<Props> = () => {
  const { banner, judul, kategori, konten } =
    useAppSelector((state) => state.KabarReducer.kabarDetail) || {};

  return (
    <SafeAreaView style={styles.container}>
      <HeaderBack />
      <ScrollView style={{ paddingHorizontal: sizes.padding }}>
        <View style={{ padding: sizes.padding }}>
          <View style={styles.kabarSheetContainer}>
            <View style={styles.kabarSheetTopIcon} />
            <Text style={styles.kabarSheetCompany}>{kategori}</Text>
          </View>
          <Text style={styles.textKabarSheetTitle}>{judul}</Text>
          <FastImage
            source={{ uri: banner || 'https://picsum.photos/id/3/400/400' }}
            style={styles.bannerStyle}
          />
          <RenderHTML
            contentWidth={SCREEN_WIDTH}
            source={{ html: konten }}
            baseStyle={{ color: 'black' }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
export default KabarDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  kabarSheetContainer: {
    flexDirection: 'row',
    marginBottom: sizes.padding,
  },
  kabarSheetTopIcon: {
    width: 3,
    backgroundColor: colors.primary,
    borderRadius: 3,
    marginRight: 10,
  },
  kabarSheetCompany: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: colors.primary,
  },
  textKabarSheetTitle: {
    fontSize: 24,
    color: colors.bodyText,
    fontFamily: 'Poppins-Bold',
    marginBottom: 10,
  },
  bannerStyle: {
    width: '100%',
    height: SCREEN_HEIGHT * 0.3,
    borderRadius: sizes.padding,
    marginBottom: sizes.padding,
  },
});
