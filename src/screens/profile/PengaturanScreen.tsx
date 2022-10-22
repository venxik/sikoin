import React, { useState } from 'react';
import { Linking, StyleSheet, Switch, View } from 'react-native';

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';

import { HeaderBack, SubmenuItemList, SubmenuItemListCustom } from '../../components';
import { ProfileStackParamList } from '../../config/navigation/model';
import { colors, icons, sizes, strings } from '../../constants';

type Props = NativeStackScreenProps<ProfileStackParamList, 'PengaturanScreen'>;
const url = 'https://www.sikoin.id';

const PengaturanScreen: React.FC<Props> = ({ navigation }) => {
  const [isNotifEnabled, setIsNotifEnabled] = useState<boolean>(false);
  const toggleSwitch = () => setIsNotifEnabled((previousState) => !previousState);

  const openSikoinWeb = () => {
    Linking.canOpenURL(url)
      .then((supported) => {
        if (supported) {
          return Linking.openURL(url);
        }
      })
      .catch((err: unknown) => console.error('An error occurred', err));
  };

  const navigateToChangePassword = () => {
    navigation.navigate('ChangePasswordScreen');
  };

  const renderNotificationSwitch = () => (
    <Switch
      trackColor={{ false: colors.strokeGrey, true: colors.strokeGrey }}
      onValueChange={toggleSwitch}
      value={isNotifEnabled}
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <HeaderBack onPress={() => navigation.goBack()} title={strings.pengaturan} />
      <View style={styles.innerContainer}>
        <SubmenuItemListCustom
          icon={icons.icon_notification_black}
          title={strings.notifikasi}
          customRightComponent={renderNotificationSwitch()}
        />
        <SubmenuItemList
          onPress={navigateToChangePassword}
          icon={icons.icon_key}
          title={'Ubah Kata Sandi'}
        />
        <SubmenuItemList
          onPress={openSikoinWeb}
          icon={icons.icon_info_black}
          title={strings.info_sikoin}
        />
      </View>
    </SafeAreaView>
  );
};
export default PengaturanScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    borderRadius: sizes.padding,
    backgroundColor: colors.white,
    paddingHorizontal: sizes.padding,
    marginHorizontal: sizes.padding,
    paddingBottom: sizes.padding,
  },
});
