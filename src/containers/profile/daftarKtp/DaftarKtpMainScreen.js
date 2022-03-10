import Clipboard from '@react-native-clipboard/clipboard';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from 'react-native';
import { useSelector } from 'react-redux';
import {
  ButtonText,
  HeaderBack,
  ListEmptyDataComponent,
} from '../../../components';
import {
  colors,
  icons,
  SCREEN_HEIGHT,
  sizes,
  strings,
} from '../../../constants';

const DaftarKtpMainScreen = () => {
  const navigation = useNavigation();

  // const [showDeletePopup, setShowDeletePopup] = useState(false);
  // const [showSuccessDeletePopup, setSuccessShowDeletePopup] = useState(false);
  const { ktpData } = useSelector(s => s.KtpReducer) || {};
  const { ktpNumber, ktpImage } = ktpData || {};

  const navigateToAddScreen = update => {
    navigation.navigate('DaftarKtpAddScreen', {
      update: update,
      data: ktpData,
    });
  };

  const copyToClipboard = text => {
    Clipboard.setString(text.toString());
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
        text={strings.tambah_data_ktp}
        onPress={() => navigateToAddScreen(false)}
      />
    </View>
  );

  const renderKtpCard = () => {
    return (
      <View style={styles.cardContainer}>
        <Image source={ktpImage} style={styles.imageKtp} resizeMode="cover" />
        <View
          style={{
            flexDirection: 'row',
            marginVertical: sizes.padding,
            alignItems: 'center',
          }}>
          <Text style={styles.textStyle}>{ktpNumber}</Text>
          <TouchableOpacity onPress={copyToClipboard}>
            <Image
              source={icons.icon_copy_clipboard}
              style={styles.iconClipboard}
            />
          </TouchableOpacity>
        </View>
        <ButtonText
          onPress={() => navigateToAddScreen(true)}
          text={strings.ubah_ktp}
        />
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <HeaderBack onPress={() => navigation.goBack()} title={strings.ktp} />
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
      {ktpData ? renderKtpCard() : renderEmpty()}
    </SafeAreaView>
  );
};
export default DaftarKtpMainScreen;

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
  textStyle: {
    fontSize: 20,
    fontWeight: '500',
    color: colors.bodyTextLightGrey,
  },
  imageKtp: {
    width: '100%',
    height: SCREEN_HEIGHT * 0.25,
    borderRadius: sizes.padding,
  },
  iconClipboard: { width: 20, height: 20, marginLeft: sizes.padding },
});
