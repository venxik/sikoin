import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { ButtonText, TextboxBorder } from '../../components';
import { colors, icons, images } from '../../constants';
import { dimensions } from '../../utils';

const LoginScreen = props => {
  return (
    <View style={styles.container}>
      <Image
        source={images.login_hi}
        style={{
          width: dimensions.SCREEN_WIDTH * 0.5,
          height: dimensions.SCREEN_WIDTH * 0.5,
          marginBottom: dimensions.SCREEN_HEIGHT * 0.1,
        }}
      />
      <View style={{ width: '100%' }}>
        <TextboxBorder
          style={{
            paddingHorizontal: dimensions.SCREEN_WIDTH * 0.05,
            marginHorizontal: dimensions.SCREEN_WIDTH * 0.1,
          }}
          // value="text"
          // onChangeText={}
          secureTextEntry={false}
          placeholder={'Email'}
          icon={icons.icon_email}
        />
        <TextboxBorder
          style={{
            paddingHorizontal: dimensions.SCREEN_WIDTH * 0.05,
            marginHorizontal: dimensions.SCREEN_WIDTH * 0.1,
            marginTop: dimensions.SCREEN_HEIGHT * 0.02,
          }}
          // value="text"
          // onChangeText={}
          secureTextEntry={true}
          placeholder={'Password'}
          icon={icons.icon_password}
        />

        <View style={{ width: '100%', marginTop: 20 }}>
          <ButtonText
            // onPress={() => setShowModal(true)}
            buttonContainerStyle={{
              paddingHorizontal: dimensions.SCREEN_WIDTH * 0.05,
              paddingVertical: dimensions.SCREEN_WIDTH * 0.03,
              marginHorizontal: dimensions.SCREEN_WIDTH * 0.1,
              backgroundColor: colors.primary,
            }}
            text="Masuk"
          />
          <ButtonText
            // onPress={() => setShowModal(true)}
            buttonContainerStyle={{
              paddingHorizontal: dimensions.SCREEN_WIDTH * 0.05,
              paddingVertical: dimensions.SCREEN_WIDTH * 0.03,
              marginHorizontal: dimensions.SCREEN_WIDTH * 0.1,
              marginTop: dimensions.SCREEN_WIDTH * 0.03,
              backgroundColor: colors.tonalPrimary,
            }}
            textStyle={{ color: colors.primary }}
            text="Daftar Ke Koperasimu"
          />
          <ButtonText
            // onPress={() => setShowModal(true)}
            buttonContainerStyle={{
              paddingHorizontal: dimensions.SCREEN_WIDTH * 0.05,
              paddingVertical: dimensions.SCREEN_WIDTH * 0.03,
              marginHorizontal: dimensions.SCREEN_WIDTH * 0.1,
              marginTop: dimensions.SCREEN_WIDTH * 0.03,
              backgroundColor: colors.tonalLightPrimary,
            }}
            textStyle={{ color: colors.primary }}
            text="Lupa password"
          />
        </View>
      </View>
    </View>
  );
};
export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
