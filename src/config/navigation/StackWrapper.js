/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { Image, View } from 'react-native';
import {
  getFocusedRouteNameFromRoute,
  NavigationContainer,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as screens from '../../containers';
import { navigationRef } from '../navigation/NavigationService';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { colors, icons, SCREEN_HEIGHT, SCREEN_WIDTH } from '../../constants';
import AsyncStore from '../../utils/AsyncStore';

// import Linking from 'config/navigation/Linking';
// Top Stack
const Tab = createBottomTabNavigator();
const MainStack = createNativeStackNavigator();
const ParentStack = createNativeStackNavigator();
const DaftarKoperasiStack = createNativeStackNavigator();
const OnboardingStack = createNativeStackNavigator();
const LoginStack = createNativeStackNavigator();
const SaldoSimpananStack = createNativeStackNavigator();
const ProfileStack = createNativeStackNavigator();
const DataDiriStack = createNativeStackNavigator();
const DiskonStack = createNativeStackNavigator();
const TopupStack = createNativeStackNavigator();
const TransaksiStack = createNativeStackNavigator();
const VoucherStack = createNativeStackNavigator();
const PinjamanStack = createNativeStackNavigator();
const ChatStack = createNativeStackNavigator();

const shouldShowBottomNavigation = route => {
  const routeName = getFocusedRouteNameFromRoute(route) ?? 'HomeStackNavigator';
  switch (routeName) {
    case 'OnboardingStackNavigator':
      return false;
    case 'LoginStackNavigator':
      return false;
    case 'DaftarKoperasiStackNavigator':
      return false;
    case 'SaldoSimpananStackNavigator':
      return false;
    case 'EditProfileScreen':
      return false;
    case 'PengaturanScreen':
      return false;
    case 'DataDiriStackNavigator':
      return false;
    case 'DiskonStackNavigator':
      return false;
    case 'TopupStackNavigator':
      return false;
    case 'VoucherStackNavigator':
      return false;
    case 'TransaksiStackNavigator':
      return false;
    case 'PinjamanStackNavigator':
      return false;
    case 'DataKoperasiMainScreen':
      return false;
    default:
      return true;
  }
};

const IconBottom = props => (
  <View
    style={
      props.focused
        ? {
            backgroundColor: colors.tonalPrimary,
            paddingHorizontal: SCREEN_WIDTH * 0.04,
            paddingVertical: SCREEN_WIDTH * 0.02,
            borderRadius: SCREEN_WIDTH * 0.07,
          }
        : null
    }>
    <Image
      source={props.image}
      style={{ width: SCREEN_WIDTH * 0.07, height: SCREEN_WIDTH * 0.07 }}
      resizeMode={'contain'}
    />
  </View>
);

const BottomTab = () => {
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
        options={({ route }) => ({
          tabBarIcon: props => (
            <IconBottom
              focused={props.focused}
              image={props.focused ? icons.bottom_home_bold : icons.bottom_home}
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
        options={({ route }) => ({
          tabBarIcon: props => (
            <IconBottom
              focused={props.focused}
              image={props.focused ? icons.bottom_chat_bold : icons.bottom_chat}
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
        options={({ route }) => ({
          tabBarIcon: props => (
            <IconBottom
              focused={props.focused}
              image={
                props.focused ? icons.bottom_profile_bold : icons.bottom_profile
              }
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

const ChatStackNavigator = () => (
  <ChatStack.Navigator
    initialRouteName={'ChatMainScreen'}
    screenOptions={{
      headerMode: 'none',
      headerShown: false,
      gestureEnabled: false,
    }}>
    <ChatStack.Screen
      name="ChatMainScreen"
      component={screens.ChatMainScreen}
    />
  </ChatStack.Navigator>
);

const DiskonStackNavigator = () => (
  <DiskonStack.Navigator
    initialRouteName={'DiskonMainScreen'}
    screenOptions={{
      headerMode: 'none',
      headerShown: false,
      gestureEnabled: false,
    }}>
    <DiskonStack.Screen
      name="DiskonMainScreen"
      component={screens.DiskonMainScreen}
    />
  </DiskonStack.Navigator>
);

const ProfileStackNavigator = () => (
  <ProfileStack.Navigator
    initialRouteName={'ProfileMainScreen'}
    screenOptions={{
      headerMode: 'none',
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
      name="DataDiriStackNavigator"
      component={DataDiriStackNavigator}
    />
    <ProfileStack.Screen
      name="PengaturanScreen"
      component={screens.PengaturanScreen}
    />
    <ProfileStack.Screen
      name="DataKoperasiMainScreen"
      component={screens.DataKoperasiMainScreen}
    />
  </ProfileStack.Navigator>
);

const DataDiriStackNavigator = () => (
  <DataDiriStack.Navigator
    initialRouteName={'DataDiriMainScreen'}
    screenOptions={{
      headerMode: 'none',
      headerShown: false,
      gestureEnabled: false,
    }}>
    <DataDiriStack.Screen
      name="DataDiriMainScreen"
      component={screens.DataDiriMainScreen}
    />
    <DataDiriStack.Screen
      name="DaftarAlamatMainScreen"
      component={screens.DaftarAlamatMainScreen}
    />
    <DataDiriStack.Screen
      name="DaftarAlamatAddScreen"
      component={screens.DaftarAlamatAddScreen}
    />
    <DataDiriStack.Screen
      name="DaftarAlamatMapScreen"
      component={screens.DaftarAlamatMapScreen}
    />
    <DataDiriStack.Screen
      name="DaftarRefKeluargaAddScreen"
      component={screens.DaftarRefKeluargaAddScreen}
    />
    <DataDiriStack.Screen
      name="DaftarRefKeluargaMainScreen"
      component={screens.DaftarRefKeluargaMainScreen}
    />
    <DataDiriStack.Screen
      name="DaftarKtpMainScreen"
      component={screens.DaftarKtpMainScreen}
    />
    <DataDiriStack.Screen
      name="DaftarKtpAddScreen"
      component={screens.DaftarKtpAddScreen}
    />
    <DataDiriStack.Screen
      name="DaftarBiodataMainScreen"
      component={screens.DaftarBiodataMainScreen}
    />
    <DataDiriStack.Screen
      name="DaftarBiodataAddScreen"
      component={screens.DaftarBiodataAddScreen}
    />
    <DataDiriStack.Screen
      name="DaftarPekerjaanMainScreen"
      component={screens.DaftarPekerjaanMainScreen}
    />
    <DataDiriStack.Screen
      name="DaftarPekerjaanAddScreen"
      component={screens.DaftarPekerjaanAddScreen}
    />
  </DataDiriStack.Navigator>
);

const SaldoSimpananStackNavigator = () => (
  <SaldoSimpananStack.Navigator
    initialRouteName={'SaldoSimpananMainScreen'}
    screenOptions={{
      headerMode: 'none',
      headerShown: false,
      gestureEnabled: false,
    }}>
    <SaldoSimpananStack.Screen
      name="SaldoSimpananMainScreen"
      component={screens.SaldoSimpananMainScreen}
    />
  </SaldoSimpananStack.Navigator>
);

const TopupStackNavigator = () => (
  <TopupStack.Navigator
    initialRouteName={'TopupMainScreen'}
    screenOptions={{
      headerMode: 'none',
      headerShown: false,
      gestureEnabled: false,
    }}>
    <TopupStack.Screen
      name="TopupMainScreen"
      component={screens.TopupMainScreen}
    />
    <TopupStack.Screen
      name="TopupDetailScreen"
      component={screens.TopupDetailScreen}
    />
    <TopupStack.Screen
      name="TopupPembayaranScreen"
      component={screens.TopupPembayaranScreen}
    />
    <TopupStack.Screen
      name="TopupSuccessScreen"
      component={screens.TopupSuccessScreen}
    />
  </TopupStack.Navigator>
);

const TransaksiStackNavigator = () => (
  <TransaksiStack.Navigator
    initialRouteName={'TransaksiMainScreen'}
    screenOptions={{
      headerMode: 'none',
      headerShown: false,
      gestureEnabled: false,
    }}>
    <TransaksiStack.Screen
      name="TransaksiMainScreen"
      component={screens.TransaksiMainScreen}
    />
  </TransaksiStack.Navigator>
);

const VoucherStackNavigator = () => (
  <VoucherStack.Navigator
    initialRouteName={'VoucherMainScreen'}
    screenOptions={{
      headerMode: 'none',
      headerShown: false,
      gestureEnabled: false,
    }}>
    <VoucherStack.Screen
      name="VoucherMainScreen"
      component={screens.VoucherMainScreen}
    />
  </VoucherStack.Navigator>
);

const PinjamanStackNavigator = () => (
  <PinjamanStack.Navigator
    initialRouteName={'PinjamanStep1'}
    screenOptions={{
      headerMode: 'none',
      headerShown: false,
      gestureEnabled: false,
    }}>
    <PinjamanStack.Screen
      name="PinjamanStep1"
      component={screens.PinjamanStep1}
    />
    <PinjamanStack.Screen
      name="PinjamanStep2"
      component={screens.PinjamanStep2}
    />
    <PinjamanStack.Screen
      name="PinjamanStep3"
      component={screens.PinjamanStep3}
    />
    <PinjamanStack.Screen
      name="PinjamanStep4"
      component={screens.PinjamanStep4}
    />
  </PinjamanStack.Navigator>
);

const HomeStackNavigator = () => (
  <MainStack.Navigator
    initialRouteName={'HomeScreen'}
    screenOptions={{
      headerMode: 'none',
      headerShown: false,
      gestureEnabled: false,
    }}>
    <MainStack.Screen name="HomeScreen" component={screens.HomeScreen} />
    <MainStack.Screen
      name="DiskonStackNavigator"
      component={DiskonStackNavigator}
    />
    <MainStack.Screen
      name="SaldoSimpananStackNavigator"
      component={SaldoSimpananStackNavigator}
    />
    <MainStack.Screen
      name="TopupStackNavigator"
      component={TopupStackNavigator}
    />
    <MainStack.Screen
      name="TransaksiStackNavigator"
      component={TransaksiStackNavigator}
    />
    <MainStack.Screen
      name="VoucherStackNavigator"
      component={VoucherStackNavigator}
    />
    <MainStack.Screen
      name="PinjamanStackNavigator"
      component={PinjamanStackNavigator}
    />
  </MainStack.Navigator>
);

const OnboardingStackNavigator = () => (
  <OnboardingStack.Navigator
    initialRouteName={'OnboardingScreen'}
    screenOptions={{
      headerMode: 'none',
      headerShown: false,
      gestureEnabled: false,
    }}>
    <OnboardingStack.Screen
      name="OnboardingScreen"
      component={screens.OnboardingScreen}
    />
    <OnboardingStack.Screen
      name="LoginStackNavigator"
      component={LoginStackNavigator}
    />
  </OnboardingStack.Navigator>
);

const LoginStackNavigator = () => (
  <LoginStack.Navigator
    initialRouteName={'LoginScreen'}
    screenOptions={{
      headerMode: 'none',
      headerShown: false,
      gestureEnabled: false,
    }}>
    <LoginStack.Screen name="LoginScreen" component={screens.LoginScreen} />
    <LoginStack.Screen
      name="DaftarKoperasiStackNavigator"
      component={DaftarKoperasiStackNavigator}
    />
    <LoginStack.Screen name="BottomTab" component={BottomTab} />
  </LoginStack.Navigator>
);

const DaftarKoperasiStackNavigator = () => (
  <DaftarKoperasiStack.Navigator
    initialRouteName={'DaftarKoperasiIntroScreen'}
    screenOptions={{
      headerMode: 'none',
      headerShown: false,
      gestureEnabled: false,
    }}>
    <DaftarKoperasiStack.Screen
      name="DaftarKoperasiIntroScreen"
      component={screens.DaftarKoperasiIntroScreen}
    />
    <DaftarKoperasiStack.Screen
      name="DaftarKoperasiStep1Screen"
      component={screens.DaftarKoperasiStep1Screen}
    />
    <DaftarKoperasiStack.Screen
      name="DaftarKoperasiStep2Screen"
      component={screens.DaftarKoperasiStep2Screen}
    />
    <DaftarKoperasiStack.Screen
      name="DaftarKoperasiSuccessScreen"
      component={screens.DaftarKoperasiSuccessScreen}
    />
  </DaftarKoperasiStack.Navigator>
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
        // initialRouteName={'MainStack'}
        screenOptions={{
          headerMode: 'screen',
          headerShown: false,
          gestureEnabled: false,
        }}>
        <ParentStack.Screen
          name="MainStack"
          component={
            isFirstLaunch ? OnboardingStackNavigator : LoginStackNavigator
          }
        />
      </ParentStack.Navigator>
    </NavigationContainer>
  );
};

export default ParentStackNavigator;
