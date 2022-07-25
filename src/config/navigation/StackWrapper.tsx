import React, { useEffect, useState } from 'react';
import { ImageBackground, ImageSourcePropType, View } from 'react-native';
import {
  getFocusedRouteNameFromRoute,
  NavigationContainer,
  Route,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as screens from '../../screens';
import { navigationRef } from './NavigationService';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { colors, icons, SCREEN_HEIGHT, SCREEN_WIDTH } from '../../constants';
import { AsyncStore } from '../../utils';
import {
  ChatStackParamList,
  HomeStackParamList,
  HomeTabParamList,
  HomeTabScreenProps,
  ParentStackParamList,
  ProfileStackParamList,
} from './model';

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
  image,
  badge = false,
}: {
  focused: boolean;
  image: ImageSourcePropType;
  badge?: boolean;
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
    }>
    <ImageBackground
      source={image}
      style={{ width: SCREEN_WIDTH * 0.07, height: SCREEN_WIDTH * 0.07 }}
      resizeMode={'contain'}>
      {badge && (
        <View
          style={{
            width: 14,
            height: 14,
            borderRadius: 14,
            backgroundColor: colors.red,
            position: 'absolute',
            top: -2,
            right: -2,
          }}
        />
      )}
    </ImageBackground>
  </View>
);

const HomeTab = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: { height: SCREEN_HEIGHT * 0.1 },
        headerShown: false,
      }}>
      <Tab.Screen
        name="HomeStackNavigator"
        component={HomeStackNavigator}
        options={({ route }: HomeTabScreenProps<'HomeStackNavigator'>) => ({
          tabBarIcon: ({ focused }) => (
            <IconBottom
              focused={focused}
              image={focused ? icons.bottom_home_bold : icons.bottom_home}
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
              image={focused ? icons.bottom_chat_bold : icons.bottom_chat}
              badge
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
              image={focused ? icons.bottom_profile_bold : icons.bottom_profile}
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
    initialRouteName={'HomeScreen'}
    screenOptions={{
      headerShown: false,
      gestureEnabled: false,
    }}>
    <HomeStack.Screen name="HomeScreen" component={screens.HomeScreen} />
    <HomeStack.Screen
      name="DokumenMainScreen"
      component={screens.DokumenMainScreen}
    />
    <HomeStack.Screen
      name="DokumenDetailScreen"
      component={screens.DokumenDetailScreen}
    />
    <HomeStack.Screen
      name="DiskonMainScreen"
      component={screens.DiskonMainScreen}
    />
    <HomeStack.Screen
      name="SaldoSimpananMainScreen"
      component={screens.SaldoSimpananMainScreen}
    />
    <HomeStack.Screen name="CartScreen" component={screens.CartScreen} />
    <HomeStack.Screen
      name="CheckoutScreen"
      component={screens.CheckoutScreen}
    />
    <HomeStack.Screen
      name="SelectPaymentScreen"
      component={screens.SelectPaymentScreen}
    />
    <HomeStack.Screen name="PaymentScreen" component={screens.PaymentScreen} />
    <HomeStack.Screen
      name="PaymentSuccessScreen"
      component={screens.PaymentSuccessScreen}
    />
    <HomeStack.Screen
      name="TopupPenarikanMainScreen"
      component={screens.TopupPenarikanMainScreen}
    />
    <HomeStack.Screen
      name="TopupPenarikanDetailScreen"
      component={screens.TopupPenarikanDetailScreen}
    />
    <HomeStack.Screen
      name="PenarikanSuccessScreen"
      component={screens.PenarikanSuccessScreen}
    />
    <HomeStack.Screen
      name="TransaksiMainScreen"
      component={screens.TransaksiMainScreen}
    />
    <HomeStack.Screen
      name="VoucherMainScreen"
      component={screens.VoucherMainScreen}
    />
    <HomeStack.Screen
      name="MarketMainScreen"
      component={screens.MarketMainScreen}
    />
    <HomeStack.Screen
      name="MarketItemDetailsScreen"
      component={screens.MarketItemDetailsScreen}
    />
    <HomeStack.Screen
      name="PinjamanStep1Screen"
      component={screens.PinjamanStep1}
    />
    <HomeStack.Screen
      name="PinjamanStep2Screen"
      component={screens.PinjamanStep2}
    />
    <HomeStack.Screen
      name="PinjamanStep3Screen"
      component={screens.PinjamanStep3}
    />
    <HomeStack.Screen
      name="PinjamanStep4Screen"
      component={screens.PinjamanStep4}
    />
    <HomeStack.Screen
      name="PinjamanStep5Screen"
      component={screens.PinjamanStep5}
    />
    <HomeStack.Screen
      name="PinjamanReviewScreen"
      component={screens.PinjamanReviewScreen}
    />
    <HomeStack.Screen
      name="PinjamanSucessScreen"
      component={screens.PinjamanSuccessScreen}
    />
    <HomeStack.Screen
      name="DaftarKtpCameraScreen"
      component={screens.DaftarKtpCameraScreen}
    />
  </HomeStack.Navigator>
);

const ChatStackNavigator = () => (
  <ChatStack.Navigator
    initialRouteName={'ChatMainScreen'}
    screenOptions={{
      headerShown: false,
      gestureEnabled: false,
    }}>
    <ChatStack.Screen
      name="ChatMainScreen"
      component={screens.ChatMainScreen}
    />
    <ChatStack.Screen
      name="ChatDetailScreen"
      component={screens.ChatDetailScreen}
    />
  </ChatStack.Navigator>
);

const ProfileStackNavigator = () => (
  <ProfileStack.Navigator
    initialRouteName={'ProfileMainScreen'}
    screenOptions={{
      headerShown: false,
      gestureEnabled: false,
    }}>
    <ProfileStack.Screen
      name="ProfileMainScreen"
      component={screens.ProfileMainScreen}
    />
    <ProfileStack.Screen
      name="EditProfileScreen"
      component={screens.EditProfileScreen}
    />
    <ProfileStack.Screen
      name="PengaturanScreen"
      component={screens.PengaturanScreen}
    />
    <ProfileStack.Screen
      name="DataKoperasiMainScreen"
      component={screens.DataKoperasiMainScreen}
    />
    <ProfileStack.Screen
      name="DataDiriMainScreen"
      component={screens.DataDiriMainScreen}
    />
    <ProfileStack.Screen
      name="DaftarAlamatMainScreen"
      component={screens.DaftarAlamatMainScreen}
    />
    <ProfileStack.Screen
      name="DaftarAlamatAddScreen"
      component={screens.DaftarAlamatAddScreen}
    />
    <ProfileStack.Screen
      name="DaftarRefKeluargaAddScreen"
      component={screens.DaftarRefKeluargaAddScreen}
    />
    <ProfileStack.Screen
      name="DaftarRefKeluargaMainScreen"
      component={screens.DaftarRefKeluargaMainScreen}
    />
    <ProfileStack.Screen
      name="DaftarKtpMainScreen"
      component={screens.DaftarKtpMainScreen}
    />
    <ProfileStack.Screen
      name="DaftarKtpAddScreen"
      component={screens.DaftarKtpAddScreen}
    />
    <ProfileStack.Screen
      name="DaftarKtpCameraScreen"
      component={screens.DaftarKtpCameraScreen}
    />
    <ProfileStack.Screen
      name="DaftarKtpSelfieScreen"
      component={screens.DaftarKtpSelfieScreen}
    />
    <ProfileStack.Screen
      name="DaftarBiodataMainScreen"
      component={screens.DaftarBiodataMainScreen}
    />
    <ProfileStack.Screen
      name="DaftarBiodataAddScreen"
      component={screens.DaftarBiodataAddScreen}
    />
    <ProfileStack.Screen
      name="DaftarPekerjaanMainScreen"
      component={screens.DaftarPekerjaanMainScreen}
    />
    <ProfileStack.Screen
      name="DaftarPekerjaanAddScreen"
      component={screens.DaftarPekerjaanAddScreen}
    />
  </ProfileStack.Navigator>
);

const ParentStackNavigator = () => {
  const [isFirstLaunch, setIsFirstLaunch] = useState(true);

  useEffect(() => {
    (async () => {
      const data = await AsyncStore.getData('@onboardingComplete');
      if (data !== null) {
        setIsFirstLaunch(false);
      }
    })();
  }, []);

  return (
    <NavigationContainer
      // linking={Linking}
      ref={navigationRef}>
      <ParentStack.Navigator
        screenOptions={{
          headerShown: false,
          gestureEnabled: false,
        }}>
        {isFirstLaunch && (
          <ParentStack.Screen
            name={'OnboardingStackNavigator'}
            component={screens.OnboardingScreen}
          />
        )}
        <ParentStack.Screen
          name={'LoginScreen'}
          component={screens.LoginScreen}
        />
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
