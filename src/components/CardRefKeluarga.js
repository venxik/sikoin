import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { colors, icons, sizes, strings } from '../constants';
import ButtonText from './ButtonText';
import ButtonIcon from './ButtonIcon';
import Clipboard from '@react-native-clipboard/clipboard';

const CardRefKeluarga = props => {
  const { item, onPressUbah, onPressDelete } = props || {};
  const { status, noTelp, nama, noKtp } = item;

  const copyToClipboard = text => {
    Clipboard.setString(text.toString());
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
          <Text style={styles.textRp}>TEL.</Text>
          <Text style={styles.textNumber}>{noTelp}</Text>
          <TouchableOpacity onPress={() => copyToClipboard(noTelp)}>
            <Image
              source={icons.icon_copy_clipboard}
              style={styles.iconClipboard}
            />
          </TouchableOpacity>
        </View>
        <View style={[styles.textContainer, { marginTop: 10 }]}>
          <Text style={styles.textRp}>KTP.</Text>
          <Text style={styles.textNumber}>{noKtp}</Text>
          <TouchableOpacity onPress={() => copyToClipboard(noKtp)}>
            <Image
              source={icons.icon_copy_clipboard}
              style={styles.iconClipboard}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.bottomContainer}>
        <ButtonText
          text={strings.ubah}
          onPress={onPressUbah}
          buttonContainerStyle={{
            backgroundColor: colors.tonalLightPrimary,
            width: '70%',
          }}
          textStyle={{ color: colors.primary }}
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

CardRefKeluarga.propTypes = { item: PropTypes.object };

CardRefKeluarga.defaultProps = {};

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
    fontWeight: '500',
  },
  textName: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.bodyText,
    marginTop: sizes.padding,
  },
  textNumber: {
    marginLeft: 10,
    fontSize: 15,
    color: colors.bodyTextLightGrey,
  },
  textRp: {
    fontSize: 15,
    color: colors.bodyText,
  },
  iconClipboard: { width: 20, height: 20, marginLeft: sizes.padding },
  textContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
