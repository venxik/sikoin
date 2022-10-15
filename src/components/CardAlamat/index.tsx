import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

import { useAppSelector } from '../../config';
import { colors, icons, sizes, strings } from '../../constants';
import Button from '../Button';
import { CardAlamatProps } from './model';

const CardAlamat = (props: CardAlamatProps) => {
  const { item, onPressUbah, onPressDelete, isCheckout = false } = props || {};
  const { judul, alamat } = item;
  const { nama } = useAppSelector((state) => state.ProfileReducer.profileData) || {};

  return !isCheckout ? (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <Image source={icons.icon_pin} style={styles.pinIcon} />
        <Text style={styles.textJudul}>{judul}</Text>
      </View>
      <Text style={styles.textName}>{nama}</Text>
      <Text style={styles.textAlamat}>{alamat}</Text>
      <View style={styles.bottomContainer}>
        <Button
          shadow={false}
          secondary
          text={strings.ubah}
          onPress={onPressUbah}
          buttonContainerStyle={{
            width: '70%',
          }}
        />
        <Button
          onPress={onPressDelete as () => void}
          icon={icons.icon_delete}
          iconLocation={'center'}
          buttonContainerStyle={{
            width: '25%',
          }}
        />
      </View>
    </View>
  ) : (
    <View style={[styles.container, { borderWidth: 1, borderColor: colors.strokeGrey }]}>
      <View style={styles.topContainer}>
        <Image source={icons.icon_pin} style={styles.pinIcon} />
        <Text style={styles.textJudul}>{judul}</Text>
      </View>
      <Text style={styles.textName}>{nama}</Text>
      <Text style={styles.textAlamat}>{alamat}</Text>
      <Button
        shadow={false}
        secondary
        text={strings.ubah}
        onPress={onPressUbah}
        buttonContainerStyle={{
          flex: 1,
          marginTop: sizes.padding,
        }}
      />
    </View>
  );
};

export default CardAlamat;

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
  textAlamat: {
    fontSize: 12,
    color: colors.bodyTextGrey,
    marginTop: sizes.padding / 4,
    fontFamily: 'Inter-Regular',
  },
});
