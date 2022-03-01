import { CommonActions, useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import { ButtonText, HeaderBack } from '../../components';
import { colors, icons, strings } from '../../constants';
import { dimensions } from '../../utils';
import { AnimatedCircularProgress } from 'react-native-circular-progress';

const DaftarKoperasiSuccessScreen = () => {
  const navigation = useNavigation();

  const { email } = useSelector(state => state.LoginReducers);

  const navigateToLoginScreen = () => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: 'LoginStackNavigator' }],
      }),
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <HeaderBack onPress={() => navigation.goBack()} title={strings.daftar} />
      {/* TOP SIDE */}
      <View
        style={{
          backgroundColor: colors.tonalLightPrimary,
          borderRadius: 20,
          marginHorizontal: dimensions.SCREEN_WIDTH * 0.05,
          padding: dimensions.SCREEN_WIDTH * 0.05,
        }}>
        <View
          style={{
            flexDirection: 'row',
            width: '100%',
            alignItems: 'center',
          }}>
          <AnimatedCircularProgress
            size={dimensions.SCREEN_WIDTH * 0.13}
            rotation={180}
            width={3}
            fill={100}
            tintColor={colors.primary}
            backgroundColor={colors.primaryLight}>
            {() => (
              <Image
                source={icons.icon_email}
                style={{
                  width: dimensions.SCREEN_WIDTH * 0.05,
                  height: dimensions.SCREEN_WIDTH * 0.05,
                }}
              />
            )}
          </AnimatedCircularProgress>
          <Text
            style={{
              marginLeft: 16,
              fontSize: 20,
              fontWeight: 'bold',
              color: colors.black,
            }}>
            {strings.cek_inbox}
          </Text>
        </View>
        <Text
          style={{
            marginTop: 16,
            color: colors.black,
            fontSize: 24,
            fontWeight: '300',
          }}>
          {strings.daftar_koperasi_success_1}
        </Text>
        <Text
          style={{
            fontSize: 18,
            color: colors.primary,
            fontWeight: 'bold',
            marginVertical: 20,
          }}>
          {email}Text
        </Text>
        <Text
          style={{
            color: colors.black,
            fontSize: 16,
          }}>
          {strings.daftar_koperasi_success_2}
        </Text>
      </View>

      <ButtonText
        onPress={navigateToLoginScreen}
        buttonContainerStyle={{
          position: 'absolute',
          bottom: 20,
          width: '90%',
          marginHorizontal: dimensions.SCREEN_WIDTH * 0.05,
        }}
        text={strings.kembali_ke_login}
        icon={icons.arrow_left_button_white}
        iconLocation="left"
        shadow
      />
    </SafeAreaView>
  );
};
export default DaftarKoperasiSuccessScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
});
