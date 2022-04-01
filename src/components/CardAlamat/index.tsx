import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { colors, icons, sizes, strings } from '../../constants';
import ButtonText from '../ButtonText';
import ButtonIcon from '../ButtonIcon';
import { useAppSelector } from '../../config/store/ReduxStore';
import { CardAlamatProps } from './model';

const CardAlamat = (props: CardAlamatProps) => {
  const { item, onPressUbah, onPressDelete } = props || {};
  const { judul, detail } = item;
  const { nama } =
    useAppSelector(state => state.ProfileReducer.profileData) || {};
  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <Image source={icons.icon_pin} style={styles.pinIcon} />
        <Text style={styles.textJudul}>{judul}</Text>
      </View>
      <Text style={styles.textName}>{nama}</Text>
      <Text style={styles.textAlamat}>{detail}</Text>
      <View style={styles.bottomContainer}>
        <ButtonText
          shadow={false}
          secondary
          text={strings.ubah}
          onPress={onPressUbah}
          buttonContainerStyle={{
            width: '70%',
          }}
        />
        <ButtonIcon
          onPress={onPressDelete}
          icon={icons.icon_delete}
          buttonContainerStyle={{
            width: '25%',
          }}
        />
      </View>
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
