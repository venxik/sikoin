import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useSelector } from 'react-redux';
import {
  ButtonText,
  HeaderBack,
  ProfilePicture,
  SubmenuListItem,
} from '../../components';
import { colors, icons, strings } from '../../constants';

const ProfileMainScreen = () => {
  const navigation = useNavigation();
  const { profileData } = useSelector(state => state.ProfileDataReducer);
  const { name, code, koperasiName } = profileData || {};

  const navigateToEditProfile = () => {};

  return (
    <View style={styles.container}>
      <HeaderBack
        onPress={() => navigation.goBack()}
        disabled={true}
        title={strings.profile}
        customLeftIcon={icons.icon_profile}
      />
      <ScrollView style={styles.mainContainer}>
        <View style={styles.topContainer}>
          <ProfilePicture />
          <View style={{ paddingHorizontal: 10, marginBottom: 20 }}>
            <Text style={styles.nameText}>{name}</Text>
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
            buttonContainerStyle={{
              backgroundColor: colors.tonalLightPrimary,
              width: '100%',
            }}
            textStyle={{ color: colors.primary }}
            text={strings.edit_profile}
          />
        </View>
        <View style={styles.topContainer}>
          <Text style={styles.menuProfile}>{strings.menu_profile}</Text>
          <SubmenuListItem
            icon={icons.icon_data_diri}
            title={strings.data_diri}
            navigateTo={'test'}
          />
          <SubmenuListItem
            icon={icons.icon_data_koperasi}
            title={strings.data_koperasi}
            navigateTo={'test'}
          />
          <SubmenuListItem
            icon={icons.icon_pengaturan}
            title={strings.pengaturan}
            navigateTo={'test'}
          />
        </View>
      </ScrollView>
    </View>
  );
};
export default ProfileMainScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topContainer: {
    borderRadius: 20,
    backgroundColor: colors.white,
    padding: 20,
    width: '100%',
    marginBottom: 20,
  },
  mainContainer: {
    paddingHorizontal: 20,
  },
  nameText: {
    fontWeight: '700',
    fontSize: 20,
    color: colors.bodyText,
    marginTop: 20,
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
