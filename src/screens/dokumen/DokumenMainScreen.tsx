import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, FlatList } from 'react-native';
import {
  DokumenItemList,
  HeaderBack,
  MenuHeaderIcon,
  Popup1Button,
  Popup2Button,
} from '../../components';
import { useAppSelector } from '../../config/store/ReduxStore';
import { DokumenStackParamList } from '../../config/navigation/model';
import { icons, sizes, strings } from '../../constants';
import { DokumenData } from '../../redux/reducers/DokumenReducer';

type Props = NativeStackScreenProps<DokumenStackParamList, 'DokumenMainScreen'>;

const DokumenMainScreen = ({ navigation }: Props) => {
  const { dokumenDataList } = useAppSelector(s => s.DokumenReducer) || {};
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [showDeleteSuccess, setShowDeleteSuccess] = useState(false);

  const navigateToDetail = (item: DokumenData) => {
    navigation.navigate('DokumenDetailScreen', { item });
  };

  const deleteFile = () => {
    setShowDeleteConfirmation(false);
    setShowDeleteSuccess(true);
  };

  const onPressDelete = (item: DokumenData) => {
    console.log(item);
    setShowDeleteConfirmation(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Popup2Button
        buttonLeftOnPress={() => setShowDeleteConfirmation(false)}
        buttonRightOnPress={deleteFile}
        buttonLeftTitle={strings.tidak_jadi}
        buttonRightTitle={strings.hapus}
        headerText={strings.hapus_file_popup_confirmation_title}
        contentText={strings.hapus_file_popup_confirmation_content}
        showPopup={showDeleteConfirmation}
        headerImage={icons.icon_info_popup}
      />
      <Popup1Button
        headerText={strings.hapus_file_popup_success_title}
        showPopup={showDeleteSuccess}
        onPress={() => setShowDeleteSuccess(false)}
        headerImage={icons.popup_success}
      />
      <HeaderBack />
      <FlatList
        data={dokumenDataList}
        contentContainerStyle={{
          paddingHorizontal: sizes.padding,
        }}
        ListHeaderComponent={<MenuHeaderIcon menu={strings.dokumen} />}
        ListHeaderComponentStyle={{ marginVertical: sizes.padding }}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => {
          return (
            <DokumenItemList
              item={item}
              onPress={() => navigateToDetail(item)}
              onPressDeleteFile={() => onPressDelete(item)}
            />
          );
        }}
      />
    </SafeAreaView>
  );
};
export default DokumenMainScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
