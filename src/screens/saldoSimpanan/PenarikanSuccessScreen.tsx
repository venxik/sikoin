import React from 'react';
import { Image, SafeAreaView, StyleSheet, Text, View } from 'react-native';

import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { Button } from '../../components';
import { HomeStackParamList } from '../../config/navigation/model';
import { colors, icons, SCREEN_HEIGHT, sizes, strings } from '../../constants';

type Props = NativeStackScreenProps<HomeStackParamList, 'PenarikanSuccessScreen'>;

const PenarikanSuccessScreen: React.FC<Props> = ({ navigation }) => {
  const navigateToHome = () => {
    navigation.reset({
      index: 0,
      routes: [
        {
          name: 'HomeScreen',
        },
      ],
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.mainContainer}>
        <Image source={icons.icon_topup_success} style={styles.icon} resizeMode="contain" />
        <Text style={styles.textTitle}>{strings.penarikan_success_title}</Text>
        <Text style={styles.textContent}>{strings.penarikan_success_content}</Text>
      </View>
      <View style={{ alignItems: 'center', marginTop: sizes.padding }}>
        <Button
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
export default PenarikanSuccessScreen;

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
    width: '90%',
    marginBottom: sizes.padding,
    fontFamily: 'Poppins-Regular',
  },
  textContent: {
    color: colors.bodyText,
    fontSize: 15,
    textAlign: 'center',
    width: '90%',
    fontFamily: 'Inter-Regular',
    lineHeight: sizes.icon_size,
  },
});
