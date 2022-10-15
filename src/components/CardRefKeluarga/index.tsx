import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import Clipboard from '@react-native-clipboard/clipboard';
import { isEmpty } from 'lodash';

import { colors, icons, sizes, strings } from '../../constants';
import Button from '../Button';
import { CardRefKeluargaProps } from './model';

const CardRefKeluarga = (props: CardRefKeluargaProps) => {
  const { item, onPressUbah, onPressDelete } = props || {};
  const { status, telp, nama, ktp } = item;

  const copyToClipboard = (text?: string) => {
    Clipboard.setString(text ?? '');
  };

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <Image source={icons.icon_pin} style={styles.pinIcon} />
        <Text style={styles.textJudul}>{status}</Text>
      </View>
      <Text style={styles.textName}>{nama}</Text>
      <View style={{ marginTop: 10 }}>
        <View style={styles.textContainer}>
          <Text style={styles.textTel}>TEL.</Text>
          <Text style={styles.textNumber}>{telp}</Text>
          {!isEmpty(telp) && (
            <TouchableOpacity onPress={() => copyToClipboard(telp)}>
              <Image source={icons.icon_copy_clipboard} style={styles.iconClipboard} />
            </TouchableOpacity>
          )}
        </View>
        <View style={[styles.textContainer, { marginTop: 10 }]}>
          <Text style={styles.textTel}>KTP.</Text>
          <Text style={styles.textNumber}>{ktp}</Text>
          {!isEmpty(ktp) && (
            <TouchableOpacity onPress={() => copyToClipboard(ktp)}>
              <Image source={icons.icon_copy_clipboard} style={styles.iconClipboard} />
            </TouchableOpacity>
          )}
        </View>
      </View>
      <View style={styles.bottomContainer}>
        <Button
          secondary
          text={strings.ubah}
          onPress={onPressUbah}
          buttonContainerStyle={{
            width: '70%',
          }}
        />
        <Button
          onPress={onPressDelete}
          icon={icons.icon_delete}
          iconLocation={'center'}
          buttonContainerStyle={{
            width: '25%',
          }}
        />
      </View>
    </View>
  );
};

export default CardRefKeluarga;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: sizes.padding,
    width: '100%',
    backgroundColor: colors.white,
    borderRadius: sizes.padding,
    marginBottom: sizes.padding,
  },
  topContainer: { flexDirection: 'row', alignItems: 'center' },
  bottomContainer: {
    flexDirection: 'row',
    width: '100%',
    marginTop: sizes.padding,
    justifyContent: 'space-between',
  },
  pinIcon: {
    width: sizes.padding,
    height: sizes.padding,
    marginRight: sizes.padding / 2,
  },
  textJudul: {
    fontSize: 15,
    color: colors.bodyText,
    fontFamily: 'Poppins-Medium',
  },
  textName: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: colors.bodyText,
    marginTop: sizes.padding / 2,
  },
  textNumber: {
    marginLeft: 10,
    fontSize: 15,
    color: colors.bodyTextLightGrey,
    fontFamily: 'Inter-Regular',
  },
  textTel: {
    fontSize: 15,
    color: colors.bodyText,
    fontFamily: 'Inter-Regular',
  },
  iconClipboard: { width: 20, height: 20, marginLeft: sizes.padding },
  textContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
