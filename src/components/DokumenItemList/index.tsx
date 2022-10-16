import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { Menu, MenuOption, MenuOptions, MenuTrigger } from 'react-native-popup-menu';

import { colors, icons, sizes, strings } from '../../constants';
import { DokumenItemListProps } from './model';

const DokumenItemList = (props: DokumenItemListProps) => {
  const { item, onPress, onPressUnduh } = props || {};
  const { namaFile, deskripsi, waktu } = item || {};

  const renderPopupMenu = () => {
    return (
      <Menu>
        <MenuTrigger>
          <Image
            style={{
              width: sizes.padding * 1.5,
              height: sizes.padding * 1.5,
            }}
            source={icons.icon_three_dot}
          />
        </MenuTrigger>
        <MenuOptions optionsContainerStyle={styles.optionsContainer}>
          <MenuOption onSelect={() => onPressUnduh()}>
            <View style={styles.popupContainer}>
              <Image source={icons.icon_dokumen_download} style={styles.popupMenuIcon} />
              <Text style={styles.textPopupMenu}>{strings.unduh_file}</Text>
            </View>
          </MenuOption>
          {/* <MenuOption onSelect={() => Alert.alert('Buka File')}>
            <View style={styles.popupContainer}>
              <Image
                source={icons.icon_dokumen_open}
                style={styles.popupMenuIcon}
              />
              <Text style={styles.textPopupMenu}>{strings.buka_file}</Text>
            </View>
          </MenuOption>
          <MenuOption onSelect={onPressDeleteFile}>
            <View style={{ flexDirection: 'row' }}>
              <Image
                source={icons.icon_dokumen_delete}
                style={styles.popupMenuIcon}
              />
              <Text style={[styles.textPopupMenu, { color: colors.red }]}>
                {strings.hapus_file}
              </Text>
            </View>
          </MenuOption> */}
        </MenuOptions>
      </Menu>
    );
  };

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Image style={styles.icon} source={icons.icon_document_other} />
      <View style={{ flex: 1, marginLeft: sizes.padding }}>
        <Text style={styles.textTitle} numberOfLines={1}>
          {namaFile}
        </Text>
        <View style={styles.subContainer}>
          <Text style={styles.textSubtext} numberOfLines={1}>
            {deskripsi}
          </Text>
          <View style={styles.dot} />
          <Text style={styles.textSubtext} numberOfLines={1}>
            {waktu}
          </Text>
        </View>
      </View>
      {renderPopupMenu()}
    </TouchableOpacity>
  );
};

export default DokumenItemList;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    padding: sizes.padding,
    borderBottomColor: colors.strokeGrey,
    borderBottomWidth: 1,
  },
  subContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: { width: sizes.icon_size * 2, height: sizes.icon_size * 2 },
  textTitle: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: colors.bodyText,
  },
  textSubtext: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: colors.bodyText,
    maxWidth: '50%',
  },
  dot: {
    width: 4,
    height: 4,
    borderRadius: 4,
    backgroundColor: colors.strokeDarkGrey,
    marginHorizontal: 4,
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
    width: '70%',
    color: colors.bodyText,
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
  },
  popupContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
