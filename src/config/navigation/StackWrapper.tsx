/* eslint-disable @typescript-eslint/indent */
import React from 'react';
import { Text, View } from 'react-native';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { getFocusedRouteNameFromRoute, NavigationContainer, Route } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Home, Message, User } from 'react-native-iconly';

import { colors, SCREEN_HEIGHT, SCREEN_WIDTH } from '../../constants';
import * as screens from '../../screens';
import { useAppSelector } from '../store';
import {
  ChatStackParamList,
  HomeStackParamList,
  HomeTabParamList,
  HomeTabScreenProps,
  ParentStackParamList,
  ProfileStackParamList,
} from './model';
import { navigationRef } from './NavigationService';

// import Linking from 'config/navigation/Linking';
// Top Stack
const ParentStack = createNativeStackNavigator<ParentStackParamList>();
const Tab = createBottomTabNavigator<HomeTabParamList>();
const HomeStack = createNativeStackNavigator<HomeStackParamList>();
const ChatStack = createNativeStackNavigator<ChatStackParamList>();
const ProfileStack = createNativeStackNavigator<ProfileStackParamList>();

const shouldShowBottomNavigation = (route: Partial<Route<string>>) => {
  const routeName = getFocusedRouteNameFromRoute(route) ?? 'HomeTab';
  switch (routeName) {
    case 'HomeTab':
      return true;
    case 'HomeScreen':
      return true;
    case 'ChatMainScreen':
      return true;
    case 'ProfileMainScreen':
      return true;
    default:
      return false;
  }
};

const IconBottom = ({
  focused,
  badge = false,
  icon,
  number = 0,
}: {
  focused: boolean;
  badge?: boolean;
  icon: JSX.Element;
  number?: number;
}) => (
  <View
    style={
      focused
        ? {
            backgroundColor: colors.tonalPrimary,
            paddingHorizontal: SCREEN_WIDTH * 0.04,
            paddingVertical: SCREEN_WIDTH * 0.02,
            borderRadius: SCREEN_WIDTH * 0.07,
          }
        : null
    }
  >
    <View>
      {icon}
      {badge && (
        <View
          style={{
            width: 20,
            height: 20,
            borderRadius: 20,
            backgroundColor: colors.red,
            position: 'absolute',
            top: -8,
            right: -8,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {number > 1 && (
            <Text
              style={{
                color: colors.white,
                fontSize: 12,
              }}
            >
              {number}
            </Text>
          )}
        </View>
      )}
    </View>
  </View>
);

const HomeTab = () => {
  const { notifikasi } = useAppSelector((s) => s.NotifikasiReducer.notifikasiDataList);
  const notifikasiUnread = notifikasi.filter((v) => !v.isTerbaca);
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: { height: SCREEN_HEIGHT * 0.1 },
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="HomeStackNavigator"
        component={HomeStackNavigator}
        options={({ route }: HomeTabScreenProps<'HomeStackNavigator'>) => ({
          tabBarIcon: ({ focused }) => (
            <IconBottom
              focused={focused}
              icon={<Home color={colors.primary} filled={focused ? true : false} />}
            />
          ),
          tabBarStyle: {
            height: SCREEN_HEIGHT * 0.1,
            display: shouldShowBottomNavigation(route) ? 'flex' : 'none',
          },
        })}
      />
      <Tab.Screen
        name="ChatStackNavigator"
        component={ChatStackNavigator}
        options={({ route }: HomeTabScreenProps<'ChatStackNavigator'>) => ({
          tabBarIcon: ({ focused }) => (
            <IconBottom
              focused={focused}
              icon={<Message color={colors.primary} filled={focused ? true : false} />}
              badge={notifikasiUnread.length > 0}
              number={notifikasiUnread.length}
            />
          ),
          tabBarStyle: {
            height: SCREEN_HEIGHT * 0.1,
            display: shouldShowBottomNavigation(route) ? 'flex' : 'none',
          },
        })}
      />
      <Tab.Screen
        name="ProfileStackNavigator"
        component={ProfileStackNavigator}
        options={({ route }: HomeTabScreenProps<'ProfileStackNavigator'>) => ({
          tabBarIcon: ({ focused }) => (
            <IconBottom
              focused={focused}
              icon={<User color={colors.primary} filled={focused ? true : false} />}
            />
          ),
          tabBarStyle: {
            height: SCREEN_HEIGHT * 0.1,
            display: shouldShowBottomNavigation(route) ? 'flex' : 'none',
          },
        })}
      />
    </Tab.Navigator>
  );
};

const HomeStackNavigator = () => (
  <HomeStack.Navigator
    initialRouteName={'MarketMainScreen'}
    screenOptions={{
      headerShown: false,
      gestureEnabled: false,
    }}
  >
    <HomeStack.Screen name="HomeScreen" component={screens.HomeScreen} />
    <HomeStack.Screen
      name="DokumenMainScreen"
      component={screens.DokumenMainScreen}
      options={{ animation: 'default' }}
    />
    {/* <HomeStack.Screen
      name="DokumenDetailScreen"
      component={screens.DokumenDetailScreen}
    /> */}
    <HomeStack.Screen name="DiskonMainScreen" component={screens.DiskonMainScreen} />
    <HomeStack.Screen name="SaldoSimpananMainScreen" component={screens.SaldoSimpananMainScreen} />
    <HomeStack.Screen name="MarketCartScreen" component={screens.MarketCartScreen} />
    <HomeStack.Screen name="MarketCheckoutScreen" component={screens.MarketCheckoutScreen} />
    <HomeStack.Screen name="PaymentScreen" component={screens.PaymentScreen} />
    <HomeStack.Screen name="SelectPaymentScreen" component={screens.SelectPaymentScreen} />
    <HomeStack.Screen name="PaymentSuccessScreen" component={screens.PaymentSuccessScreen} />
    <HomeStack.Screen
      name="TopupPenarikanMainScreen"
      component={screens.TopupPenarikanMainScreen}
      initialParams={{ isTopup: false }}
    />
    <HomeStack.Screen
      name="TopupPenarikanDetailScreen"
      component={screens.TopupPenarikanDetailScreen}
    />
    <HomeStack.Screen name="PenarikanSuccessScreen" component={screens.PenarikanSuccessScreen} />
    <HomeStack.Screen name="TransaksiMainScreen" component={screens.TransaksiMainScreen} />
    <HomeStack.Screen name="VoucherMainScreen" component={screens.VoucherMainScreen} />
    <HomeStack.Screen name="MarketMainScreen" component={screens.MarketMainScreen} />
    <HomeStack.Screen name="MarketItemDetailsScreen" component={screens.MarketItemDetailsScreen} />
    <HomeStack.Screen name="PinjamanMainScreen" component={screens.PinjamanMainScreen} />
    <HomeStack.Screen name="PinjamanListScreen" component={screens.PinjamanListScreen} />
    <HomeStack.Screen name="PinjamanStep1Screen" component={screens.PinjamanStep1} />
    <HomeStack.Screen name="PinjamanStep2Screen" component={screens.PinjamanStep2} />
    <HomeStack.Screen name="PinjamanStep3Screen" component={screens.PinjamanStep3} />
    <HomeStack.Screen name="PinjamanStep4Screen" component={screens.PinjamanStep4} />
    <HomeStack.Screen name="PinjamanStep5Screen" component={screens.PinjamanStep5} />
    <HomeStack.Screen name="PinjamanSummaryScreen" component={screens.PinjamanSummaryScreen} />
    <HomeStack.Screen name="PinjamanSucessScreen" component={screens.PinjamanSuccessScreen} />
    <HomeStack.Screen name="PinjamanDetailScreen" component={screens.PinjamanDetailScreen} />
    <HomeStack.Screen name="PinjamanRincianScreen" component={screens.PinjamanRincianScreen} />
    <HomeStack.Screen name="PinjamanSimulasiScreen" component={screens.PinjamanSimulasiScreen} />
    <HomeStack.Screen name="DaftarKtpCameraScreen" component={screens.DaftarKtpCameraScreen} />
    <HomeStack.Screen name="DaftarKtpSelfieScreen" component={screens.DaftarKtpSelfieScreen} />
    <HomeStack.Screen name="SaldoSimpananDetailScreen" component={screens.SaldoSimpananDetail} />
    <HomeStack.Screen name="KabarMainScreen" component={screens.KabarMainScreen} />
    <HomeStack.Screen name="KabarDetailScreen" component={screens.KabarDetailScreen} />
    <HomeStack.Screen name="PromoMainScreen" component={screens.PromoMainScreen} />
    <HomeStack.Screen name="PromoDetailScreen" component={screens.PromoDetailScreen} />
    <HomeStack.Screen
      name="DaftarBiodataAddScreen"
      component={screens.DaftarBiodataAddScreen}
      initialParams={{ update: false }}
    />
    <HomeStack.Screen name="MarketPesananMainScreen" component={screens.MarketPesananMainScreen} />
    <HomeStack.Screen
      name="MarketPesananDetailScreen"
      component={screens.MarketPesananDetailScreen}
    />
    <HomeStack.Screen name="MarketItemListScreen" component={screens.MarketItemListScreen} />
  </HomeStack.Navigator>
);

const ChatStackNavigator = () => (
  <ChatStack.Navigator
    screenOptions={{
      headerShown: false,
      gestureEnabled: false,
    }}
  >
    <ChatStack.Screen name="ChatMainScreen" component={screens.ChatMainScreen} />
    <ChatStack.Screen name="ChatDetailScreen" component={screens.ChatDetailScreen} />
  </ChatStack.Navigator>
);

const ProfileStackNavigator = () => (
  <ProfileStack.Navigator
    screenOptions={{
      headerShown: false,
      gestureEnabled: false,
    }}
  >
    <ProfileStack.Screen name="ProfileMainScreen" component={screens.ProfileMainScreen} />
    <ProfileStack.Screen name="EditProfileScreen" component={screens.EditProfileScreen} />
    <ProfileStack.Screen name="PengaturanScreen" component={screens.PengaturanScreen} />
    <ProfileStack.Screen name="DataKoperasiMainScreen" component={screens.DataKoperasiMainScreen} />
    <ProfileStack.Screen name="DataDiriMainScreen" component={screens.DataDiriMainScreen} />
    <ProfileStack.Screen name="DaftarAlamatMainScreen" component={screens.DaftarAlamatMainScreen} />
    <ProfileStack.Screen name="DaftarAlamatAddScreen" component={screens.DaftarAlamatAddScreen} />
    <ProfileStack.Screen
      name="DaftarRefKeluargaAddScreen"
      component={screens.DaftarRefKeluargaAddScreen}
    />
    <ProfileStack.Screen
      name="DaftarRefKeluargaMainScreen"
      component={screens.DaftarRefKeluargaMainScreen}
    />
    <ProfileStack.Screen name="DaftarKtpMainScreen" component={screens.DaftarKtpMainScreen} />
    <ProfileStack.Screen name="DaftarKtpAddScreen" component={screens.DaftarKtpAddScreen} />
    <ProfileStack.Screen name="DaftarKtpCameraScreen" component={screens.DaftarKtpCameraScreen} />
    <ProfileStack.Screen name="DaftarKtpSelfieScreen" component={screens.DaftarKtpSelfieScreen} />
    <ProfileStack.Screen
      name="DaftarBiodataMainScreen"
      component={screens.DaftarBiodataMainScreen}
    />
    <ProfileStack.Screen name="DaftarBiodataAddScreen" component={screens.DaftarBiodataAddScreen} />
    <ProfileStack.Screen
      name="DaftarPekerjaanMainScreen"
      component={screens.DaftarPekerjaanMainScreen}
    />
    <ProfileStack.Screen
      name="DaftarPekerjaanAddScreen"
      component={screens.DaftarPekerjaanAddScreen}
    />
    <ProfileStack.Screen
      name="DokumenPendukungMainScreen"
      component={screens.DokumenPendukungMainScreen}
    />
    <ProfileStack.Screen name="IDCardMainScreen" component={screens.IDCardMainScreen} />
    <ProfileStack.Screen name="ChangePasswordScreen" component={screens.ChangePasswordScreen} />
  </ProfileStack.Navigator>
);

const ParentStackNavigator = () => {
  return (
    <NavigationContainer
      // linking={Linking}
      ref={navigationRef}
    >
      <ParentStack.Navigator
        screenOptions={{
          headerShown: false,
          gestureEnabled: false,
        }}
        initialRouteName="HomeTab"
      >
        <ParentStack.Screen name={'SplashScreen'} component={screens.SplashScreen} />
        <ParentStack.Screen name={'OnboardingScreen'} component={screens.OnboardingScreen} />
        <ParentStack.Screen name={'LoginScreen'} component={screens.LoginScreen} />
        <ParentStack.Screen
          name="DaftarKoperasiIntroScreen"
          component={screens.DaftarKoperasiIntroScreen}
        />
        <ParentStack.Screen
          name="DaftarKoperasiSearchScreen"
          component={screens.DaftarKoperasiSearchScreen}
        />
        <ParentStack.Screen
          name="DaftarKoperasiStep1Screen"
          component={screens.DaftarKoperasiStep1Screen}
        />
        <ParentStack.Screen
          name="DaftarKoperasiStep2Screen"
          component={screens.DaftarKoperasiStep2Screen}
        />
        <ParentStack.Screen
          name="DaftarKoperasiSuccessScreen"
          component={screens.DaftarKoperasiSuccessScreen}
        />
        <ParentStack.Screen
          name="DaftarKoperasiFailedScreen"
          component={screens.DaftarKoperasiFailedScreen}
        />
        <ParentStack.Screen name="HomeTab" component={HomeTab} />
      </ParentStack.Navigator>
    </NavigationContainer>
  );
};

export default ParentStackNavigator;
