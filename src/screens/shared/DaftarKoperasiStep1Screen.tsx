import React, { FC, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import dayjs from 'dayjs';
import { Controller, useForm } from 'react-hook-form';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import Config from 'react-native-config';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Button, CalendarPicker, HeaderBack, TextInputBorder } from '../../components';
import { useAppDispatch } from '../../config';
import { SendUserKoperasiResponseParams } from '../../config/apis/LoginApi';
import { ParentStackParamList } from '../../config/navigation/model';
import { colors, icons, SCREEN_WIDTH, sizes, strings } from '../../constants';
import { fetchKoperasiList, fetchUserKoperasi } from '../../redux/reducers/LoginReducer';

type Props = NativeStackScreenProps<ParentStackParamList, 'DaftarKoperasiStep1Screen'>;

const DaftarKoperasiStep1Screen: FC<Props> = ({ navigation }) => {
  const dispatch = useAppDispatch();
  // const [koperasiName, setKoperasiName] = useState<string>('');
  // const [selected, setSelected] = useState<boolean>(false);
  // const { koperasiListData } = useAppSelector((s) => s.LoginReducer);
  // const [data, setData] = useState<KoperasiListResponse[] | null>(null);

  // // Using a query hook automatically fetches data and returns query values
  // const { data: dataKoperasi } = useGetKoperasiListQuery();
  // console.log('dataKoperasi: ', dataKoperasi);

  // const onChangeKoperasiName = (value: string) => {
  //   setValue('namaKoperasi', value);
  //   setKoperasiName(value);
  // };

  useEffect(() => {
    dispatch(fetchKoperasiList());
  }, []);

  // useEffect(() => {
  //   if (!selected) {
  //     if (koperasiName.length > 2) {
  //       const result: KoperasiListResponse[] = koperasiListData?.filter((value) =>
  //         value.namaKoperasi.toLowerCase().includes(koperasiName.toLowerCase()),
  //       );
  //       setData(result);
  //     } else setData(null);
  //   }
  // }, [koperasiName, selected]);

  const onSubmit = (submitData: SendUserKoperasiResponseParams) => {
    const { tanggalLahir } = submitData;
    dispatch(
      fetchUserKoperasi({
        ...submitData,
        namaKoperasi: 'KPDJP',
        tanggalLahir: dayjs(tanggalLahir).format('YYYY-MM-DD'),
      }),
    );
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SendUserKoperasiResponseParams>({
    defaultValues: {
      namaKoperasi: '',
      noAnggota: '',
      tanggalLahir: '',
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
            backgroundColor={colors.primaryLight}
          >
            {() => <Text style={styles.textCircle}>1/2</Text>}
          </AnimatedCircularProgress>
          <Text style={styles.textTitle}>{strings.isi_data}</Text>
        </View>
        <Text
          style={styles.textTitle2}
        >{`Dapatkan akses masuk ke ${Config.APP_NAME} hanya dengan 2 langkah `}</Text>
      </View>
      {/* BOTTOM SIDE */}
      <View style={styles.bottomContainer}>
        {/* <View>
          <Controller
            control={control}
            name="namaKoperasi"
            render={({ field: { onChange, value } }) => (
              <TextInputBorder
                error={errors.namaKoperasi}
                errorText={errors.namaKoperasi?.message}
                value={value}
                onChangeText={(e) => {
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
                      onChangeKoperasiName(item.namaKoperasi);
                    }}
                  >
                    <Text style={{ color: colors.bodyText }}>{item.namaKoperasi}</Text>
                  </TouchableOpacity>
                );
              }}
            />
          )}
        </View> */}
        <Controller
          control={control}
          name="noAnggota"
          render={({ field: { onChange, value } }) => (
            <TextInputBorder
              error={errors.noAnggota}
              errorText={errors.noAnggota?.message}
              style={{
                marginTop: sizes.padding / 2,
              }}
              value={value}
              onChangeText={(e) => onChange(e)}
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
          name="tanggalLahir"
          render={({ field: { onChange, value } }) => (
            <CalendarPicker
              error={errors.tanggalLahir}
              errorText={errors.tanggalLahir?.message}
              onChangeDate={(date) => {
                onChange(date);
              }}
              value={value}
              style={{ marginTop: sizes.padding, marginBottom: 0 }}
              customText={'Pilih Tanggal Lahir'}
            />
          )}
          rules={{
            required: { value: true, message: 'Mohon isi Tanggal Lahir' },
          }}
        />
      </View>

      <Button
        onPress={handleSubmit(onSubmit)}
        buttonContainerStyle={styles.buttonContainer}
        text={strings.selanjutnya}
        icon={icons.arrow_right_button_white}
        iconLocation="right"
        shadow
      />
      {/* <Button
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
