import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
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
import { deleteKelFromReducer } from '../../../redux/actions/RefKeluargaAction';

const DaftarRefKeluargaMainScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [showSuccessDeletePopup, setSuccessShowDeletePopup] = useState(false);
  const [selectKeluarga, setSelectKeluarga] = useState(null);
  const { keluargaList } = useSelector(s => s.RefKeluargaReducer);

  const navigateToAddScreen = (update, index, item) => {
    navigation.navigate('DaftarRefKeluargaAddScreen', { update, index, item });
  };

  const deleteKeluarga = item => {
    setShowDeletePopup(true);
    setSelectKeluarga(item);
  };

  const confirmDeleteAlamat = () => {
    dispatch(deleteKelFromReducer(selectKeluarga));
    setShowDeletePopup(false);
    setSuccessShowDeletePopup(true);
  };

  const renderRightButtonHeader = () => {
    return (
      <View style={{ flexDirection: 'row' }}>
        <TouchableOpacity
          onPress={() => {
            navigateToAddScreen(false);
          }}>
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
    <View style={styles.container}>
      <HeaderBack
        onPress={() => navigation.goBack()}
        title={strings.daftar_alamat}
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
        onPress={() => setSuccessShowDeletePopup(false)}
        headerImage={icons.popup_success}
        headerTextStyle={{ marginBottom: sizes.padding * 1.5 }}
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
                onPressDelete={() => deleteKeluarga(item)}
              />
            </View>
          );
        }}
      />
    </View>
  );
};
export default DaftarRefKeluargaMainScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
