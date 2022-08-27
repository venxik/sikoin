import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  Image,
  TouchableOpacity,
} from 'react-native';
import { colors, icons, sizes } from '../../constants';
import { PinjamanItemModalProps } from './model';
import CheckBox from '@react-native-community/checkbox';
import Button from '../Button';

const PinjamanItemModal = (props: PinjamanItemModalProps) => {
  const { onPress, onPressClose, showModal, item } = props;

  const [checked, setChecked] = useState(false);

  return (
    <Modal animationType="slide" transparent={true} visible={showModal}>
      <View style={styles.modalMainView}>
        <View style={styles.modalView}>
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
            }}>
            <Image
              source={icons.icon_cross_white}
              style={{ width: sizes.icon_size, height: sizes.icon_size }}
            />
          </TouchableOpacity>
          <Text style={styles.textTitle}>{item.nama}</Text>
          <Text style={styles.textContent}>{item.keterangan}</Text>
          <Text style={[styles.textTenor, { marginTop: 8 }]}>
            {'Tenor : '}
            <Text style={{ color: colors.primary }}>{item.maksimumTenor}</Text>
          </Text>
          <Text style={styles.textTenor}>
            {'Plafon : '}
            <Text style={{ color: colors.primary }}>{item.maksimumPlafon}</Text>
          </Text>
          <Text style={styles.textUnduhSnk}>Unduh Syarat & Ketentuan</Text>
          <View style={styles.row}>
            <View style={styles.dokumen}>
              <Image
                source={icons.icon_document_word}
                style={{ width: sizes.icon_size, height: sizes.icon_size }}
              />
            </View>
            <View style={{ marginLeft: 16 }}>
              <Text style={styles.textNamaDokumen}>Nama Dokumen.zip</Text>
              <View style={[styles.row, { marginTop: 0 }]}>
                <Text style={styles.textDokumenDetail}>Admin</Text>
                <View style={styles.dot} />
                <Text style={styles.textDokumenDetail}>18 Januari 2022</Text>
              </View>
            </View>
          </View>
          <View style={[styles.row, { paddingHorizontal: 16, marginTop: 20 }]}>
            <CheckBox
              disabled={false}
              value={checked}
              onValueChange={newValue => setChecked(newValue)}
              tintColors={{ false: colors.primary, true: colors.primary }}
            />
            <Text style={styles.textSnk}>
              Saya telah membaca dan menyetujui persyaratan & ketentuan di atas
            </Text>
          </View>
          <Button
            disabled={!checked}
            buttonContainerStyle={{ marginTop: 20, marginHorizontal: -26 }}
            onPress={onPress}
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
    marginTop: 150,
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