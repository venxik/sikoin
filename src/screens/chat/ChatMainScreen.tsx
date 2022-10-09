import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { FC, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { HeaderBack, NotifikasiItem } from '../../components';
import { ChatStackParamList } from '../../config/navigation/model';
import { colors, sizes } from '../../constants';
import { Message, Search } from 'react-native-iconly';
import { useAppDispatch, useAppSelector } from '../../config';
import {
  fetchNotifikasi,
  fetchNotifikasiDetail,
  NotifikasiData,
} from '../../redux/reducers/NotifikasiReducer';
import { isEmpty } from 'lodash';

type Props = NativeStackScreenProps<ChatStackParamList, 'ChatMainScreen'>;

const ChatMainScreen: FC<Props> = () => {
  const dispatch = useAppDispatch();
  const { notifikasi } = useAppSelector(
    s => s.NotifikasiReducer.notifikasiDataList,
  );

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
        }}>
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
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => (
            <NotifikasiItem
              item={item}
              onPress={() => onPressNotifikasi(item)}
            />
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
