import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
  Text,
} from 'react-native';
import { Button, HeaderPinjaman, TextInputForm } from '../../components';
import { HomeStackParamList } from '../../config/navigation/model';
import BottomSheet from '@gorhom/bottom-sheet';
import { colors, icons, SCREEN_HEIGHT, sizes, strings } from '../../constants';
import { isEmpty } from 'lodash';
import { formatter } from '../../utils';
import { useAppDispatch, useAppSelector } from '../../config';
import {
  fetchPinjamanSummary,
  setPinjamanInfo,
} from '../../redux/reducers/PinjamanReducer';
import { Controller, useForm } from 'react-hook-form';

type Props = NativeStackScreenProps<HomeStackParamList, 'PinjamanStep3Screen'>;

type Form = { tenor: number; tujuan: string };

const defaultNominal = [
  { item: '250', value: '250000' },
  { item: '500', value: '500000' },
  { item: '1', value: '1000000' },
  { item: '2', value: '2000000' },
  { item: '5', value: '5000000' },
  { item: '10', value: '10000000' },
];

const value = [
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '0',
  '000',
  'delete',
];

const PinjamanStep5: React.FC<Props> = ({ navigation }) => {
  const [showButton, setShowButton] = useState(true);
  const [nominal, setNominal] = useState<string>('');
  const [nominalContainer, setNominalContainer] = useState<string>('');
  const [selectedNominal, setSelectedNominal] = useState<number>(-1);

  //redux dispatch and selector
  const dispatch = useAppDispatch();
  const { idJenisPinjaman } = useAppSelector(
    s => s.PinjamanReducer.pinjamanInfo,
  );

  //BottomSheet
  const sheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['90%', '95%'], []);
  const handleSheetChange = useCallback(() => {
    setShowButton(e => !e);
  }, []);

  const navigateToReview = (data: Form) => {
    const { tenor, tujuan } = data;
    if (!isEmpty(nominal)) {
      dispatch(
        setPinjamanInfo({
          idJenisPinjaman,
          nominal: parseInt(nominal),
          tenor,
          tujuan,
        }),
      );
      dispatch(
        fetchPinjamanSummary({
          idJenisPinjaman,
          nominal: parseInt(nominal),
          tenor,
          tujuan,
        }),
      );
    }
  };

  const selectDefaultNominal = (value: string, index: number) => {
    if (selectedNominal === index) {
      deleteNominal();
    } else {
      setSelectedNominal(index);
      setNominalContainer(value);
      setNominal(value);
    }
  };

  const deleteNominal = () => {
    setNominal('');
    setSelectedNominal(-1);
  };

  const showInputNominal = () => {
    if (isEmpty(nominal)) {
      setNominalContainer('');
    } else {
      setNominalContainer(nominal);
    }
    sheetRef.current?.expand();
  };

  const onPressInputNominal = (item: string) => {
    if (item === 'delete') {
      if (!isEmpty(nominalContainer)) {
        setNominalContainer(e => e.slice(0, -1));
      }
    } else if (item === '0' || item === '00') {
      if (!isEmpty(nominalContainer)) {
        setNominalContainer(e => e.concat(item));
      }
    } else {
      setNominalContainer(e => e.concat(item));
    }
  };

  const onPressOkInputNominal = () => {
    setNominal(nominalContainer);
    setSelectedNominal(-1);
    sheetRef.current?.close();
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Form>({
    defaultValues: {
      tenor: 0,
      tujuan: '',
    },
  });

  const renderDefaultNominal = () => {
    return (
      <View style={styles.nominalButtonContainer}>
        {defaultNominal.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={[
              index === selectedNominal
                ? {
                    backgroundColor: colors.primary,
                  }
                : {
                    backgroundColor: colors.tonalLightPrimary,
                    borderWidth: 1,
                    borderColor: colors.tonalPrimary,
                  },
              styles.nominalButton,
            ]}
            onPress={() => selectDefaultNominal(item.value, index)}>
            <View style={styles.textNominalContainer}>
              <Text
                style={[
                  index === selectedNominal
                    ? {
                        color: colors.white,
                      }
                    : {
                        color: colors.primaryDark,
                      },
                  styles.textNominalButton,
                ]}>
                {item.item}
              </Text>
              <Text
                style={[
                  index === selectedNominal
                    ? {
                        color: colors.white,
                      }
                    : {
                        color: colors.primaryDark,
                      },
                  styles.textRbButton,
                ]}>
                {index < 2 ? 'rb' : 'jt'}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  const renderSelectNominal = () => {
    return (
      <View style={styles.topupMainContainer}>
        <Text style={styles.textPilihJumlah}>{strings.masukkan_nominal}</Text>
        {renderDefaultNominal()}
        <Button
          onPress={showInputNominal}
          icon={icons.icon_ketik_manual}
          iconLocation="left"
          text={strings.ketik_manual}
          textStyle={{ color: colors.bodyText }}
          buttonContainerStyle={styles.ketikManualButton}
          shadow={false}
        />
        {!isEmpty(nominal) && (
          <View style={styles.showNominalContainer}>
            <View style={styles.textNominalContainer}>
              <Image
                source={icons.icon_rp_dark}
                style={styles.icon}
                resizeMode="cover"
              />
              <Text style={styles.textNominal} numberOfLines={1}>
                {formatter.formatStringToCurrencyNumber(nominal)}
              </Text>
            </View>
            <TouchableOpacity onPress={deleteNominal}>
              <Image
                source={icons.icon_dismiss}
                style={{ width: 30, height: 30 }}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
        )}
        <Controller
          control={control}
          name="tenor"
          render={({ field: { onChange, value } }) => (
            <TextInputForm
              error={errors.tenor}
              errorText={errors.tenor?.message}
              style={{ marginTop: sizes.padding * 2 }}
              value={value.toString()}
              onChangeText={onChange}
              title={'Jangka Waktu Pinjaman'}
              keyboardType={'numeric'}
            />
          )}
        />
        <Controller
          control={control}
          name="tujuan"
          render={({ field: { onChange, value } }) => (
            <TextInputForm
              error={errors.tujuan}
              errorText={errors.tujuan?.message}
              style={{ marginTop: sizes.padding }}
              value={value}
              onChangeText={onChange}
              title={'Tujuan Pinjaman'}
            />
          )}
        />
      </View>
    );
  };

  const renderInputManual = () => {
    return (
      <View
        style={{
          marginHorizontal: sizes.padding,
          height: '100%',
        }}>
        <View style={styles.inputNominalContainer}>
          <Text
            numberOfLines={1}
            ellipsizeMode="head"
            style={[
              styles.textInputNominal,
              !isEmpty(nominalContainer)
                ? { color: colors.primary }
                : { color: colors.bodyTextLightGrey },
            ]}>
            {!isEmpty(nominalContainer)
              ? `Rp${formatter.formatStringToCurrencyNumber(nominalContainer)}`
              : 'Rp0..'}
          </Text>
        </View>
        <View
          style={[styles.nominalButtonContainer, { marginTop: sizes.padding }]}>
          {value.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.inputNominalButton}
              onPress={() => onPressInputNominal(item)}>
              {item === 'delete' ? (
                <Image
                  source={icons.icon_delete_nominal}
                  style={{ width: 60, height: 30 }}
                />
              ) : (
                <Text style={styles.textInputNominalBtn}>{item}</Text>
              )}
            </TouchableOpacity>
          ))}
        </View>
        <Button
          buttonContainerStyle={{
            position: 'absolute',
            bottom: sizes.padding,
            width: '100%',
          }}
          text={strings.ok}
          onPress={onPressOkInputNominal}
          shadow={false}
        />
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <HeaderPinjaman index={5} />
      <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
        {renderSelectNominal()}
      </ScrollView>
      <BottomSheet
        style={{ backgroundColor: colors.primaryWhite }}
        ref={sheetRef}
        index={-1}
        snapPoints={snapPoints}
        enablePanDownToClose
        onAnimate={handleSheetChange}>
        {renderInputManual()}
      </BottomSheet>
      {showButton && (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            position: 'absolute',
            bottom: sizes.padding,
            paddingHorizontal: sizes.padding,
            width: '100%',
            zIndex: 1,
          }}>
          <Button
            onPress={() => navigation.goBack()}
            shadow
            secondary
            text={strings.kembali}
            buttonContainerStyle={{ width: '48%' }}
          />
          <Button
            onPress={handleSubmit(navigateToReview)}
            shadow
            text={strings.lanjutkan}
            buttonContainerStyle={{ width: '48%' }}
          />
        </View>
      )}
    </SafeAreaView>
  );
};
export default PinjamanStep5;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    borderRadius: sizes.padding,
    backgroundColor: colors.white,
    paddingTop: sizes.padding * 1.3,
    padding: sizes.padding,
    marginHorizontal: sizes.padding,
    marginBottom: 80,
  },
  topupMainContainer: {
    backgroundColor: colors.white,
    borderRadius: sizes.padding,
    padding: sizes.padding,
    elevation: 5,
    paddingHorizontal: sizes.padding,
    marginHorizontal: sizes.padding,
  },
  textPilihJumlah: {
    color: colors.bodyTextGrey,
    fontSize: 17,
    fontFamily: 'Poppins-Bold',
    marginBottom: sizes.padding,
    width: '70%',
  },
  ketikManualButton: {
    backgroundColor: colors.primaryWhite,
  },
  nominalButtonContainer: {
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 10,
  },
  nominalButton: {
    width: '30%',
    marginBottom: sizes.padding,
    padding: sizes.padding * 0.5,
    paddingTop: 50,
    borderRadius: sizes.padding,
  },
  textNominalContainer: { flexDirection: 'row', alignItems: 'center' },
  textNominalButton: { fontSize: 24, fontFamily: 'Inter-Bold' },
  textRbButton: { marginLeft: 4, fontFamily: 'Inter-Bold' },
  textNominal: {
    width: '70%',
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: colors.bodyText,
  },
  icon: { width: 40, height: 40 },
  showNominalContainer: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: sizes.padding,
  },
  textInputNominal: { fontSize: 34, fontFamily: 'Inter-Bold' },
  inputNominalContainer: {
    borderWidth: 1,
    borderColor: colors.strokeGrey,
    borderRadius: sizes.padding,
    paddingVertical: sizes.padding,
    paddingHorizontal: sizes.padding,
  },
  inputNominalButton: {
    borderRadius: sizes.padding,
    paddingHorizontal: sizes.padding,
    height: SCREEN_HEIGHT * 0.13,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.primaryWhite,
    width: '30%',
    marginBottom: SCREEN_HEIGHT * 0.02,
  },
  textInputNominalBtn: {
    color: colors.bodyText,
    fontSize: 34,
    fontFamily: 'Poppins-Regular',
  },
});
