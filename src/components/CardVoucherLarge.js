import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';
import { colors, icons, sizes, strings } from '../constants';
import Popup1ButtonScroll from './Popup1ButtonScroll';
import CardVoucherItem from './CardVoucherItem';

const CardVoucherLarge = props => {
  const { data, onPressVoucher } = props || {};

  const { namaToko, logoToko, SnK, detailToko, listVoucher } = data || {};
  const [showInfoPopup, setshowInfoPopup] = useState(false);

  return (
    <View style={styles.container}>
      <Popup1ButtonScroll
        headerImage={logoToko}
        headerText={namaToko}
        showPopup={showInfoPopup}
        contentText={detailToko}
        onPress={() => setshowInfoPopup(e => !e)}
      />

      <View style={styles.iconContainer}>
        <Image source={logoToko} style={styles.logoToko} resizeMode="contain" />
        <TouchableOpacity onPress={() => setshowInfoPopup(e => !e)}>
          <Image source={icons.icon_info_voucher} style={styles.iconPopup} />
        </TouchableOpacity>
      </View>
      <Text style={styles.textNamaToko}>{namaToko}</Text>
      <View style={{ marginLeft: sizes.padding, marginTop: sizes.padding }}>
        <Text style={styles.textSnk}>{strings.snk}</Text>
        <Text style={styles.textSnkContent}>{SnK}</Text>
      </View>
      <ScrollView horizontal style={styles.voucherContainer}>
        {listVoucher.map((item, i) => (
          <View
            key={i}
            style={{
              borderRadius: sizes.padding,
              marginRight: sizes.padding,
              marginLeft: i === 0 ? sizes.padding : 0,
            }}>
            <CardVoucherItem
              data={item}
              onPress={() => onPressVoucher({ data: data, voucher: item })}
            />
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

CardVoucherLarge.propTypes = {
  onPressInfo: PropTypes.func,
  onPressVoucher: PropTypes.func,
  item: PropTypes.any,
};

CardVoucherLarge.defaultProps = {
  onPressInfo: null,
  onPressVoucher: null,
  item: null,
};

export default CardVoucherLarge;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    borderRadius: sizes.padding,
    marginBottom: sizes.padding,
    paddingHorizontal: sizes.padding,
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: sizes.padding,
    justifyContent: 'space-between',
    marginRight: sizes.padding,
  },
  logoToko: {
    width: 80,
    height: 60,
  },
  iconPopup: {
    width: sizes.icon_size,
    height: sizes.icon_size,
  },
  textNamaToko: {
    color: colors.bodyText,
    fontWeight: '700',
    fontSize: 20,
  },
  textSnk: {
    color: colors.bodyTextLightGrey,
    fontWeight: '700',
    fontSize: 17,
  },
  textSnkContent: {
    color: colors.bodyTextGrey,
    fontSize: 15,
    marginTop: sizes.padding,
  },
  voucherContainer: {
    marginVertical: sizes.padding,
    flexDirection: 'row',
    borderRadius: sizes.padding,
    borderWidth: 1,
    borderColor: colors.strokeGrey,
    paddingVertical: sizes.padding,
    // paddingLeft: sizes.padding,
    // paddingRight: sizes.padding * 2,
  },
});