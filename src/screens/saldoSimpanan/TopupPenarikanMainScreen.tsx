import { isEmpty } from 'lodash';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { Button, HeaderBack } from '../../components';
import { colors, icons, SCREEN_HEIGHT, sizes, strings } from '../../constants';
import { formatter } from '../../utils';
import BottomSheet from '@gorhom/bottom-sheet';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { TopupPenarikanStackParamList } from '../../config/navigation/model';

const defaultNominal = [
  { item: '10', value: '10000' },
  { item: '25', value: '25000' },
  { item: '50', value: '50000' },
  { item: '100', value: '100000' },
  { item: '250', value: '250000' },
  { item: '500', value: '500000' },
];

const jenisTopup = [strings.simpanan_sukarela, strings.voucher_belanja];
const jenisPenarikan = [strings.simpanan_sukarela];

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

type Props = NativeStackScreenProps<
  TopupPenarikanStackParamList,
  'TopupPenarikanMainScreen'
>;

const TopupMainScreen: React.FC<Props> = ({ navigation, route }) => {
  const { isTopup } = route.params;
  const [nominal, setNominal] = useState<string>('');
  const [nominalContainer, setNominalContainer] = useState<string>('');
  const [selectedNominal, setSelectedNominal] = useState<number>(-1);
  const [selectedTopupPenarikan, setSelectedTopupPenarikan] =
    useState<string>('');

  //BottomSheet
  const sheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['90%', '95%'], []);
  const handleSheetChange = useCallback(() => null, []);

  const navigateToDetailScreen = () => {
    if (!isEmpty(nominal) && !isEmpty(selectedTopupPenarikan)) {
      navigation.navigate('TopupPenarikanDetailScreen', {
        selectedTopupPenarikan,
        nominal,
        isTopup,
      });
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

  const selectJenisTopupPenarikan = (item: string) => {
    if (selectedTopupPenarikan === item) {
      setSelectedTopupPenarikan('');
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

  const renderJenisTopup = () => {
    return (
      <View
        style={{
          marginHorizontal: sizes.padding,
          marginTop: sizes.padding * 2,
        }}>
        <Text
          style={[
            styles.textPilihJumlah,
            { marginLeft: 10, marginBottom: 10 },
          ]}>
          {strings.pilih_saldo}
        </Text>
        {isTopup
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
            ))}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <HeaderBack
        title={isTopup ? strings.top_up : strings.penarikan_simpanan}
      />
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
        onChange={handleSheetChange}>
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
