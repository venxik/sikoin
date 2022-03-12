import { useNavigation } from '@react-navigation/native';
import React, { useRef, useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import SignatureScreen from 'react-native-signature-canvas';
import { useDispatch } from 'react-redux';
import {
  ButtonText,
  HeaderBack,
  Popup1ButtonScroll,
} from '../../../components';
import {
  colors,
  icons,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
  sizes,
  strings,
} from '../../../constants';
import { addTtd } from '../../../redux/reducers/TtdReducer';

const DaftarTtdAddScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const signatureRef = useRef();

  const [showPopup, setShowPopup] = useState(false);

  const handleOK = signature => {
    dispatch(addTtd({ signature }));
    navigation.goBack();
  };

  const handleClear = () => {
    signatureRef.current.clearSignature();
  };

  const handleConfirm = () => {
    signatureRef.current.readSignature();
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
      <TouchableOpacity onPress={() => setShowPopup(e => !e)}>
        <Image
          source={icons.icon_info_primary}
          style={{
            width: sizes.icon_size,
            height: sizes.icon_size,
          }}
        />
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <HeaderBack title={strings.tanda_tangan} rightIcon={rightHeaderIcon()} />
      <Popup1ButtonScroll
        headerText={strings.popup_ttd_title}
        contentText={strings.popup_ttd_content}
        showPopup={showPopup}
        onPress={() => setShowPopup(e => !e)}
        headerImage={icons.handwriting}
      />
      <View style={styles.innerContainer}>
        <Image
          source={icons.handwriting}
          style={styles.iconHeader}
          resizeMode="contain"
        />
        <Text style={{ marginVertical: 20 }}>{strings.gambar_ttd}</Text>
        <View style={styles.signature}>
          <SignatureScreen
            ref={signatureRef}
            onOK={handleOK}
            webStyle={style}
            backgroundColor={colors.white}
            trimWhitespace={true}
            style={{ width: '100%', height: '60%', borderRadius: 10 }}
          />
        </View>
      </View>
      <View style={styles.buttonRow}>
        <ButtonText
          icon={icons.icon_reset_ttd}
          iconLocation="left"
          text={strings.reset}
          onPress={handleClear}
          buttonContainerStyle={{
            width: '47%',
          }}
          secondary
        />
        <ButtonText
          text={strings.simpan}
          onPress={handleConfirm}
          buttonContainerStyle={{ width: '47%' }}
        />
      </View>
    </SafeAreaView>
  );
};

export default DaftarTtdAddScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: colors.primaryWhite,
  },
  buttonRow: {
    position: 'absolute',
    bottom: sizes.padding,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: SCREEN_WIDTH * 0.05,
  },
  signature: {
    width: SCREEN_WIDTH * 0.8,
    height: SCREEN_HEIGHT * 0.4,
    borderStyle: 'dashed',
    borderWidth: 0.5,
    borderColor: colors.black,
    borderRadius: 20,
    padding: 10,
  },
  innerContainer: {
    borderRadius: 20,
    backgroundColor: colors.white,
    height: SCREEN_HEIGHT * 0.63,
    alignItems: 'center',
    marginHorizontal: 20,
    paddingTop: 20,
  },
  iconHeader: {
    width: 60,
    height: 80,
  },
});
