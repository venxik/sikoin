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
  HeaderBack,
  ListEmptyDataComponent,
  Popup1Button,
  Popup2Button,
} from '../../../components';
import CardAlamat from '../../../components/CardAlamat';
import { icons, sizes, strings } from '../../../constants';
import { deleteAlamat } from '../../../redux/reducers/AlamatReducer';

const DaftarAlamatMainScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [showSuccessDeletePopup, setSuccessShowDeletePopup] = useState(false);
  const [selectAlamat, setSelectAlamat] = useState(null);
  const { alamatList } = useSelector(s => s.AlamatReducer) || {};

  const navigateToAddScreen = (update, index, item) => {
    navigation.navigate('DaftarAlamatAddScreen', { update, index, item });
  };

  const onPressDeleteAlamat = item => {
    setShowDeletePopup(true);
    setSelectAlamat(item);
  };

  const confirmDeleteAlamat = () => {
    dispatch(deleteAlamat(selectAlamat));
    setShowDeletePopup(false);
    setSuccessShowDeletePopup(true);
  };

  const renderRightButtonHeader = () => {
    return (
      <View style={{ flexDirection: 'row' }}>
        <TouchableOpacity onPress={() => navigateToAddScreen(false)}>
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
        data={alamatList}
        contentContainerStyle={{
          paddingHorizontal: sizes.padding,
          flexGrow: 1,
        }}
        keyExtractor={(item, index) => index.toString()}
        ListEmptyComponent={() => {
          return (
            <View style={{ flex: 1 }}>
              <ListEmptyDataComponent
                text={strings.tambah_alamat}
                onPress={() => navigateToAddScreen(false)}
              />
            </View>
          );
        }}
        renderItem={({ item, index }) => {
          return (
            <View>
              <CardAlamat
                item={item}
                onPressUbah={() => navigateToAddScreen(true, index, item)}
                onPressDelete={() => onPressDeleteAlamat(item)}
              />
            </View>
          );
        }}
      />
    </SafeAreaView>
  );
};
export default DaftarAlamatMainScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
