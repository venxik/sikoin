import React, { useEffect, useRef } from 'react';
import type { Node } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Image,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchData } from 'actions/DummyActions';
import SignatureScreen from 'react-native-signature-canvas';
import { ButtonText, HeaderBack } from '../components';
import { colors, icons } from '../constants';
import { dimensions } from '../utils';

const Test2Screen = ({ onOK }) => {
  const ref = useRef();

  const handleOK = signature => {
    console.log(signature);
    // onOK(signature);
  };

  const handleClear = () => {
    ref.current.clearSignature();
  };

  const handleConfirm = () => {
    console.log('end');
    ref.current.readSignature();
  };

  const style = `.m-signature-pad--footer {display: none; margin: 0px;}`;
  // const style = `.m-signature-pad--footer
  // .button {
  //   background-color: red;
  //   color: #FFF;
  // }`;

  const rightHeaderIcon = () => {
    return (
      <View style={{ flexDirection: 'row' }}>
        <Image
          source={icons.arrow_left_primary}
          style={{
            width: 40,
            height: 40,
          }}
        />
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <HeaderBack title="test" rightIcon={rightHeaderIcon()} />
      <View
        style={{
          borderRadius: 20,
          backgroundColor: colors.white,
          height: dimensions.SCREEN_HEIGHT * 0.6,
          alignItems: 'center',
          marginHorizontal: 20,
          paddingTop: 20,
        }}>
        <Image
          source={icons.handwriting}
          style={{
            width: 60,
            height: 80,
          }}
          resizeMode="contain"
        />
        <Text style={{ marginVertical: 20 }}>
          Gambar Tanda tanganmu dibawah ini
        </Text>
        <View
          style={{
            width: dimensions.SCREEN_WIDTH * 0.8,
            height: dimensions.SCREEN_HEIGHT * 0.35,
          }}>
          <SignatureScreen ref={ref} onOK={handleOK} webStyle={style} />
        </View>
      </View>
      <View style={styles.row}>
        <ButtonText
          text="Clear"
          onPress={handleClear}
          buttonContainerStyle={{ width: '47%' }}
        />
        <ButtonText
          text="Confirm"
          onPress={handleConfirm}
          buttonContainerStyle={{ width: '47%' }}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: colors.primaryWhite,
  },
  row: {
    position: 'absolute',
    bottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: dimensions.SCREEN_WIDTH * 0.05,
    // alignItems: 'center',
  },
});

export default Test2Screen;
