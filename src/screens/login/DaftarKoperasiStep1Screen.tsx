import React, { FC, useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  ButtonText,
  CalendarPicker,
  HeaderBack,
  TextInputBorder,
} from '../../components';
import { colors, icons, SCREEN_WIDTH, sizes, strings } from '../../constants';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { DaftarKoperasiParamList } from '../../config/navigation/model';
import { Controller, useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '../../config/store/ReduxStore';
import {
  fetchKoperasiList,
  fetchUserKoperasi,
  KoperasiListResponse,
} from '../../redux/reducers/LoginReducer';
import { sendUserKoperasiResponseParams } from '../../config/apis/LoginApi';
import { formatter } from '../../utils';

type Props = NativeStackScreenProps<
  DaftarKoperasiParamList,
  'DaftarKoperasiStep1Screen'
>;

const DaftarKoperasiStep1Screen: FC<Props> = ({ navigation }) => {
  const dispatch = useAppDispatch();
  const [koperasiName, setKoperasiName] = useState<string>('');
  const [selected, setSelected] = useState<boolean>(false);
  const { koperasiListData } = useAppSelector(s => s.LoginReducer);
  const [data, setData] = useState<KoperasiListResponse[] | null>(null);

  const onChangeKoperasiName = (value: string) => {
    setValue('nama_koperasi', value);
    setKoperasiName(value);
  };

  useEffect(() => {
    dispatch(fetchKoperasiList());
  }, []);

  useEffect(() => {
    if (!selected) {
      if (koperasiName.length > 2) {
        const result: KoperasiListResponse[] = koperasiListData?.filter(value =>
          value.nama.toLowerCase().includes(koperasiName.toLowerCase()),
        );
        setData(result);
      } else setData(null);
    }
  }, [koperasiName, selected]);

  const onSubmit = (data: sendUserKoperasiResponseParams) => {
    const { tanggal_lahir } = data;
    dispatch(
      fetchUserKoperasi({
        ...data,
        // tanggal_lahir: formatter.trimDate(tanggal_lahir),
        tanggal_lahir: '1994-03-25',
      }),
    );
  };

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      nama_koperasi: '',
      no_anggota: '',
      tanggal_lahir: '',
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <HeaderBack onPress={() => navigation.goBack()} title={strings.daftar} />
      {/* TOP SIDE */}
      <View style={styles.topContainer}>
        <View style={styles.topInnerContainer}>
          <AnimatedCircularProgress
            size={SCREEN_WIDTH * 0.15}
            rotation={180}
            width={3}
            fill={2}
            tintColor={colors.primary}
            backgroundColor={colors.primaryLight}>
            {() => <Text style={styles.textCircle}>1/2</Text>}
          </AnimatedCircularProgress>
          <Text style={styles.textTitle}>{strings.isi_data}</Text>
        </View>
        <Text style={styles.textTitle2}>
          {strings.daftar_koperasi_isi_data_title_1}
        </Text>
      </View>
      {/* BOTTOM SIDE */}
      <View style={styles.bottomContainer}>
        <View>
          <Controller
            control={control}
            name="nama_koperasi"
            render={({ field: { onChange, value } }) => (
              <TextInputBorder
                error={errors.nama_koperasi}
                errorText={errors.nama_koperasi?.message}
                value={value}
                onChangeText={e => {
                  onChangeKoperasiName(e);
                  onChange(e);
                  if (selected) setSelected(false);
                }}
                placeholder={strings.masukan_nama_koperasimu}
                icon={icons.icon_pencil_textbox}
              />
            )}
            rules={{
              required: { value: true, message: 'Mohon isi Nama Koperasi' },
            }}
          />
          {data && (
            <FlatList
              data={data}
              style={{
                position: 'absolute',
                top: 60,
                zIndex: 2,
                width: '100%',
              }}
              contentContainerStyle={{
                backgroundColor: colors.white,
              }}
              ItemSeparatorComponent={() => (
                <View
                  style={{
                    backgroundColor: colors.strokeDarkGrey,
                    width: '100%',
                    height: 1,
                  }}
                />
              )}
              keyExtractor={(_, index) => index.toString()}
              renderItem={({ item }) => {
                return (
                  <TouchableOpacity
                    onPress={() => {
                      setSelected(true);
                      setData(null);
                      onChangeKoperasiName(item.nama);
                    }}>
                    <Text style={{ color: colors.bodyText }}>{item.nama}</Text>
                  </TouchableOpacity>
                );
              }}
            />
          )}
        </View>
        <Controller
          control={control}
          name="no_anggota"
          render={({ field: { onChange, value } }) => (
            <TextInputBorder
              error={errors.no_anggota}
              errorText={errors.no_anggota?.message}
              style={{
                marginTop: sizes.padding / 2,
              }}
              value={value}
              onChangeText={e => onChange(e)}
              placeholder={strings.masukan_no_anggota}
              icon={icons.icon_number_textbox}
            />
          )}
          rules={{
            required: { value: true, message: 'Mohon isi Nomor Anggota' },
          }}
        />

        <Controller
          control={control}
          name="tanggal_lahir"
          render={({ field: { onChange, value } }) => (
            <CalendarPicker
              error={errors.tanggal_lahir}
              errorText={errors.tanggal_lahir?.message}
              onChangeDate={date => {
                onChange(date);
              }}
              value={value}
              style={{ marginTop: sizes.padding, marginBottom: 0 }}
            />
          )}
          rules={{
            required: { value: true, message: 'Mohon isi Tanggal Lahir' },
          }}
        />
      </View>

      <ButtonText
        onPress={handleSubmit(onSubmit)}
        buttonContainerStyle={styles.buttonContainer}
        text={strings.selanjutnya}
        icon={icons.arrow_right_button_white}
        iconLocation="right"
        shadow
      />
      {/* <ButtonText
        onPress={() => navigation.navigate('DaftarKoperasiSearchScreen')}
        // buttonContainerStyle={styles.buttonContainer}
        text={strings.selanjutnya}
        icon={icons.arrow_right_button_white}
        iconLocation="right"
        shadow
      /> */}
    </SafeAreaView>
  );
};
export default DaftarKoperasiStep1Screen;

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
    padding: sizes.padding,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: sizes.padding,
    width: '90%',
    marginHorizontal: SCREEN_WIDTH * 0.05,
  },
  textCircle: {
    fontFamily: 'Poppins-SemiBold',
    color: colors.bodyText,
  },
});
