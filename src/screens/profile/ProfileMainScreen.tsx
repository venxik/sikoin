import { NativeStackScreenProps } from '@react-navigation/native-stack';
import moment from 'moment';
import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import {
  Button,
  HeaderBack,
  ProfilePicture,
  SubmenuItemList,
} from '../../components';
import { ProfileStackParamList } from '../../config/navigation/model';
import { useAppDispatch, useAppSelector } from '../../config';
import { colors, icons, sizes, strings } from '../../constants';
import { fetchProfile } from '../../redux/reducers/ProfileReducer';
import 'moment/locale/id';
import { isEmpty } from 'lodash';

type Props = NativeStackScreenProps<ProfileStackParamList, 'ProfileMainScreen'>;

const ProfileMainScreen: React.FC<Props> = ({ navigation }) => {
  const dispatch = useAppDispatch();
  const { profileData } = useAppSelector(state => state.ProfileReducer) || {};
  const { nama, email, memberSejak, noAnggota, noTelp } = profileData || {};

  useEffect(() => {
    dispatch(fetchProfile());
    moment.locale('id');
  }, []);

  const navigateToEditProfile = () => {
    navigation.navigate('EditProfileScreen');
  };

  const checkIsEmpty = <T,>(text: T) => {
    if (isEmpty(text)) return '-';
    return text;
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
            {/* <Text style={styles.koperasiText}>{koperasiName}</Text> */}
            <View style={{ marginTop: 10 }}>
              <Text style={styles.descText}>{checkIsEmpty(noAnggota)}</Text>
              <Text style={styles.descText}>
                {!isEmpty(memberSejak)
                  ? `Member Sejak ${moment(memberSejak).format('DD MMMM YYYY')}`
                  : '-'}
              </Text>
              <Text style={styles.descText}>{checkIsEmpty(email)}</Text>
              <Text style={styles.descText}>{checkIsEmpty(noTelp)}</Text>
            </View>
          </View>
          <Button
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
            onPress={() => navigation.navigate('DataDiriStackNavigator')}
          />
          <SubmenuItemList
            icon={icons.icon_data_koperasi}
            title={strings.data_koperasi}
            onPress={() => navigation.navigate('DataKoperasiMainScreen')}
          />
          <SubmenuItemList
            icon={icons.icon_pengaturan}
            title={strings.pengaturan}
            onPress={() => navigation.navigate('PengaturanScreen')}
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
    fontFamily: 'Poppins-Bold',
    fontSize: sizes.padding,
    color: colors.bodyText,
    marginTop: sizes.padding,
  },
  koperasiText: {
    fontFamily: 'Poppins-Bold',
    fontWeight: '700',
    fontSize: 17,
    color: colors.bodyTextLightGrey,
  },
  descText: {
    fontSize: 15,
    color: colors.bodyTextGrey,
    fontFamily: 'Inter-Regular',
  },
  menuProfile: {
    color: colors.bodyTextLightGrey,
    fontSize: 17,
    fontFamily: 'Poppins-Bold',
  },
});
