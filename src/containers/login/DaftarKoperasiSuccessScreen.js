import { CommonActions, useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import { ButtonText, HeaderBack } from '../../components';
import { colors, icons, SCREEN_WIDTH, sizes, strings } from '../../constants';
import { AnimatedCircularProgress } from 'react-native-circular-progress';

const DaftarKoperasiSuccessScreen = () => {
  const navigation = useNavigation();

  const { email } = useSelector(state => state.LoginReducer);

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
          borderRadius: sizes.padding,
          marginHorizontal: SCREEN_WIDTH * 0.05,
          padding: SCREEN_WIDTH * 0.05,
        }}>
        <View
          style={{
            flexDirection: 'row',
            width: '100%',
            alignItems: 'center',
          }}>
          <AnimatedCircularProgress
            size={SCREEN_WIDTH * 0.13}
            rotation={180}
            width={3}
            fill={100}
            tintColor={colors.primary}
            backgroundColor={colors.primaryLight}>
            {() => (
              <Image
                source={icons.icon_email}
                style={{
                  width: SCREEN_WIDTH * 0.05,
                  height: SCREEN_WIDTH * 0.05,
                }}
              />
            )}
          </AnimatedCircularProgress>
          <Text
            style={{
              marginLeft: 16,
              fontSize: sizes.padding,
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
            marginVertical: sizes.padding,
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
          bottom: sizes.padding,
          width: '90%',
          marginHorizontal: SCREEN_WIDTH * 0.05,
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
