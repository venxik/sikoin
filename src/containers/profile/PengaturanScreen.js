import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, StyleSheet, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  HeaderBack,
  SubmenuListItem,
  SubmenuListItemCustom,
} from '../../components';
import { colors, icons, sizes, strings } from '../../constants';

const PengaturanScreen = () => {
  const navigation = useNavigation();

  const [isNotifEnabled, setIsNotifEnabled] = useState(false);
  const toggleSwitch = () => setIsNotifEnabled(previousState => !previousState);

  const renderNotificationSwitch = () => (
    <Switch onValueChange={toggleSwitch} value={isNotifEnabled} />
  );
  return (
    <SafeAreaView style={styles.container}>
      <HeaderBack
        onPress={() => navigation.goBack()}
        title={strings.pengaturan}
      />
      <View style={styles.innerContainer}>
        <SubmenuListItemCustom
          icon={icons.icon_notification_black}
          title={strings.notifikasi}
          customRightComponent={renderNotificationSwitch()}
        />
        <SubmenuListItem
          icon={icons.icon_info_black}
          title={strings.info_coopapp}
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
