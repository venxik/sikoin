import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { FC, useEffect, useMemo, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  TouchableOpacity,
  ImageSourcePropType,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { HeaderBack, SaldoItemList } from '../../components';
import { HomeStackParamList } from '../../config/navigation/model';
import { useAppDispatch, useAppSelector } from '../../config';
import {
  colors,
  icons,
  images,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
  sizes,
  strings,
} from '../../constants';
import { formatter } from '../../utils';
import {
  fetchSaldoData,
  fetchSimpananData,
} from '../../redux/reducers/SaldoSimpananReducer';
import { ArrowLeft } from 'react-native-iconly';

type Props = NativeStackScreenProps<
  HomeStackParamList,
  'SaldoSimpananMainScreen'
>;

const Button = (props: {
  icon: ImageSourcePropType;
  text: string;
  onPress: () => void;
}) => {
  const { icon, text, onPress } = props || {};
  return (
    <TouchableOpacity
      style={{ alignItems: 'center', width: '33%' }}
      onPress={onPress}>
      <Image source={icon} style={{ width: 50, height: 50 }} />
      <Text
        style={{
          fontFamily: 'Poppins-Medium',
          color: colors.bodyText,
          textAlign: 'center',
        }}>
        {text}
      </Text>
    </TouchableOpacity>
  );
};

const SaldoSimpananMainScreen: FC<Props> = ({ route, navigation }) => {
  const { showSaldo } = route.params || {};
  const { simpanan, saldo } =
    useAppSelector(state => state.SaldoSimpananReducer) || {};

  const sheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['40%', '70%'], []);

  const dispatch = useAppDispatch();
  useEffect(() => {
    showSaldo ? dispatch(fetchSaldoData()) : dispatch(fetchSimpananData());
  }, []);

  const renderSaldoContent = () => {
    return (
      <View>
        <View style={styles.saldoContainer}>
          <Button
            icon={icons.icon_topup_penarikan}
            text={strings.top_up}
            onPress={() =>
              navigation.navigate('TopupPenarikanMainScreen', { isTopup: true })
            }
          />
          <Button
            icon={icons.icon_mutasi_primary}
            text={strings.mutasi}
            onPress={() => navigation.navigate('TransaksiMainScreen')}
          />
          <Button
            icon={icons.icon_transaksi_primary}
            text={strings.transaksi}
            onPress={() => null}
          />
        </View>
        <View style={{ marginTop: 40 }}>
          {saldo.simpananBelanja?.map((item, i) => (
            <SaldoItemList
              key={i}
              text={item.nama}
              nominal={item.saldo}
              onPress={() => null}
            />
          ))}
        </View>
      </View>
    );
  };

  const renderSimpananContent = () => {
    return (
      <View>
        <View style={styles.simpananContainer}>
          <Button
            icon={icons.icon_penarikan_primary}
            text={strings.penarikan}
            onPress={() =>
              navigation.navigate('TopupPenarikanMainScreen', {
                isTopup: false,
              })
            }
          />
          <Button
            icon={icons.icon_mutasi_primary}
            text={strings.mutasi}
            onPress={() => navigation.navigate('TransaksiMainScreen')}
          />
          {/* <Button
            icon={icons.icon_mutasi_primary}
            text={strings.transfer_antar_simpanan}
            onPress={() =>
              navigation.navigate('TransaksiStackNavigator', {
                screen: 'TransaksiMainScreen',
              })
            }
          /> */}
        </View>
        <View style={{ marginTop: 40 }}>
          {simpanan.simpananTerlihat?.map((item, i) => (
            <SaldoItemList
              key={i}
              text={item.nama}
              nominal={item.saldo}
              onPress={() => null}
            />
          ))}
        </View>
      </View>
    );
  };

  const renderBackgroundItem = () => (
    <ImageBackground
      source={images.daftar_koperasi_bg}
      style={styles.background}>
      <View style={styles.titleContainer}>
        <Image
          source={showSaldo ? images.img_saldo_icon : images.img_simpanan_icon}
          style={styles.logo}
        />
        <Text style={styles.textTitle}>
          {showSaldo ? strings.totalSaldo : strings.totalSimpanan} :
        </Text>
        <View style={styles.saldoRowContainer}>
          <Image source={icons.icon_rp} style={{ width: 34, height: 34 }} />
          <Text style={styles.textSaldo}>
            {showSaldo
              ? formatter.formatNumberToCurreny(saldo.totalSaldoBelanja)
              : formatter.formatNumberToCurreny(simpanan.totalSaldoTerlihat)}
          </Text>
        </View>
      </View>
    </ImageBackground>
  );

  return (
    <SafeAreaView style={styles.container}>
      <HeaderBack
        style={{ position: 'absolute', top: 0, zIndex: 2 }}
        onPress={() => navigation.goBack()}
        title={showSaldo ? strings.saldo : strings.simpanan}
        customLeftIcon={<ArrowLeft color={colors.white} />}
        textStyle={{ color: colors.white }}
      />
      {renderBackgroundItem()}
      <BottomSheet
        backgroundStyle={{ backgroundColor: colors.primaryWhite }}
        ref={sheetRef}
        index={0}
        snapPoints={snapPoints}>
        <BottomSheetScrollView>
          <View style={styles.bottomSheetContainer}>
            {showSaldo ? renderSaldoContent() : renderSimpananContent()}
          </View>
        </BottomSheetScrollView>
      </BottomSheet>
    </SafeAreaView>
  );
};
export default SaldoSimpananMainScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  icon: {
    width: sizes.icon_size,
    height: sizes.icon_size,
  },
  saldoContainer: {
    borderRadius: sizes.padding,
    backgroundColor: colors.white,
    paddingVertical: sizes.padding,
    width: '100%',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  simpananContainer: {
    borderRadius: sizes.padding,
    backgroundColor: colors.white,
    paddingVertical: sizes.padding,
    paddingHorizontal: 40,
    width: '100%',
    justifyContent: 'space-evenly',
    flexDirection: 'row',
  },
  background: {
    width: '100%',
    height: SCREEN_HEIGHT * 0.8,
  },
  titleContainer: {
    marginTop: -40,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  logo: {
    width: SCREEN_WIDTH * 0.4,
    height: SCREEN_WIDTH * 0.4,
  },
  textTitle: {
    color: colors.primaryLight,
    marginTop: sizes.padding,
    fontFamily: 'Poppins-Medium',
  },
  saldoRowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textSaldo: {
    fontSize: 34,
    color: colors.white,
    marginLeft: 16,
    fontFamily: 'Inter-Bold',
  },
  customPopupContainer: {
    alignItems: 'flex-start',
    width: '100%',
    paddingLeft: sizes.padding,
    marginBottom: sizes.padding,
  },
  blueDot: {
    width: 4,
    height: 4,
    borderRadius: 4,
    backgroundColor: colors.primary,
    marginRight: 10,
  },
  customPopupRow: { flexDirection: 'row', alignItems: 'center' },
  customPopupText: { color: colors.primary, fontWeight: '500' },
  bottomSheetContainer: {
    padding: sizes.padding,
    width: '100%',
    height: '100%',
    backgroundColor: colors.primaryWhite,
  },
});
