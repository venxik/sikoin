import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { FC } from 'react';
import { SafeAreaView, View, StyleSheet, ScrollView, Text } from 'react-native';
import { HeaderBack } from '../../components';
import { HomeStackParamList } from '../../config/navigation/model';
import { useAppSelector } from '../../config';
import { colors, SCREEN_HEIGHT, SCREEN_WIDTH, sizes } from '../../constants';
import FastImage from 'react-native-fast-image';
import RenderHTML from 'react-native-render-html';

type Props = NativeStackScreenProps<HomeStackParamList, 'KabarDetailScreen'>;

const KabarDetailScreen: FC<Props> = () => {
  const { banner, judul, kategori, konten } =
    useAppSelector(state => state.KabarReducer.kabarDetail) || {};

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
          <RenderHTML contentWidth={SCREEN_WIDTH} source={{ html: konten }} />
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
  kabarSheetNameContainer: {
    justifyContent: 'space-evenly',
    marginLeft: 10,
  },
  kabarSheetNameText: {
    justifyContent: 'center',
    marginLeft: 10,
    fontFamily: 'Poppins-Medium',
    color: colors.bodyText,
  },
  kabarSheetTimeStampText: {
    fontSize: 15,
    color: colors.bodyTextGrey,
    fontFamily: 'Inter-Regular',
  },
  kabarSheetContentText: {
    fontSize: 15,
    color: colors.bodyText,
    lineHeight: 24,
    fontFamily: 'Inter-Regular',
  },
  bannerStyle: {
    width: '100%',
    height: SCREEN_HEIGHT * 0.3,
    borderRadius: sizes.padding,
  },
});
