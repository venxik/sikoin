import React, { useEffect } from 'react';
import { FlatList, Platform, SafeAreaView, StyleSheet } from 'react-native';

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import dayjs from 'dayjs';
import ReactNativeBlobUtil from 'react-native-blob-util';

import { DokumenItemList, HeaderBack, MenuHeaderIcon } from '../../components';
import { useAppDispatch, useAppSelector } from '../../config';
import { HomeStackParamList } from '../../config/navigation/model';
import { apis, sizes, strings } from '../../constants';
import { DokumenData, fetchDokumen } from '../../redux/reducers/DokumenReducer';
import { showErrorModal } from '../../redux/reducers/ErrorModalReducer';

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

  const onPressUnduh = (item: DokumenData) => {
    // send http request in a new thread (using native code)
    const dirs = ReactNativeBlobUtil.fs.dirs;
    const dirsOS = Platform.select({ ios: dirs.DocumentDir, android: dirs.DownloadDir });
    ReactNativeBlobUtil.config({
      fileCache: true,
      addAndroidDownloads: {
        path:
          dirsOS + '/file_' + Math.floor(dayjs().get('date') + dayjs().get('second') / 2) + '.jpeg',
        description: 'Sedang Mengunduh file',
        notification: true,
        // useDownloadManager works with Android only
        useDownloadManager: true,
      },
    })
      .fetch('GET', item.dokumen)
      .then((res) => {
        console.warn('The file saved to ', res.path());
      })
      // Something went wrong:
      .catch((errorMessage) => {
        // error handling
        dispatch(
          showErrorModal({
            options: {
              screenSource: 'DokumenMainScreen',
              errorType: apis.errorTypes.generic,
            },
            error: {
              title: 'Error',
              message: errorMessage as string,
            },
          }),
        );
      });
  };

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
            return <DokumenItemList item={item} onPressUnduh={() => onPressUnduh(item)} />;
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
