import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, SafeAreaView, StyleSheet, Image } from 'react-native';
import { useSelector } from 'react-redux';
import { DetailItemList, HeaderBack } from '../../components';
import { colors, images, SCREEN_WIDTH, sizes, strings } from '../../constants';

const DataKoperasiMainScreen = () => {
  const navigation = useNavigation();
  const { koperasiData } = useSelector(s => s.ProfileReducer);
  const { namaKoperasi, noBadanHukum, alamat, noTelp, website } =
    koperasiData || {};
  return (
    <SafeAreaView style={styles.container}>
      <HeaderBack
        onPress={() => navigation.goBack()}
        title={strings.data_koperasi}
      />
      <View style={styles.innerContainer}>
        <Image
          source={images.dummy_koperasi_pic}
          style={styles.koperasiPic}
          resizeMode="stretch"
        />
        <DetailItemList title={strings.nama_koperasi} content={namaKoperasi} />
        <DetailItemList title={strings.no_badan_hukum} content={noBadanHukum} />
        <DetailItemList title={strings.alamat} content={alamat} />
        <DetailItemList title={strings.no_telp} content={noTelp} />
        <DetailItemList title={strings.website} content={website} />
      </View>
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
  },
});
