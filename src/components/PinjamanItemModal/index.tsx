import React, { useState } from 'react';
import { Image, Modal, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import CheckBox from '@react-native-community/checkbox';
import dayjs from 'dayjs';
import { isEmpty } from 'lodash';
import ReactNativeBlobUtil from 'react-native-blob-util';

import { useAppDispatch } from '../../config';
import { apis, colors, icons, images, sizes } from '../../constants';
import { showErrorModal } from '../../redux/reducers/ErrorModalReducer';
import { formatter } from '../../utils';
import Button from '../Button';
import { PinjamanItemModalProps } from './model';

const PinjamanItemModal = (props: PinjamanItemModalProps) => {
  const { onPress, onPressClose, showModal, item } = props;

  const [checked, setChecked] = useState(false);
  const dispatch = useAppDispatch();

  const onPressUnduh = () => {
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

  return (
    <Modal animationType="slide" transparent={true} visible={showModal}>
      <View style={styles.modalMainView}>
        <View style={styles.modalView}>
          <Image
            source={images.img_pinjaman_overlay_2}
            resizeMode="stretch"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              width: '100%',
              height: '50%',
            }}
          />
          <TouchableOpacity
            onPress={onPressClose}
            style={{
              position: 'absolute',
              top: -20,
              right: -20,
              backgroundColor: colors.primary,
              width: 48,
              height: 48,
              borderRadius: 48,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Image
              source={icons.icon_cross_white}
              style={{ width: sizes.icon_size, height: sizes.icon_size }}
            />
          </TouchableOpacity>
          <Text style={styles.textTitle}>{item?.nama}</Text>
          <Text style={styles.textContent}>{item?.keterangan}</Text>
          <Text style={[styles.textTenor, { marginTop: 8 }]}>
            {'Tenor : '}
            <Text style={{ color: colors.primary }}>{item?.maksimumTenor}</Text>
          </Text>
          <Text style={styles.textTenor}>
            {'Plafon : '}
            <Text style={{ color: colors.primary }}>
              Rp. {formatter.formatNumberToCurreny(item?.maksimumPlafon)}
            </Text>
          </Text>
          <Text style={styles.textUnduhSnk}>Unduh Syarat & Ketentuan</Text>
          <TouchableOpacity
            style={styles.row}
            onPress={onPressUnduh}
            disabled={isEmpty(item.dokumen)}
          >
            <View style={styles.dokumen}>
              <Image
                source={icons.icon_document_word}
                style={{ width: sizes.icon_size, height: sizes.icon_size }}
              />
            </View>
            <View style={{ marginLeft: 16 }}>
              <Text style={styles.textNamaDokumen}>
                {!isEmpty(item.namaDokumen) ? item.namaDokumen : '-'}
              </Text>
            </View>
          </TouchableOpacity>
          <View style={[styles.row, { paddingHorizontal: 16, marginTop: 20 }]}>
            <CheckBox
              disabled={false}
              value={checked}
              onValueChange={(newValue) => setChecked(newValue)}
              tintColors={{ false: colors.primary, true: colors.primary }}
            />
            <Text style={styles.textSnk}>
              Saya telah membaca dan menyetujui persyaratan & ketentuan di atas
            </Text>
          </View>
          <Button
            disabled={!checked}
            buttonContainerStyle={{ marginTop: 20, marginHorizontal: -26 }}
            onPress={() => {
              setChecked(false);
              onPress();
            }}
            text={'Ajukan Pinjaman'}
          />
        </View>
      </View>
    </Modal>
  );
};

export default PinjamanItemModal;

const styles = StyleSheet.create({
  modalMainView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.1)',
  },
  modalView: {
    width: '85%',
    backgroundColor: colors.white,
    borderRadius: sizes.padding,
    paddingHorizontal: sizes.padding * 2.5,
    paddingVertical: sizes.padding,
    elevation: 2,
  },
  row: {
    flexDirection: 'row',
    marginTop: 8,
    alignItems: 'center',
  },
  textTitle: {
    fontSize: 36,
    fontWeight: '700',
    fontFamily: 'Inter-Bold',
    color: colors.bodyText,
    marginTop: 100,
  },
  textContent: {
    fontSize: 12,
    fontWeight: '500',
    fontFamily: 'Inter-Medium',
    color: colors.bodyText,
  },
  textTenor: {
    fontSize: 12,
    fontWeight: '500',
    fontFamily: 'Inter-Bold',
    color: colors.bodyText,
  },
  textUnduhSnk: {
    marginTop: 8,
    fontWeight: '500',
    color: colors.bodyText,
    fontSize: 15,
    fontFamily: 'Poppins-Medium',
  },
  dokumen: {
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.primaryWhite,
    borderRadius: 12,
  },
  textNamaDokumen: {
    color: colors.bodyText,
    fontWeight: '500',
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
  },
  textDokumenDetail: {
    color: colors.bodyText,
    fontSize: 12,
    fontFamily: 'Inter-Regular',
  },
  textSnk: {
    color: colors.black,
    fontSize: 10,
    fontFamily: 'Inter-Regular',
    width: '80%',
  },
  dot: {
    width: 2,
    height: 2,
    borderRadius: 2,
    marginHorizontal: 4,
    backgroundColor: colors.bodyText,
  },
});
