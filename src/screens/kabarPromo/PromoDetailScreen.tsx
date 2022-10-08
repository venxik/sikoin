import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { FC } from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  ScrollView,
  Text,
  Linking,
} from 'react-native';
import { Button, HeaderBack } from '../../components';
import { HomeStackParamList } from '../../config/navigation/model';
import { useAppSelector } from '../../config';
import { colors, SCREEN_HEIGHT, sizes } from '../../constants';
import FastImage from 'react-native-fast-image';

type Props = NativeStackScreenProps<HomeStackParamList, 'PromoDetailScreen'>;

const PromoDetailScreen: FC<Props> = () => {
  const { banner, deskripsi, judul, webUrl } =
    useAppSelector(state => state.PromoReducer.promoDetail) || {};

  const onPressWebUrl = () => {
    Linking.canOpenURL(webUrl as string)
      .then(supported => {
        if (supported) {
          return Linking.openURL(webUrl as string);
        }
      })
      .catch((err: unknown) => console.error('An error occurred', err));
  };

  return (
    <SafeAreaView style={styles.container}>
      <HeaderBack />
      <ScrollView style={{ paddingHorizontal: sizes.padding }}>
        <View style={{ paddingHorizontal: sizes.padding }}>
          <Text style={styles.textKabarSheetTitle}>{judul}</Text>
          <FastImage
            source={{ uri: banner || 'https://picsum.photos/id/3/400/400' }}
            style={styles.bannerStyle}
          />
          <Text style={styles.textContent}>{deskripsi}</Text>
          <Button
            onPress={onPressWebUrl}
            buttonContainerStyle={{
              width: '100%',
            }}
            text={'Buka Halaman Web'}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
export default PromoDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  },
  textContent: {
    marginVertical: sizes.padding,
    fontSize: 15,
    color: colors.bodyTextGrey,
    fontFamily: 'Inter-Regular',
  },
});
