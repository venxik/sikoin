import React, { FC, useEffect, useState } from 'react';
import { FlatList, RefreshControl, StyleSheet, TouchableOpacity, View } from 'react-native';

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { isEmpty } from 'lodash';
import { Message, Search } from 'react-native-iconly';

import { HeaderBack, NotifikasiItem } from '../../components';
import { useAppDispatch, useAppSelector } from '../../config';
import { ChatStackParamList } from '../../config/navigation/model';
import { colors, sizes } from '../../constants';
import {
  fetchNotifikasi,
  fetchNotifikasiDetail,
  NotifikasiData,
} from '../../redux/reducers/NotifikasiReducer';

type Props = NativeStackScreenProps<ChatStackParamList, 'ChatMainScreen'>;

const ChatMainScreen: FC<Props> = () => {
  const dispatch = useAppDispatch();
  const { notifikasi } = useAppSelector((s) => s.NotifikasiReducer.notifikasiDataList);
  const [refreshing] = useState(false);

  useEffect(() => {
    dispatch(fetchNotifikasi());
  }, []);

  const onPressNotifikasi = (item: NotifikasiData) => {
    dispatch(fetchNotifikasiDetail(item.id));
  };
  const renderRightButtonHeader = () => {
    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <TouchableOpacity onPress={() => null}>
          <Search color={colors.primary} />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <HeaderBack
        disabled
        customLeftIcon={<Message filled color={colors.bodyText} />}
        title={'Notifikasi'}
        rightIcon={renderRightButtonHeader()}
      />
      {!isEmpty(notifikasi) && (
        <FlatList
          data={notifikasi}
          keyExtractor={(item) => item.id.toString()}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={() => dispatch(fetchNotifikasi())} />
          }
          renderItem={({ item }) => (
            <NotifikasiItem item={item} onPress={() => onPressNotifikasi(item)} />
          )}
        />
      )}
    </View>
  );
};

export default ChatMainScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  chatContainer: {
    flexDirection: 'row',
    padding: sizes.padding,
    alignItems: 'center',
  },
  iconContainer: { width: 50, height: 50, borderRadius: 50 },
  textContainer: { marginLeft: sizes.padding / 2, width: '100%' },
  textInnerContainer: {
    flexDirection: 'row',
    width: '80%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textName: {
    color: colors.bodyText,
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
  },
  textContent: {
    color: colors.bodyText,
    width: '70%',
    fontFamily: 'Inter-Regular',
  },
  textTime: { color: colors.primaryLight, fontFamily: 'Poppins-Medium' },
});
