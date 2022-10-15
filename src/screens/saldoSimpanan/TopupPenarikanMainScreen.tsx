/* eslint-disable @typescript-eslint/indent */
/* eslint-disable @typescript-eslint/no-unused-expressions */
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import BottomSheet from '@gorhom/bottom-sheet';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { isEmpty } from 'lodash';

import { Button, HeaderBack } from '../../components';
import { useAppDispatch, useAppSelector } from '../../config';
import { HomeStackParamList } from '../../config/navigation/model';
import { colors, icons, SCREEN_HEIGHT, sizes, strings } from '../../constants';
import {
  fetchCreateSaldoList,
  fetchCreateSimpananList,
} from '../../redux/reducers/SaldoSimpananReducer';
import { formatter } from '../../utils';

const topupDefaultNominal = [
  { item: '10', value: '10000' },
  { item: '25', value: '25000' },
  { item: '50', value: '50000' },
  { item: '100', value: '100000' },
  { item: '250', value: '250000' },
  { item: '500', value: '500000' },
];

const value = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '000', 'delete'];

type Props = NativeStackScreenProps<HomeStackParamList, 'TopupPenarikanMainScreen'>;

type JenisTopupPenarikan = { nama: string; id: number };

const TopupMainScreen: React.FC<Props> = ({ navigation, route }) => {
  const { isTopup } = route.params;
  const [nominal, setNominal] = useState<string>('');
  const [nominalContainer, setNominalContainer] = useState<string>('');
  const [selectedNominal, setSelectedNominal] = useState<number>(-1);
  const [selectedTopupPenarikan, setSelectedTopupPenarikan] = useState<JenisTopupPenarikan | null>(
    null,
  );

  //BottomSheet
  const sheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['90%', '95%'], []);
  const handleSheetChange = useCallback(() => null, []);

  const { createSaldoList, createSimpananList } = useAppSelector((s) => s.SaldoSimpananReducer);

  const dispatch = useAppDispatch();
  useEffect(() => {
    isTopup ? dispatch(fetchCreateSaldoList()) : dispatch(fetchCreateSimpananList());
  }, []);

  const navigateToDetailScreen = () => {
    if (!isEmpty(nominal) && !isEmpty(selectedTopupPenarikan)) {
      navigation.navigate('TopupPenarikanDetailScreen', {
        selectedTopupPenarikan,
        nominal,
        isTopup,
      });
    }
  };

  const selectDefaultNominal = (nominalValue: string, index: number) => {
    if (selectedNominal === index) {
      deleteNominal();
    } else {
      setSelectedNominal(index);
      setNominalContainer(nominalValue);
      setNominal(nominalValue);
    }
  };

  const selectJenisTopupPenarikan = (item: JenisTopupPenarikan) => {
    if (selectedTopupPenarikan?.id === item.id) {
      setSelectedTopupPenarikan(null);
    } else {
      setSelectedTopupPenarikan(item);
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
        setNominalContainer((e) => e.slice(0, -1));
      }
    } else if (item === '0' || item === '00') {
      if (!isEmpty(nominalContainer)) {
        setNominalContainer((e) => e.concat(item));
      }
    } else {
      setNominalContainer((e) => e.concat(item));
    }
  };

  const onPressOkInputNominal = () => {
    setNominal(nominalContainer);
    setSelectedNominal(-1);
    sheetRef.current?.close();
  };

  const renderDefaultNominal = () => {
    return (
      <View style={styles.nominalButtonContainer}>
        {topupDefaultNominal.map((item, index) => (
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
            onPress={() => selectDefaultNominal(item.value, index)}
          >
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
                ]}
              >
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
                ]}
              >
                rb
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
        <Text style={styles.textPilihJumlah}>{strings.pilih_jumlah}</Text>
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
              <Image source={icons.icon_rp_dark} style={styles.icon} resizeMode="cover" />
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
      </View>
    );
  };

  const renderInputManual = () => {
    return (
      <View
        style={{
          marginHorizontal: sizes.padding,
          height: '100%',
        }}
      >
        <View style={styles.inputNominalContainer}>
          <Text
            numberOfLines={1}
            ellipsizeMode="head"
            style={[
              styles.textInputNominal,
              !isEmpty(nominalContainer)
                ? { color: colors.primary }
                : { color: colors.bodyTextLightGrey },
            ]}
          >
            {!isEmpty(nominalContainer)
              ? `Rp${formatter.formatStringToCurrencyNumber(nominalContainer)}`
              : 'Rp0..'}
          </Text>
        </View>
        <View style={[styles.nominalButtonContainer, { marginTop: sizes.padding }]}>
          {value.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.inputNominalButton}
              onPress={() => onPressInputNominal(item)}
            >
              {item === 'delete' ? (
                <Image source={icons.icon_delete_nominal} style={{ width: 60, height: 30 }} />
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

  const renderJenisTopup = () => {
    return (
      <View
        style={{
          marginHorizontal: sizes.padding,
          marginTop: sizes.padding * 2,
        }}
      >
        <Text style={[styles.textPilihJumlah, { marginLeft: 10, marginBottom: 10 }]}>
          {isTopup ? strings.pilih_saldo : strings.pilih_saldo_penarikan}
        </Text>
        {isTopup
          ? createSaldoList?.simpananBelanja?.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={{
                  borderBottomColor: colors.strokeDarkGrey,
                  borderBottomWidth: 0.5,
                  paddingVertical: sizes.padding,
                  paddingLeft: 10,
                }}
                onPress={() => selectJenisTopupPenarikan(item)}
              >
                <View style={styles.textNominalContainer}>
                  <View style={styles.radioOuter}>
                    {item.id === selectedTopupPenarikan?.id && <View style={styles.radioInner} />}
                  </View>
                  <Text style={styles.textJenisTopup}>{item.nama}</Text>
                </View>
              </TouchableOpacity>
            ))
          : createSimpananList?.simpanan.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={{
                  borderBottomColor: colors.strokeDarkGrey,
                  borderBottomWidth: 0.5,
                  paddingVertical: sizes.padding,
                  paddingLeft: 10,
                }}
                onPress={() => selectJenisTopupPenarikan(item)}
              >
                <View style={styles.textNominalContainer}>
                  <View style={styles.radioOuter}>
                    {item.id === selectedTopupPenarikan?.id && <View style={styles.radioInner} />}
                  </View>
                  <Text style={styles.textJenisTopup}>{item.nama}</Text>
                </View>
              </TouchableOpacity>
            ))}
        {/* {isTopup
          ? jenisTopup.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={{
                  borderBottomColor: colors.strokeDarkGrey,
                  borderBottomWidth: 0.5,
                  paddingVertical: sizes.padding,
                  paddingLeft: 10,
                }}
                onPress={() => selectJenisTopupPenarikan(item)}>
                <View style={styles.textNominalContainer}>
                  <View style={styles.radioOuter}>
                    {item === selectedTopupPenarikan && (
                      <View style={styles.radioInner} />
                    )}
                  </View>
                  <Text style={styles.textJenisTopup}>{item}</Text>
                </View>
              </TouchableOpacity>
            ))
          : jenisPenarikan.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={{
                  borderBottomColor: colors.strokeDarkGrey,
                  borderBottomWidth: 0.5,
                  paddingVertical: sizes.padding,
                  paddingLeft: 10,
                }}
                onPress={() => selectJenisTopupPenarikan(item)}>
                <View style={styles.textNominalContainer}>
                  <View style={styles.radioOuter}>
                    {item === selectedTopupPenarikan && (
                      <View style={styles.radioInner} />
                    )}
                  </View>
                  <Text style={styles.textJenisTopup}>{item}</Text>
                </View>
              </TouchableOpacity>
            ))} */}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <HeaderBack title={isTopup ? strings.top_up : strings.penarikan_simpanan} />
      <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
        {renderSelectNominal()}
        {renderJenisTopup()}
      </ScrollView>
      <Button
        buttonContainerStyle={{
          position: 'absolute',
          bottom: 20,
          marginHorizontal: sizes.padding,
          width: '90%',
        }}
        text={strings.konfirmasi}
        icon={icons.arrow_right_button_white}
        iconLocation={'right'}
        onPress={navigateToDetailScreen}
        shadow={false}
      />
      <BottomSheet
        style={{ backgroundColor: colors.primaryWhite }}
        ref={sheetRef}
        index={-1}
        snapPoints={snapPoints}
        enablePanDownToClose
        onChange={handleSheetChange}
      >
        {renderInputManual()}
      </BottomSheet>
    </SafeAreaView>
  );
};
export default TopupMainScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  radioOuter: {
    borderRadius: sizes.padding,
    borderWidth: 1,
    borderColor: colors.primaryLight,
    width: sizes.padding,
    height: sizes.padding,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioInner: {
    backgroundColor: colors.primary,
    borderRadius: sizes.padding * 0.7,
    width: sizes.padding * 0.7,
    height: sizes.padding * 0.7,
  },
  textJenisTopup: {
    color: colors.bodyTextGrey,
    fontFamily: 'Poppins-Medium',
    marginLeft: sizes.padding,
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
