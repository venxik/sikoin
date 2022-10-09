import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { FC, useEffect } from 'react';
import { SafeAreaView, View, StyleSheet, FlatList } from 'react-native';
import { CardKabar, HeaderBack, MenuHeaderIcon } from '../../components';
import { HomeStackParamList } from '../../config/navigation/model';
import { useAppDispatch, useAppSelector } from '../../config';
import { colors, sizes, strings } from '../../constants';
import {
  fetchKabar,
  fetchKabarDetail,
} from '../../redux/reducers/KabarReducer';
import { KabarPromoData } from '../../redux/reducers/HomeReducer';

type Props = NativeStackScreenProps<HomeStackParamList, 'KabarMainScreen'>;

const KabarMainScreen: FC<Props> = () => {
  const { kabarDataList } = useAppSelector(state => state.KabarReducer) || {};

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchKabar());
  }, []);

  const selectKabarCard = (item: KabarPromoData) => {
    dispatch(fetchKabarDetail(item.id));
  };

  return (
    <SafeAreaView style={styles.container}>
      <HeaderBack />
      {kabarDataList && (
        <FlatList
          ListHeaderComponent={<MenuHeaderIcon menu={strings.kabar} />}
          data={kabarDataList}
          showsHorizontalScrollIndicator={false}
          scrollEventThrottle={16}
          contentContainerStyle={{
            alignItems: 'center',
          }}
          keyExtractor={item => item?.id.toString()}
          renderItem={({ item }) => (
            <View style={{ marginTop: 20, flexDirection: 'row' }}>
              <CardKabar
                item={item}
                onPress={() => selectKabarCard(item)}
                style={{ marginRight: 0 }}
              />
            </View>
          )}
        />
      )}
    </SafeAreaView>
  );
};
export default KabarMainScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  topMenuContainer: {
    backgroundColor: colors.white,
    padding: sizes.padding,
    borderRadius: sizes.padding,
    marginTop: sizes.padding,
    marginBottom: 40,
  },
  topMenuIconContainer: { width: '30%', alignItems: 'center' },
  topMenuIcon: {
    width: 50,
    height: 50,
  },
  textTopMenu: {
    color: colors.bodyText,
    fontFamily: 'Poppins-Medium',
    marginTop: 4,
  },
  cardHeaderContainer: {
    flexDirection: 'row',
    width: '100%',
  },
  cardHeaderTitle: {
    fontSize: 17,
    color: colors.bodyText,
    fontFamily: 'Poppins-Bold',
    marginRight: 20,
  },
  icon: {
    width: sizes.icon_size,
    height: sizes.icon_size,
  },
});
