import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { ButtonText } from '../../components';
import { colors, images } from '../../constants';
import { dimensions } from '../../utils';

const DaftarKoperasiScreen = props => {
  return (
    <View style={styles.container}>
      <Image
        style={{
          width: '100%',
          height: '75%',
          position: 'absolute',
          top: 0,
          right: 0,
          left: 0,
        }}
        resizeMode="stretch"
        source={images.daftar_koperasi_bg}
      />
      <Image
        style={{
          width: '80%',
          height: '80%',
          position: 'absolute',
          bottom: 0,
          right: 0,
          zIndex: 1,
        }}
        resizeMode="stretch"
        source={images.daftar_koperasi_question_mark}
      />
      {/* <View
        style={{
          borderBottomEndRadius: 20,
          borderBottomStartRadius: 20,
          backgroundColor: colors.primary,
          width: '100%',
          height: '70%',
        }}> */}
      <Text
        style={{
          color: colors.white,
          fontSize: 24,
          paddingHorizontal: 40,
          paddingTop: dimensions.SCREEN_HEIGHT * 0.5,
          zIndex: 200,
        }}>
        Apakah koperasimu sudah memiliki akses ke CoopApp?
      </Text>
      {/* </View> */}
      <View
        style={{
          flexDirection: 'row',
          width: '100%',
          paddingHorizontal: 40,
          zIndex: 10,
          justifyContent: 'space-between',
          marginTop: 40,
        }}>
        <ButtonText
          // onPress={() => setShowModal(true)}
          buttonContainerStyle={{
            width: '47%',
            paddingVertical: dimensions.SCREEN_WIDTH * 0.03,
            backgroundColor: colors.white,
          }}
          text="Belum"
          textStyle={{ color: colors.primary }}
        />
        <ButtonText
          // onPress={() => setShowModal(true)}
          buttonContainerStyle={{
            width: '47%',
            paddingVertical: dimensions.SCREEN_WIDTH * 0.03,
            backgroundColor: colors.primary,
          }}
          text="Sudah"
          textStyle={{ color: colors.white }}
        />
      </View>
    </View>
  );
};
export default DaftarKoperasiScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    // justifyContent: 'center',
  },
});
