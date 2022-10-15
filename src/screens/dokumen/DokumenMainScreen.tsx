import React, { useEffect } from 'react';
import { FlatList, SafeAreaView, StyleSheet } from 'react-native';

import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { DokumenItemList, HeaderBack, MenuHeaderIcon } from '../../components';
import { useAppDispatch, useAppSelector } from '../../config';
import { HomeStackParamList } from '../../config/navigation/model';
import { sizes, strings } from '../../constants';
import { fetchDokumen } from '../../redux/reducers/DokumenReducer';

type Props = NativeStackScreenProps<HomeStackParamList, 'DokumenMainScreen'>;

const DokumenMainScreen: React.FC<Props> = () => {
  const { dokumenDataList } = useAppSelector((s) => s.DokumenReducer) || {};
  // const [showDeleteConfirmation, setShowDeleteConfirmation] =
  //   useState<boolean>(false);
  // const [showDeleteSuccess, setShowDeleteSuccess] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchDokumen());
  }, []);

  // const navigateToDetail = (item: DokumenData) => {
  //   navigation.navigate('DokumenDetailScreen', { item });
  // };

  const onPressUnduh = () => {};

  // const deleteFile = () => {
  //   setShowDeleteConfirmation(false);
  //   setShowDeleteSuccess(true);
  // };

  // const onPressDelete = (item: DokumenData) => {
  //   console.log(item);
  //   setShowDeleteConfirmation(true);
  // };

  return (
    <SafeAreaView style={styles.container}>
      {/* <Popup2Button
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
      /> */}
      <HeaderBack />
      {dokumenDataList && (
        <FlatList
          data={dokumenDataList}
          contentContainerStyle={{
            paddingHorizontal: sizes.padding,
          }}
          ListHeaderComponent={<MenuHeaderIcon menu={strings.dokumen} />}
          ListHeaderComponentStyle={{ marginVertical: sizes.padding }}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => {
            return <DokumenItemList item={item} onPressUnduh={() => onPressUnduh()} />;
          }}
        />
      )}
    </SafeAreaView>
  );
};
export default DokumenMainScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
