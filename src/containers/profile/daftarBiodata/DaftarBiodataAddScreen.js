import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import {
  ButtonText,
  CalendarPicker,
  DropdownForm,
  HeaderBack,
  TextboxForm,
} from '../../../components';
import { colors, dropdownItems, sizes, strings } from '../../../constants';
import { useForm, Controller } from 'react-hook-form';
import { addBiodata } from '../../../redux/reducers/BiodataReducer';
import dropDownItems from '../../../constants/dropdownItems';

const DaftarBiodataAddScreen = () => {
  const { biodataData } = useSelector(s => s.BiodataReducer) || {};
  const {
    tempatLahir,
    tanggalLahir,
    gender,
    golDarah,
    kewarganegaraan,
    pendidikanTerakhir,
    agama,
    statusPernikahan,
    jumlahAnak,
    pekerjaan,
    detailPekerjaan,
    bank,
    noRek,
  } = biodataData || {};

  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [genderItems, setGenderItems] = useState(dropDownItems.genderItem);
  const [golDarahItems, setGolDarahItems] = useState(
    dropDownItems.golDarahItem,
  );
  const [pendidikanItems, setPendidikanItems] = useState(
    dropDownItems.pendidikanItem,
  );
  const [wargaItems, setWargaItems] = useState(
    dropDownItems.kewarganegaraanItem,
  );
  const [agamaItems, setAgamaItems] = useState(dropDownItems.agamaItem);
  const [statusPernikahanItems, setStatusPernikahanItems] = useState(
    dropdownItems.statusPernikahanItem,
  );
  const [pekerjaanItems, setPekerjaanItems] = useState(
    dropdownItems.pekerjaanItem,
  );
  const [openId, setOpenId] = useState('');

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      tempatLahir: tempatLahir ? tempatLahir : '',
      jumlahAnak: jumlahAnak ? jumlahAnak : '',
      detailPekerjaan: detailPekerjaan ? detailPekerjaan : '',
      bank: bank ? bank : '',
      noRek: noRek ? noRek : '',
    },
  });

  const submitData = data => {
    console.log(data);
    dispatch(addBiodata(data));
    // navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior="height"
        style={{ flex: 1 }}
        keyboardVerticalOffset={50}>
        <HeaderBack
          onPress={() => navigation.goBack()}
          title={strings.biodata}
        />
        <ScrollView>
          <View style={styles.innerContainer}>
            <Controller
              control={control}
              name="tempatLahir"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextboxForm
                  onBlur={onBlur}
                  value={value}
                  onChangeText={value => onChange(value)}
                  title={strings.tempat_lahir}
                />
              )}
              rules={{ required: true }}
            />
            <CalendarPicker
              title={strings.tgl_lahir}
              onChangeDate={date => {
                console.log(date);
              }}
              value={tanggalLahir}
            />
            <View
              style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <DropdownForm
                id={strings.jenis_kelamin}
                openId={openId}
                setOpenId={setOpenId}
                style={{ width: '55%', zIndex: 9000 }}
                title={strings.jenis_kelamin}
                items={genderItems}
                setItems={setGenderItems}
                existsValue={gender}
                onChange={value => {
                  console.log(value);
                }}
              />
              <DropdownForm
                id={strings.gol_darah}
                openId={openId}
                setOpenId={setOpenId}
                style={{ width: '40%', zIndex: 9000 }}
                title={strings.gol_darah}
                items={golDarahItems}
                setItems={setGolDarahItems}
                existsValue={golDarah}
                onChange={value => {
                  console.log(value);
                }}
              />
            </View>
            <DropdownForm
              id={strings.kewarganegaraan}
              openId={openId}
              setOpenId={setOpenId}
              style={{ zIndex: 8000 }}
              title={strings.kewarganegaraan}
              items={wargaItems}
              setItems={setWargaItems}
              existsValue={kewarganegaraan}
              onChange={value => {
                console.log(value);
              }}
            />
            <DropdownForm
              id={strings.pendidikan_terakhir}
              openId={openId}
              setOpenId={setOpenId}
              style={{ zIndex: 7000 }}
              title={strings.pendidikan_terakhir}
              items={pendidikanItems}
              setItems={setPendidikanItems}
              existsValue={pendidikanTerakhir}
              onChange={value => {
                console.log(value);
              }}
            />
            <DropdownForm
              id={strings.agama}
              openId={openId}
              setOpenId={setOpenId}
              style={{ zIndex: 6000 }}
              title={strings.agama}
              items={agamaItems}
              setItems={setAgamaItems}
              existsValue={agama}
              onChange={value => {
                console.log(value);
              }}
            />
            <Controller
              control={control}
              name="bank"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextboxForm
                  onBlur={onBlur}
                  value={value}
                  onChangeText={value => onChange(value)}
                  title={strings.bank}
                />
              )}
              rules={{ required: true }}
            />
            <Controller
              control={control}
              name="noRek"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextboxForm
                  onBlur={onBlur}
                  value={value}
                  onChangeText={value => onChange(value)}
                  title={strings.no_rekening}
                />
              )}
              rules={{ required: true }}
            />
            <DropdownForm
              id={strings.status_pernikahan}
              openId={openId}
              setOpenId={setOpenId}
              style={{ zIndex: 5000 }}
              title={strings.status_pernikahan}
              items={statusPernikahanItems}
              setItems={setStatusPernikahanItems}
              existsValue={statusPernikahan}
              onChange={value => {
                console.log(value);
              }}
            />
            <Controller
              control={control}
              name="jumlahAnak"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextboxForm
                  onBlur={onBlur}
                  value={value}
                  onChangeText={value => onChange(value)}
                  title={strings.jumlah_anak}
                />
              )}
              rules={{ required: true }}
            />
            <DropdownForm
              id={strings.pekerjaan}
              openId={openId}
              setOpenId={setOpenId}
              style={{ zIndex: 4000 }}
              title={strings.pekerjaan}
              items={pekerjaanItems}
              setItems={setPekerjaanItems}
              existsValue={pekerjaan}
              onChange={value => {
                console.log(value);
              }}
            />
            <Controller
              control={control}
              name="detailPekerjaan"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextboxForm
                  onBlur={onBlur}
                  value={value}
                  onChangeText={value => onChange(value)}
                  title={strings.detail_pekerjaan}
                />
              )}
              rules={{ required: true }}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      <ButtonText
        onPress={handleSubmit(submitData)}
        buttonContainerStyle={{
          position: 'absolute',
          bottom: sizes.padding,
          width: '90%',
          marginHorizontal: sizes.padding,
        }}
        text={strings.simpan}
      />
    </SafeAreaView>
  );
};
export default DaftarBiodataAddScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  innerContainer: {
    borderRadius: sizes.padding,
    backgroundColor: colors.white,
    padding: sizes.padding,
    marginHorizontal: sizes.padding,
    marginBottom: 80,
  },
});
