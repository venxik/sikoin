import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
} from 'react-native';
import { colors, icons, images, sizes } from '../constants';
import { formatter } from '../utils';
import PropTypes from 'prop-types';

const CardVoucherItem = props => {
  const { data, onPress } = props || {};
  return (
    <TouchableOpacity {...props} onPress={() => onPress(data)}>
      <ImageBackground
        borderRadius={sizes.padding}
        source={images.daftar_koperasi_bg}
        style={{
          paddingLeft: sizes.padding,
          paddingRight: sizes.padding * 2,
          paddingVertical: sizes.padding,
        }}>
        <Image
          source={icons.icon_voucher_small}
          style={{ width: 40, height: 40 }}
        />
        <Text style={styles.textNominal}>
          {formatter.formatNumberToCurreny(data)}
        </Text>
      </ImageBackground>
    </TouchableOpacity>
  );
};

CardVoucherItem.propTypes = {
  data: PropTypes.number,
  onPress: PropTypes.func,
};

CardVoucherItem.defaultProps = {
  data: null,
  onPress: null,
};
export default CardVoucherItem;

const styles = StyleSheet.create({
  textNominal: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: colors.primaryWhite,
  },
});
