import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Button, HeaderBack, Popup1Button } from '../../components';
import { HomeStackParamList } from '../../config/navigation/model';
import { colors, icons, images, sizes, strings } from '../../constants';
import { formatter } from '../../utils';

type Props = NativeStackScreenProps<HomeStackParamList, 'PinjamanReviewScreen'>;

const PinjamanReviewScreen: React.FC<Props> = ({ navigation }) => {
  const [showPopup, setShowPopup] = useState(false);

  const navigateToSuccess = () => {
    navigation.navigate('PinjamanSucessScreen');
  };

  const renderRightButtonHeader = () => {
    return (
      <TouchableOpacity onPress={() => setShowPopup(e => !e)}>
        <Image
          source={icons.icon_shield}
          style={styles.headerIcon}
          resizeMode="stretch"
        />
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Popup1Button
        iconStyle={{ width: 150, height: 200, marginBottom: -sizes.padding }}
        headerText={strings.popup_topup_title}
        contentText={strings.popup_topup_content}
        showPopup={showPopup}
        onPress={() => setShowPopup(e => !e)}
        headerImage={images.img_topup_popup}
        customButtonText={strings.ok_thumbs}
      />
      <HeaderBack
        title={strings.kembali}
        rightIcon={renderRightButtonHeader()}
      />
      <View style={styles.innerContainer}>
        <Text style={styles.textTitle}>{strings.nominal_pengajuan}</Text>
        <View style={styles.textNominalContainer}>
          <Image
            source={icons.icon_rp_dark}
            style={styles.icon}
            resizeMode="cover"
          />
          <Text style={styles.textNominal} numberOfLines={1}>
            {formatter.formatStringToCurrencyNumber('123123123')}
          </Text>
        </View>
        <View style={{ marginBottom: sizes.padding }}>
          <Text style={styles.textTitle}>{strings.nama_lengkap}</Text>
          <Text style={styles.textContent}>Lorem Ipsum Doir</Text>
        </View>
        <View style={{ marginBottom: sizes.padding }}>
          <Text style={styles.textTitle}>{strings.nomor_rekening}</Text>
          <Text style={styles.textContent}>21312321</Text>
        </View>
        <Text style={styles.textTitle}>{strings.nomor_ktp}</Text>
        <Text style={styles.textContent}>1234567087</Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          position: 'absolute',
          bottom: sizes.padding,
          paddingHorizontal: sizes.padding,
          width: '100%',
          zIndex: 1,
        }}>
        <Button
          onPress={() => navigation.goBack()}
          shadow
          secondary
          text={strings.kembali}
          buttonContainerStyle={{ width: '48%' }}
        />
        <Button
          onPress={navigateToSuccess}
          shadow
          text={strings.ajukan}
          buttonContainerStyle={{ width: '48%' }}
        />
      </View>
    </View>
  );
};
export default PinjamanReviewScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    borderRadius: sizes.padding,
    backgroundColor: colors.white,
    paddingTop: sizes.padding * 1.3,
    padding: sizes.padding,
    marginHorizontal: sizes.padding,
    marginBottom: 80,
  },
  textTitle: {
    color: colors.bodyText,
    fontFamily: 'Poppins-Medium',
  },
  textContent: {
    color: colors.primary,
    fontFamily: 'Inter-Bold',
  },
  textNominalContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: sizes.padding * 1.5,
  },
  textNominal: {
    width: '70%',
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: colors.bodyText,
  },
  icon: { width: 40, height: 40 },
  headerIcon: {
    width: sizes.icon_size,
    height: sizes.icon_size,
  },
});
