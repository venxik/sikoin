import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, Image } from 'react-native';
import { Button } from '../../components';
import { HomeStackParamList } from '../../config/navigation/model';
import { colors, icons, SCREEN_HEIGHT, sizes, strings } from '../../constants';

type Props = NativeStackScreenProps<HomeStackParamList, 'PaymentScreen'>;

const PembayaranSuccessScreen: React.FC<Props> = ({ navigation }) => {
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
        <Image
          source={icons.icon_topup_success}
          style={styles.icon}
          resizeMode="contain"
        />
        <Text style={styles.textTitle}>{strings.topup_success_title}</Text>
        <Text style={styles.textContent}>{strings.topup_success_content}</Text>
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
export default PembayaranSuccessScreen;

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
