import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import PropTypes from 'prop-types';
import { colors, icons, sizes, strings } from '../constants';
import ButtonText from './ButtonText';
import ButtonIcon from './ButtonIcon';
import { useSelector } from 'react-redux';

const CardAlamat = props => {
  const { item, onPressUbah, onPressDelete } = props || {};
  const { judul, alamatLengkap } = item;
  const { nama } = useSelector(state => state.ProfileReducer.profileData) || {};
  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <Image source={icons.icon_pin} style={styles.pinIcon} />
        <Text style={styles.textJudul}>{judul}</Text>
      </View>
      <Text style={styles.textName}>{nama}</Text>
      <Text style={styles.textAlamat}>{alamatLengkap}</Text>
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

CardAlamat.propTypes = { item: PropTypes.object };

CardAlamat.defaultProps = {};

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
    fontWeight: '500',
  },
  textName: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.bodyText,
    marginTop: sizes.padding,
  },
  textAlamat: {
    fontSize: 12,
    color: colors.bodyTextGrey,
    marginTop: sizes.padding / 2,
  },
});
