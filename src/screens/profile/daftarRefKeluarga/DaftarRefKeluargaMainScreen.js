import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import {
  CardRefKeluarga,
  HeaderBack,
  ListEmptyDataComponent,
  Popup1Button,
  Popup2Button,
} from '../../../components';
import { icons, sizes, strings } from '../../../constants';
import { deleteKeluarga } from '../../../redux/reducers/RefKeluargaReducer';

const DaftarRefKeluargaMainScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [showSuccessDeletePopup, setShowSuccessDeletePopup] = useState(false);
  const [showFailedPopup, setShowFailedPopup] = useState(false);
  const [selectKeluarga, setSelectKeluarga] = useState(null);
  const { keluargaList } = useSelector(s => s.RefKeluargaReducer) || [];

  const navigateToAddScreen = (update, index, item) => {
    navigation.navigate('DaftarRefKeluargaAddScreen', { update, index, item });
  };

  const onPressDelete = item => {
    setShowDeletePopup(true);
    setSelectKeluarga(item);
  };

  const confirmDeleteAlamat = () => {
    dispatch(deleteKeluarga(selectKeluarga));
    setShowDeletePopup(false);
    setShowSuccessDeletePopup(true);
  };

  const onPressAddIcon = () => {
    if (keluargaList.length < 2) navigateToAddScreen(false);
    else setShowFailedPopup(true);
  };

  const renderRightButtonHeader = () => {
    return (
      <View style={{ flexDirection: 'row' }}>
        <TouchableOpacity onPress={onPressAddIcon}>
          <Image
            source={icons.icon_add_data}
            style={{
              width: sizes.icon_size * 0.8,
              height: sizes.icon_size * 0.8,
            }}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <HeaderBack
        onPress={() => navigation.goBack()}
        title={strings.referensi_keluarga}
        rightIcon={renderRightButtonHeader()}
      />
      <Popup2Button
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
        onPress={() => setShowSuccessDeletePopup(false)}
        headerImage={icons.popup_success}
        headerTextStyle={{ marginBottom: sizes.padding * 1.5 }}
      />
      <Popup1Button
        headerText={'Maksimal Referensi Keluarga Adalah 2'}
        showPopup={showFailedPopup}
        onPress={() => setShowFailedPopup(false)}
        headerImage={icons.popup_failed}
      />
      <FlatList
        data={keluargaList}
        contentContainerStyle={{
          paddingHorizontal: sizes.padding,
          flexGrow: 1,
        }}
        keyExtractor={(item, index) => index.toString()}
        ListEmptyComponent={() => {
          return (
            <View style={{ flex: 1 }}>
              <ListEmptyDataComponent
                text={strings.tambah_ref_keluarga}
                onPress={() => navigateToAddScreen(false)}
              />
            </View>
          );
        }}
        renderItem={({ item, index }) => {
          return (
            <View>
              <CardRefKeluarga
                item={item}
                onPressUbah={() => navigateToAddScreen(true, index, item)}
                onPressDelete={() => onPressDelete(item)}
              />
            </View>
          );
        }}
      />
    </SafeAreaView>
  );
};
export default DaftarRefKeluargaMainScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
