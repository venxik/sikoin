import { useIsFocused } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from 'react-native';
import {
  HeaderBack,
  ListEmptyDataComponent,
  Popup1Button,
  Popup2Button,
} from '../../../../components';
import CardAlamat from '../../../../components/CardAlamat';
import { DataDiriStackParamList } from '../../../../config/navigation/model';
import { useAppDispatch, useAppSelector } from '../../../../config';
import { icons, sizes, strings } from '../../../../constants';
import {
  AlamatDataResponse,
  deleteAlamat,
  fetchAlamatList,
} from '../../../../redux/reducers/AlamatReducer';

type Props = NativeStackScreenProps<
  DataDiriStackParamList,
  'DaftarAlamatMainScreen'
>;

const DaftarAlamatMainScreen: React.FC<Props> = ({ navigation }) => {
  const dispatch = useAppDispatch();
  const isFocused = useIsFocused();

  const [showDeletePopup, setShowDeletePopup] = useState<boolean>(false);
  const [showSuccessDeletePopup, setShowSuccessDeletePopup] =
    useState<boolean>(false);
  const [showFailedPopup, setShowFailedPopup] = useState<boolean>(false);
  const [selectAlamat, setSelectAlamat] = useState<AlamatDataResponse | null>(
    null,
  );
  const { alamatList } = useAppSelector(s => s.AlamatReducer) || [];

  useEffect(() => {
    isFocused ? dispatch(fetchAlamatList()) : null;
  }, [isFocused]);

  const navigateToAddScreen = (update: boolean, item?: AlamatDataResponse) => {
    navigation.navigate('DaftarAlamatAddScreen', { update, item });
  };

  const onPressDeleteAlamat = (item: AlamatDataResponse) => {
    setShowDeletePopup(true);
    setSelectAlamat(item);
  };

  const confirmDeleteAlamat = () => {
    dispatch(deleteAlamat(selectAlamat));
    setShowDeletePopup(false);
    setShowSuccessDeletePopup(true);
  };

  const onPressAddIcon = () => {
    if (alamatList.length < 5) navigateToAddScreen(false);
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
        onPress={() => setShowSuccessDeletePopup(false)}
        headerImage={icons.popup_success}
        headerTextStyle={{ marginBottom: sizes.padding * 1.5 }}
      />
      <Popup1Button
        headerText={'Maksimal Alamat adalah 5'}
        showPopup={showFailedPopup}
        onPress={() => setShowFailedPopup(false)}
        headerImage={icons.popup_failed}
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
        renderItem={({ item }) => {
          return (
            <CardAlamat
              item={item}
              onPressUbah={() => navigateToAddScreen(true, item)}
              onPressDelete={() => onPressDeleteAlamat(item)}
            />
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
