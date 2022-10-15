import React from 'react';
import { Image, SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';

import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { DetailItemList, HeaderBack } from '../../components';
import { useAppSelector } from '../../config';
import { ProfileStackParamList } from '../../config/navigation/model';
import { colors, SCREEN_WIDTH, sizes, strings } from '../../constants';

type Props = NativeStackScreenProps<ProfileStackParamList, 'DataKoperasiMainScreen'>;

const DataKoperasiMainScreen: React.FC<Props> = ({ navigation }) => {
  const { koperasiData } = useAppSelector((s) => s.ProfileReducer);
  const { namaKoperasi, noBadanHukum, alamat, noTelp, website, koperasiPic } = koperasiData || {};
  return (
    <SafeAreaView style={styles.container}>
      <HeaderBack onPress={() => navigation.goBack()} title={strings.data_koperasi} />
      <ScrollView contentContainerStyle={{ paddingBottom: sizes.padding }}>
        <View style={styles.innerContainer}>
          <Image source={{ uri: koperasiPic }} style={styles.koperasiPic} resizeMode="cover" />
          <DetailItemList title={strings.nama_koperasi} content={namaKoperasi} />
          <DetailItemList title={strings.no_badan_hukum} content={noBadanHukum} />
          <DetailItemList title={strings.alamat} content={alamat} />
          <DetailItemList title={strings.no_telp} content={noTelp} />
          <DetailItemList title={strings.website} content={website} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
export default DataKoperasiMainScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    borderRadius: sizes.padding,
    backgroundColor: colors.white,
    padding: sizes.padding,
    marginHorizontal: sizes.padding,
  },
  titleText: {
    fontSize: 17,
    fontWeight: '700',
    color: colors.bodyTextLightGrey,
    marginTop: sizes.padding,
  },
  koperasiPic: {
    width: SCREEN_WIDTH * 0.25,
    height: SCREEN_WIDTH * 0.25,
    borderRadius: SCREEN_WIDTH * 0.25,
    marginBottom: sizes.padding,
  },
});
