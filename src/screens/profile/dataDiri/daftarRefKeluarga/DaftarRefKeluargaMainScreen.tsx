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
  CardRefKeluarga,
  HeaderBack,
  ListEmptyDataComponent,
  Popup1Button,
  Popup2Button,
} from '../../../../components';
import { DataDiriStackParamList } from '../../../../config/navigation/model';
import { useAppDispatch, useAppSelector } from '../../../../config';
import { icons, sizes, strings } from '../../../../constants';
import {
  deleteKeluarga,
  fetchGetRefKeluarga,
  RefKeluargaResponse,
} from '../../../../redux/reducers/RefKeluargaReducer';

type Props = NativeStackScreenProps<
  DataDiriStackParamList,
  'DaftarRefKeluargaMainScreen'
>;

const DaftarRefKeluargaMainScreen: React.FC<Props> = ({ navigation }) => {
  const dispatch = useAppDispatch();
  const [showDeletePopup, setShowDeletePopup] = useState<boolean>(false);
  const [showSuccessDeletePopup, setShowSuccessDeletePopup] =
    useState<boolean>(false);
  const [showFailedPopup, setShowFailedPopup] = useState<boolean>(false);
  const [selectKeluarga, setSelectKeluarga] =
    useState<RefKeluargaResponse | null>(null);
  const { keluargaList } = useAppSelector(s => s.RefKeluargaReducer) || [];

  useEffect(() => {
    dispatch(fetchGetRefKeluarga());
  }, []);

  const navigateToAddScreen = (update: boolean, item?: RefKeluargaResponse) => {
    navigation.navigate('DaftarRefKeluargaAddScreen', { update, item });
  };

  const onPressDelete = (item: RefKeluargaResponse) => {
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
        renderItem={({ item }) => {
          return (
            <View>
              <CardRefKeluarga
                item={item}
                onPressUbah={() => navigateToAddScreen(true, item)}
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
