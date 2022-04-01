import React, { FC, useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Button, DokumenMemberItem, HeaderBack } from '../../components';
import DokumenDetailItem from '../../components/DokumenDetailItem';
import { colors, icons, sizes, strings } from '../../constants';
import moment from 'moment';
import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuTrigger,
} from 'react-native-popup-menu';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { DokumenStackParamList } from '../../config/navigation/model';
import { MemberDokumen } from '../../redux/reducers/DokumenReducer';

type Props = NativeStackScreenProps<
  DokumenStackParamList,
  'DokumenDetailScreen'
>;

const DokumenDetailScreen: FC<Props> = ({ route }) => {
  const { item } = route.params;
  const {
    tipeFile,
    namaFile,
    pemilik,
    tglDibuat,
    lokasiFile,
    ukuran,
    izin,
    memberAkses,
  } = item || {};
  const [izinValue, setIzinValue] = useState<string>(izin);
  const [showMember, setShowMember] = useState<boolean>(false);

  const onPressDeleteMember = (item: MemberDokumen) => {
    Alert.alert(`Delete Member ${item.namaMember}`);
  };

  const renderIzin = () => (
    <Menu>
      <MenuTrigger>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Text style={styles.textIzin}>{izinValue}</Text>
          <Image
            style={{
              width: sizes.padding * 1.2,
              height: sizes.padding * 1.2,
            }}
            source={icons.icon_dropdown}
          />
        </View>
      </MenuTrigger>
      <MenuOptions
        customStyles={{
          optionsContainer: {
            marginTop: 30,
          },
        }}
        optionsContainerStyle={styles.optionsContainer}>
        <MenuOption onSelect={() => setIzinValue('Umum')}>
          <View style={styles.popupContainer}>
            <Image
              source={icons.icon_dokumen_umum}
              style={styles.popupMenuIcon}
            />
            <Text style={styles.textPopupMenu}>{strings.umum}</Text>
            {izinValue === strings.umum && (
              <Image
                source={icons.icon_checkmark}
                style={styles.popupMenuIcon}
              />
            )}
          </View>
        </MenuOption>
        <MenuOption onSelect={() => setIzinValue('Tertutup')}>
          <View style={{ flexDirection: 'row' }}>
            <Image
              source={icons.icon_dokumen_tertutup}
              style={styles.popupMenuIcon}
            />
            <Text style={styles.textPopupMenu}>{strings.tertutup}</Text>
            {izinValue === strings.tertutup && (
              <Image
                source={icons.icon_checkmark}
                style={styles.popupMenuIcon}
              />
            )}
          </View>
        </MenuOption>
      </MenuOptions>
    </Menu>
  );

  return (
    <SafeAreaView style={styles.container}>
      <HeaderBack title={namaFile} />
      <ScrollView
        style={{ marginHorizontal: sizes.padding }}
        contentContainerStyle={{ paddingBottom: 60 }}>
        <DokumenDetailItem leftText={strings.tipe} rightText={tipeFile} />
        <DokumenDetailItem leftText={strings.ukuran} rightText={ukuran} />
        <DokumenDetailItem
          leftText={strings.lokasi_file}
          rightText={lokasiFile}
        />
        <DokumenDetailItem
          leftText={strings.pemilik}
          rightText={pemilik}
          rightTextStyle={{ color: colors.primary }}
        />
        <DokumenDetailItem
          leftText={strings.dibuat}
          rightText={moment(tglDibuat).format('DD/MM/YYYY')}
        />
        <DokumenDetailItem leftText={strings.izin} rightCustom={renderIzin()} />
        {/* AKSES VIEW CONTAINER */}
        <View style={{ width: '100%', marginTop: sizes.padding }}>
          <Text style={styles.textYgMemilikiAkses}>
            {strings.yg_memiliki_akses}
          </Text>
          {/* AKSES HEADER */}
          <View style={styles.memberHeader}>
            <View style={{ flexDirection: 'row' }}>
              {memberAkses.map((item, i) => (
                <Image
                  source={{ uri: item.profilePic }}
                  key={i}
                  style={{
                    width: 30,
                    height: 30,
                    borderRadius: 30,
                    marginLeft: -6,
                  }}
                />
              ))}
            </View>
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                width: '68%',
                justifyContent: 'space-between',
              }}
              onPress={() => setShowMember(e => !e)}>
              <Text
                style={
                  styles.textAnggota
                }>{`${memberAkses.length} Anggota`}</Text>
              <Image
                style={styles.popupMenuIcon}
                source={
                  showMember ? icons.icon_dropdown_up : icons.icon_dropdown
                }
              />
            </TouchableOpacity>
          </View>
          {/* LIST MEMBER */}
          {showMember &&
            memberAkses.map((item, i) => (
              <DokumenMemberItem
                item={item}
                key={i}
                onPressDelete={() => onPressDeleteMember(item)}
              />
            ))}
        </View>
      </ScrollView>
      <View
        style={{
          flexDirection: 'row',
          position: 'absolute',
          bottom: sizes.padding,
          paddingHorizontal: sizes.padding,
          justifyContent: 'space-between',
          width: '100%',
        }}>
        <Button
          onPress={() => Alert.alert('Buka File')}
          text={strings.buka_file}
          secondary
          buttonContainerStyle={{ width: '47%' }}
        />
        <Button
          onPress={() => Alert.alert('Unduh File')}
          text={strings.unduh_file}
          icon={icons.icon_download_file}
          iconLocation="left"
          buttonContainerStyle={{ width: '47%' }}
        />
      </View>
    </SafeAreaView>
  );
};
export default DokumenDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textYgMemilikiAkses: {
    fontFamily: 'Poppins-Medium',
    fontSize: 13,
    color: colors.bodyText,
  },
  textIzin: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: colors.bodyText,
  },
  optionsContainer: {
    padding: sizes.padding / 2,
    borderRadius: sizes.padding / 1.5,
    width: '45%',
  },
  popupMenuIcon: {
    width: sizes.icon_size,
    height: sizes.icon_size,
  },
  textPopupMenu: {
    marginLeft: 10,
    width: '65%',
    color: colors.bodyText,
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
  },
  popupContainer: {
    flexDirection: 'row',
    borderBottomWidth: 0.5,
    borderBottomColor: colors.strokeGrey,
    paddingBottom: 10,
  },
  memberHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: sizes.padding,
    borderBottomWidth: 1,
    borderBottomColor: colors.strokeGrey,
  },
  textAnggota: {
    color: colors.bodyText,
    fontFamily: 'Poppins-Medium',
    marginLeft: sizes.padding * 1.5,
  },
});
