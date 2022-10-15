import React, { FC, useEffect } from 'react';
import { FlatList, SafeAreaView, StyleSheet, View } from 'react-native';

import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { CardPromo, HeaderBack, MenuHeaderIcon } from '../../components';
import { useAppDispatch, useAppSelector } from '../../config';
import { HomeStackParamList } from '../../config/navigation/model';
import { colors, sizes, strings } from '../../constants';
import { KabarPromoData } from '../../redux/reducers/HomeReducer';
import { fetchPromo, fetchPromoDetail } from '../../redux/reducers/PromoReducer';
import { openUrl } from '../../utils';

type Props = NativeStackScreenProps<HomeStackParamList, 'PromoMainScreen'>;

const PromoMainScreen: FC<Props> = () => {
  const { promoDataList } = useAppSelector((state) => state.PromoReducer) || {};

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchPromo());
  }, []);

  const onPressSelengkapnya = (item: KabarPromoData) => {
    dispatch(fetchPromoDetail(item.id));
  };

  return (
    <SafeAreaView style={styles.container}>
      <HeaderBack />
      {promoDataList && (
        <FlatList
          ListHeaderComponent={<MenuHeaderIcon menu={strings.promo} />}
          data={promoDataList}
          showsHorizontalScrollIndicator={false}
          scrollEventThrottle={16}
          contentContainerStyle={{
            alignItems: 'center',
          }}
          keyExtractor={(item) => item?.id.toString()}
          renderItem={({ item }) => (
            <View style={{ marginTop: 20, flexDirection: 'row' }}>
              <CardPromo
                item={item}
                onPressSelengkapnya={() => onPressSelengkapnya(item)}
                onPressWeb={() => openUrl(item.webUrl as string)}
                style={{ marginRight: 0 }}
              />
            </View>
          )}
        />
      )}
    </SafeAreaView>
  );
};
export default PromoMainScreen;

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
