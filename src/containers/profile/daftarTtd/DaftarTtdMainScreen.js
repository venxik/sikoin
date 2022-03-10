import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, StyleSheet, Image, SafeAreaView } from 'react-native';
import { useSelector } from 'react-redux';
import {
  ButtonText,
  HeaderBack,
  ListEmptyDataComponent,
} from '../../../components';
import { colors, SCREEN_HEIGHT, sizes, strings } from '../../../constants';

const DaftarTtdMainScreen = () => {
  const navigation = useNavigation();

  // const [showDeletePopup, setShowDeletePopup] = useState(false);
  // const [showSuccessDeletePopup, setSuccessShowDeletePopup] = useState(false);
  const { ttdBase64 } = useSelector(s => s.TtdReducer) || {};

  const navigateToAddScreen = () => {
    // navigation.navigate('DaftarKtpAddScreen', {
    //   update: update,
    //   data: ktpData,
    // });
    navigation.navigate('DaftarTtdAddScreen');
  };

  // const deleteKeluarga = item => {
  //   setShowDeletePopup(true);
  //   setSelectKeluarga(item);
  // };

  // const confirmDeleteAlamat = () => {
  //   dispatch(deleteKelFromReducer(selectKeluarga));
  //   setShowDeletePopup(false);
  //   setSuccessShowDeletePopup(true);
  // };

  const renderEmpty = () => (
    <View style={{ flex: 1 }}>
      <ListEmptyDataComponent
        text={strings.tambah_ttd}
        onPress={navigateToAddScreen}
      />
    </View>
  );

  const renderTtd = () => {
    return (
      <View style={styles.cardContainer}>
        <Image
          source={{ uri: ttdBase64 }}
          style={styles.imageKtp}
          resizeMode="contain"
        />
        <ButtonText onPress={navigateToAddScreen} text={strings.ubah_ttd} />
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <HeaderBack
        onPress={() => navigation.goBack()}
        title={strings.tanda_tangan}
      />
      {/* <Popup2Button
        buttonLeftOnPress={() => setShowDeletePopup(false)}
        buttonRightOnPress={() => confirmDeleteAlamat()}
        buttonLeftTitle={strings.tidak_jadi}
        buttonRightTitle={strings.hapus}
        headerText={strings.yakin_hapus_alamat}
        showPopup={showDeletePopup}
        headerImage={icons.icon_info_popup}
        headerTextStyle={{ marginBottom: sizes.padding * 1.5 }}
      />
      <Popup1Button
        headerText={strings.sukses_hapus_alamat}
        showPopup={showSuccessDeletePopup}
        onPress={() => setSuccessShowDeletePopup(false)}
        headerImage={icons.popup_success}
        headerTextStyle={{ marginBottom: sizes.padding * 1.5 }}
      /> */}
      {ttdBase64 ? renderTtd() : renderEmpty()}
    </SafeAreaView>
  );
};
export default DaftarTtdMainScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cardContainer: {
    padding: sizes.padding,
    backgroundColor: colors.white,
    borderRadius: sizes.padding,
    marginHorizontal: sizes.padding,
  },
  imageKtp: {
    width: '100%',
    height: SCREEN_HEIGHT * 0.25,
    borderRadius: sizes.padding,
    marginBottom: sizes.padding,
  },
});
