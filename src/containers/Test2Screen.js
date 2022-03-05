import React, { useRef } from 'react';
import { SafeAreaView, StyleSheet, Text, View, Image } from 'react-native';
import SignatureScreen from 'react-native-signature-canvas';
import { ButtonText, HeaderBack } from '../components';
import { colors, icons, SCREEN_HEIGHT, SCREEN_WIDTH } from '../constants';
import {} from '../utils';

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

  const style = `
    body,html {
      width: 100px;
      height: 100px;
    }
    .m-signature-pad--footer {display: none;}
    .m-signature-pad--body {
      position: absolute;
      bottom: 0px;
      top: 0px;
      left: 0px;
      right: 0px;
      border: none;
    }`;

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
          height: SCREEN_HEIGHT * 0.63,
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
            width: SCREEN_WIDTH * 0.8,
            height: SCREEN_HEIGHT * 0.4,
            borderWidth: 0.5,
            borderColor: colors.black,
            borderRadius: 20,
            padding: 10,
          }}>
          <SignatureScreen
            ref={ref}
            onOK={handleOK}
            webStyle={style}
            backgroundColor={colors.white}
            trimWhitespace={true}
            style={{ width: '100%', height: '60%', borderRadius: 10 }}
          />
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
    paddingHorizontal: SCREEN_WIDTH * 0.05,
    // alignItems: 'center',
  },
});

export default Test2Screen;
