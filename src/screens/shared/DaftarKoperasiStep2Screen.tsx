import React, { FC, useState } from 'react';
import { Linking, StyleSheet, Text, View } from 'react-native';

import CheckBox from '@react-native-community/checkbox';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Controller, useForm } from 'react-hook-form';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Button, HeaderBack, TextInputBorder } from '../../components';
import { useAppDispatch } from '../../config';
import { ParentStackParamList } from '../../config/navigation/model';
import { colors, icons, SCREEN_WIDTH, sizes, strings } from '../../constants';
import { fetchUserKoperasiEmail } from '../../redux/reducers/LoginReducer';
import { formatter } from '../../utils';

type Props = NativeStackScreenProps<ParentStackParamList, 'DaftarKoperasiStep2Screen'>;

const DaftarKoperasiStep2Screen: FC<Props> = ({ navigation }) => {
  const dispatch = useAppDispatch();

  const [checked, setChecked] = useState(false);

  const onSubmit = ({ email }: { email: string }) => {
    dispatch(
      fetchUserKoperasiEmail({
        userId: 2,
        email: email,
      }),
    );
  };

  const onPressSnK = (webUrl = '') => {
    Linking.canOpenURL(webUrl as string)
      .then((supported) => {
        if (supported) {
          return Linking.openURL(webUrl as string);
        }
      })
      .catch((err: unknown) => console.error('An error occurred', err));
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <HeaderBack onPress={() => navigation.goBack()} title={strings.daftar} />
      {/* TOP SIDE */}
      <View style={styles.topContainer}>
        <View style={styles.topInnerContainer}>
          <AnimatedCircularProgress
            size={SCREEN_WIDTH * 0.13}
            rotation={180}
            width={3}
            fill={50}
            tintColor={colors.primary}
            backgroundColor={colors.primaryLight}
          >
            {() => <Text style={styles.textCircle}>2/2</Text>}
          </AnimatedCircularProgress>
          <Text style={styles.textTitle}>{strings.isi_data}</Text>
        </View>
        <Text style={styles.textTitle2}>{strings.daftar_koperasi_isi_data_title_2}</Text>
      </View>
      {/* BOTTOM SIDE */}
      <View style={styles.bottomContainer}>
        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, value } }) => (
            <TextInputBorder
              error={errors.email}
              errorText={errors.email?.message}
              value={value}
              onChangeText={(e) => onChange(e)}
              placeholder={strings.masukan_email}
              icon={icons.icon_email}
            />
          )}
          rules={{
            required: { value: true, message: 'Mohon isi Email' },
            pattern: {
              value: formatter.EMAIL_REGEX,
              message: 'Format Email Salah',
            },
          }}
        />
        <Text style={styles.textHint}>{strings.daftar_koperasi_isi_data_hint_2}</Text>
        <View style={styles.row}>
          <CheckBox
            disabled={false}
            value={checked}
            onValueChange={(newValue) => setChecked(newValue)}
            tintColors={{ false: colors.primary, true: colors.primary }}
          />
          <Text style={styles.textSnk}>
            Dengan melakukan pendaftaran, maka Pelanggan dianggap telah membaca, mengerti, memahami
            dan menyetujui semua isi dalam
            <Text
              style={styles.textBlue}
              onPress={() => onPressSnK('https://sikoin.id/syarat-ketentuan')}
            >
              {' Syarat & Ketentuan '}
            </Text>
            dan
            <Text
              style={styles.textBlue}
              onPress={() => onPressSnK('https://sikoin.id/kebijakan-privasi')}
            >
              {' Kebijakan Privasi'}
            </Text>
          </Text>
        </View>
      </View>

      <Button
        onPress={handleSubmit(onSubmit)}
        buttonContainerStyle={styles.buttonContainer}
        text={strings.kirim_otp_ke_email}
        icon={icons.arrow_right_button_white}
        iconLocation="right"
        shadow
      />
    </SafeAreaView>
  );
};
export default DaftarKoperasiStep2Screen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topContainer: {
    backgroundColor: colors.tonalLightPrimary,
    borderRadius: sizes.padding,
    marginHorizontal: SCREEN_WIDTH * 0.05,
    padding: SCREEN_WIDTH * 0.05,
  },
  topInnerContainer: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
  },
  textTitle: {
    marginLeft: 16,
    fontSize: 24,
    color: colors.bodyText,
    fontFamily: 'Poppins-Bold',
  },
  textTitle2: {
    marginTop: 16,
    color: colors.bodyText,
    fontSize: 15,
    fontFamily: 'Inter-Regular',
  },
  bottomContainer: {
    marginTop: 16,
    backgroundColor: colors.white,
    borderRadius: sizes.padding,
    margin: SCREEN_WIDTH * 0.05,
    padding: SCREEN_WIDTH * 0.05,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: sizes.padding,
    width: '90%',
    marginHorizontal: SCREEN_WIDTH * 0.05,
  },
  textCircle: { fontWeight: '600', color: colors.bodyText },
  textHint: {
    marginTop: sizes.padding,
    fontSize: 12,
    color: colors.bodyTextGrey,
    fontFamily: 'Inter-Regular',
  },
  row: {
    flexDirection: 'row',
    marginTop: 20,
    marginLeft: -6,
    width: '90%',
  },
  textSnk: {
    color: colors.bodyTextGrey,
    fontSize: 10,
    fontFamily: 'Inter-Regular',
  },
  textBlue: { color: colors.primary, fontSize: 10, fontFamily: 'Inter-Regular' },
});
