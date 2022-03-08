/* eslint-disable react/prop-types */
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  Image,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { ButtonText, HeaderBack, TextboxForm } from '../../../components';
import {
  colors,
  icons,
  images,
  SCREEN_HEIGHT,
  sizes,
  strings,
} from '../../../constants';
import { addKtp } from '../../../redux/reducers/KtpReducer';

const DaftarKtpAddScreen = ({ route }) => {
  const { params } = route || {};
  const { update, data } = params || {};
  const { ktpNumber: ktpNumberParam, ktpImage: ktpImageParam } = data || {};

  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [ktpNumber, setKtpNumber] = useState(update ? ktpNumberParam : null);
  const [ktpImage, setKtpImage] = useState(update ? ktpImageParam : null);

  const submitKtp = () => {
    if (ktpImage && ktpNumber) {
      dispatch(
        addKtp({
          ktpNumber: ktpNumber,
          ktpImage: ktpImage,
        }),
      );
      navigation.goBack();
    }
  };

  const onChangeKtpNum = value => {
    setKtpNumber(value);
  };

  const changeKtpImage = () => {
    setKtpImage(images.dummy_ktp);
  };

  const renderKtpCard = () => {
    return (
      <View style={styles.cardContainer}>
        <TouchableOpacity onPress={changeKtpImage}>
          <ImageBackground
            imageStyle={styles.imageKtp}
            source={ktpImage ? ktpImage : 0}
            style={styles.imageKtp}
            resizeMode="cover">
            <View style={styles.iconContainer}>
              <Image
                resizeMode="cover"
                source={icons.icon_edit_profle_picture}
                style={{
                  width: sizes.icon_size * 2,
                  height: sizes.icon_size * 2,
                }}
              />
            </View>
          </ImageBackground>
        </TouchableOpacity>
        <TextboxForm
          style={{ marginTop: sizes.padding }}
          value={ktpNumber}
          onChangeText={value => onChangeKtpNum(value)}
          title={strings.no_ktp}
          keyboardType={'numeric'}
        />
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <HeaderBack
        onPress={() => navigation.goBack()}
        title={update ? strings.ubah_ktp : strings.tambah_ktp}
      />

      {renderKtpCard()}

      <ButtonText
        shadow
        onPress={submitKtp}
        buttonContainerStyle={{
          position: 'absolute',
          bottom: sizes.padding,
          width: '90%',
          marginHorizontal: sizes.padding,
        }}
        text={strings.simpan}
      />
    </SafeAreaView>
  );
};
export default DaftarKtpAddScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageKtp: {
    width: '100%',
    height: SCREEN_HEIGHT * 0.25,
    borderRadius: sizes.padding,
  },
  innerContainer: {
    borderRadius: sizes.padding,
    backgroundColor: colors.white,
    padding: sizes.padding,
    marginHorizontal: sizes.padding,
    marginBottom: 80,
  },
  cardContainer: {
    padding: sizes.padding,
    backgroundColor: colors.white,
    borderRadius: sizes.padding,
    marginHorizontal: sizes.padding,
  },
  iconContainer: {
    borderRadius: sizes.padding,
    backgroundColor: 'rgba(0,0,0,0.3)',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
