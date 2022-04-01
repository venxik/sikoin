import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { colors, icons, sizes, strings } from '../../constants';
import CardVoucherItem from '../CardVoucherItem';
import Popup1Button from '../Popup1Button';
import { CardVoucherLargeProps } from './model';

const CardVoucherLarge = (props: CardVoucherLargeProps) => {
  const { data, onPressVoucher } = props || {};

  const { namaToko, logoToko, SnK, detailToko, listVoucher } = data || {};
  const [showInfoPopup, setshowInfoPopup] = useState(false);

  return (
    <View style={styles.container}>
      <Popup1Button
        scrollable={true}
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
        {listVoucher?.map((item, i) => (
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
    width: 100,
    height: 70,
  },
  iconPopup: {
    width: sizes.icon_size,
    height: sizes.icon_size,
  },
  textNamaToko: {
    color: colors.bodyText,
    fontFamily: 'Poppins-Bold',
    fontSize: 20,
  },
  textSnk: {
    color: colors.bodyTextLightGrey,
    fontFamily: 'Poppins-Bold',
    fontSize: 17,
  },
  textSnkContent: {
    color: colors.bodyTextGrey,
    fontSize: 15,
    marginTop: sizes.padding / 2,
    fontFamily: 'Inter-Regular',
  },
  voucherContainer: {
    marginVertical: sizes.padding,
    flexDirection: 'row',
    borderRadius: sizes.padding,
    borderWidth: 1,
    borderColor: colors.strokeGrey,
    paddingVertical: sizes.padding,
  },
});
