import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {
  Button,
  HeaderBack,
  PinjamanDetailItem,
  Popup1Button,
} from '../../components';
import PinjamanSimulasiSection from '../../components/PinjamanSimulasiSection';
import { useAppDispatch, useAppSelector } from '../../config';
import { HomeStackParamList } from '../../config/navigation/model';
import { colors, icons, images, sizes, strings } from '../../constants';
import { fetchPostCreatePinjaman } from '../../redux/reducers/PinjamanReducer';
import { formatter } from '../../utils';

type Props = NativeStackScreenProps<
  HomeStackParamList,
  'PinjamanSummaryScreen'
>;

const PinjamanSummaryScreen: React.FC<Props> = ({ navigation }) => {
  const [showPopup, setShowPopup] = useState(false);

  //redux dispatch and selector
  const dispatch = useAppDispatch();
  const { pinjamanInfo } = useAppSelector(s => s.PinjamanReducer);
  const {
    bungaJenisPinjaman,
    namaBank,
    namaJenisPinjaman,
    namaKantorCabang,
    nama,
    namaPemilik,
    noKtp,
    noRek,
    nominal,
    tenor,
    tujuan,
    totalAngsuran,
    totalAngsuranBunga,
    totalAngsuranPokok,
  } = useAppSelector(s => s.PinjamanReducer.pinjamanSummaryData);

  const onPressAjukan = () => {
    dispatch(fetchPostCreatePinjaman({ ...pinjamanInfo }));
  };

  const navigateToSimulasi = () => {
    navigation.navigate('PinjamanSimulasiScreen');
  };

  const renderRightButtonHeader = () => {
    return (
      <TouchableOpacity onPress={() => setShowPopup(e => !e)}>
        <Image
          source={icons.icon_shield}
          style={styles.headerIcon}
          resizeMode="stretch"
        />
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Popup1Button
        iconStyle={{ width: 150, height: 200, marginBottom: -sizes.padding }}
        headerText={strings.popup_topup_title}
        contentText={strings.popup_topup_content}
        showPopup={showPopup}
        onPress={() => setShowPopup(e => !e)}
        headerImage={images.img_topup_popup}
        customButtonText={strings.ok_thumbs}
      />
      <HeaderBack
        title={strings.kembali}
        rightIcon={renderRightButtonHeader()}
      />
      <ScrollView>
        <View style={styles.innerContainer}>
          <Text style={styles.textTitle}>{strings.nominal_pengajuan}</Text>
          <View style={styles.textNominalContainer}>
            <Image
              source={icons.icon_rp_dark}
              style={styles.icon}
              resizeMode="cover"
            />
            <Text style={styles.textNominal} numberOfLines={1}>
              {formatter.formatNumberToCurreny(nominal)}
            </Text>
          </View>
          <PinjamanDetailItem title="Nama Lengkap" content={nama} />
          <PinjamanDetailItem title="No KTP" content={noKtp} />
          <PinjamanDetailItem title="Nama Pemilik" content={namaPemilik} />
          <PinjamanDetailItem
            title="Nama Jenis Pinjaman"
            content={namaJenisPinjaman}
          />
          <PinjamanDetailItem title="Nama Bank" content={namaBank} />
          <PinjamanDetailItem
            title="Nama Kantor Cabang"
            content={namaKantorCabang}
          />
          <PinjamanDetailItem title="Nomor Rekening" content={noRek} />
          <PinjamanDetailItem
            title="Bunga Jenis Pinjaman"
            content={bungaJenisPinjaman}
          />
          <PinjamanDetailItem
            title="Lama Pinjaman"
            content={tenor?.toString()}
          />
          <PinjamanDetailItem title="Tujuan" content={tujuan} />
          <PinjamanSimulasiSection
            simulasi
            onPress={navigateToSimulasi}
            item={{
              totalAngsuran: totalAngsuran as number,
              totalAngsuranBunga: totalAngsuranBunga as number,
              totalAngsuranPokok: totalAngsuranPokok as number,
            }}
          />
        </View>
      </ScrollView>
      <View style={styles.buttonContainer}>
        <Button
          onPress={() => navigation.goBack()}
          shadow
          secondary
          text={strings.kembali}
          buttonContainerStyle={{ width: '48%' }}
        />
        <Button
          onPress={onPressAjukan}
          shadow
          text={strings.ajukan}
          buttonContainerStyle={{ width: '48%' }}
        />
      </View>
    </View>
  );
};
export default PinjamanSummaryScreen;

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
  textTitle: {
    color: colors.bodyText,
    fontFamily: 'Poppins-Medium',
  },
  textNominalContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: sizes.padding * 1.5,
  },
  textNominal: {
    width: '70%',
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: colors.bodyText,
  },
  icon: { width: 40, height: 40 },
  headerIcon: {
    width: sizes.icon_size,
    height: sizes.icon_size,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    bottom: sizes.padding,
    paddingHorizontal: sizes.padding,
    width: '100%',
    zIndex: 1,
  },
});
