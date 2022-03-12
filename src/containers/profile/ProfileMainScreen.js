import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { useSelector } from 'react-redux';
import {
  ButtonText,
  HeaderBack,
  ProfilePicture,
  SubmenuItemList,
} from '../../components';
import { colors, icons, sizes, strings } from '../../constants';

const ProfileMainScreen = () => {
  const navigation = useNavigation();
  const { profileData } = useSelector(state => state.ProfileReducer) || {};
  const { nama, code, koperasiName } = profileData || {};

  const navigateToEditProfile = () => {
    navigation.navigate('EditProfileScreen');
  };

  const navigateToOtherScreen = screen => {
    navigation.navigate(screen);
  };

  return (
    <SafeAreaView style={styles.container}>
      <HeaderBack
        onPress={() => navigation.goBack()}
        disabled={true}
        title={strings.profile}
        customLeftIcon={icons.icon_profile}
      />
      <ScrollView style={styles.mainContainer}>
        <View style={styles.topContainer}>
          <ProfilePicture disabled={true} />
          <View style={{ paddingHorizontal: 10, marginBottom: sizes.padding }}>
            <Text style={styles.nameText}>{nama}</Text>
            <Text style={styles.koperasiText}>{koperasiName}</Text>
            <View style={{ marginTop: 10 }}>
              <Text style={styles.descText}>{code}</Text>
              <Text style={styles.descText}>{code}</Text>
              <Text style={styles.descText}>{code}</Text>
              <Text style={styles.descText}>{code}</Text>
            </View>
          </View>
          <ButtonText
            icon={icons.icon_edit_profile}
            iconLocation="right"
            onPress={navigateToEditProfile}
            secondary
            text={strings.edit_profile}
            shadow={false}
          />
        </View>
        <View style={styles.topContainer}>
          <Text style={styles.menuProfile}>{strings.menu_profile}</Text>
          <SubmenuItemList
            icon={icons.icon_data_diri}
            title={strings.data_diri}
            onPress={() => navigateToOtherScreen('DataDiriStackNavigator')}
          />
          <SubmenuItemList
            icon={icons.icon_data_koperasi}
            title={strings.data_koperasi}
            onPress={() => navigateToOtherScreen('DataKoperasiMainScreen')}
          />
          <SubmenuItemList
            icon={icons.icon_pengaturan}
            title={strings.pengaturan}
            onPress={() => navigateToOtherScreen('PengaturanScreen')}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
export default ProfileMainScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topContainer: {
    borderRadius: sizes.padding,
    backgroundColor: colors.white,
    padding: sizes.padding,
    width: '100%',
    marginBottom: sizes.padding,
  },
  mainContainer: {
    paddingHorizontal: sizes.padding,
  },
  nameText: {
    fontWeight: '700',
    fontSize: sizes.padding,
    color: colors.bodyText,
    marginTop: sizes.padding,
  },
  koperasiText: {
    fontWeight: '700',
    fontSize: 17,
    color: colors.bodyTextLightGrey,
  },
  descText: {
    fontSize: 15,
    color: colors.bodyTextGrey,
  },
  menuProfile: {
    color: colors.bodyTextLightGrey,
    fontSize: 17,
    fontWeight: '700',
    marginBottom: 10,
  },
});
