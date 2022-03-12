import { CommonActions, useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, Image } from 'react-native';
import { ButtonText } from '../../../components';
import {
  colors,
  icons,
  SCREEN_HEIGHT,
  sizes,
  strings,
} from '../../../constants';

const TopupSuccessScreen = () => {
  const navigation = useNavigation();

  const navigateToHome = () => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [
          {
            name: 'HomeScreen',
          },
        ],
      }),
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.mainContainer}>
        <Image
          source={icons.icon_topup_success}
          style={styles.icon}
          resizeMode="contain"
        />
        <Text style={styles.textTitle}>{strings.topup_success_title}</Text>
        <Text style={styles.textContent}>{strings.topup_success_content}</Text>
      </View>
      <View style={{ alignItems: 'center', marginTop: sizes.padding }}>
        <ButtonText
          buttonContainerStyle={{
            marginHorizontal: sizes.padding,
            width: '40%',
          }}
          text={strings.kembali}
          onPress={navigateToHome}
        />
      </View>
    </SafeAreaView>
  );
};
export default TopupSuccessScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainContainer: {
    marginTop: SCREEN_HEIGHT * 0.1,
    alignItems: 'center',
    paddingVertical: sizes.padding,
    backgroundColor: colors.white,
    marginHorizontal: sizes.padding,
    borderRadius: sizes.padding,
  },
  icon: {
    width: 120,
    height: 120,
  },
  textTitle: {
    color: colors.bodyText,
    fontSize: 24,
    textAlign: 'center',
    width: '70%',
    marginBottom: sizes.padding,
  },
  textContent: {
    color: colors.bodyText,
    fontSize: 15,
    textAlign: 'center',
    width: '90%',
  },
});
