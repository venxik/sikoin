import React, { useEffect, useState } from 'react';
import { Image, ImageSourcePropType, View } from 'react-native';
import {
  getFocusedRouteNameFromRoute,
  NavigationContainer,
  RouteProp,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as screens from '../../screens';
import { navigationRef } from './NavigationService';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { colors, icons, SCREEN_HEIGHT, SCREEN_WIDTH } from '../../constants';
import AsyncStore from '../../utils/AsyncStore';
import {
  ChatStackParamList,
  DaftarKoperasiParamList,
  DataDiriStackParamList,
  DiskonStackParamList,
  DokumenStackParamList,
  HomeStackParamList,
  HomeTabParamList,
  HomeTabScreenProps,
  LoginStackParamList,
  MarketStackParamList,
  ParentStackParamList,
  PinjamanStackParamList,
  ProfileStackParamList,
  SaldoSimpananStackParamList,
  TopupStackParamList,
  TransaksiStackParamList,
  VoucherStackParamList,
} from './model';

// import Linking from 'config/navigation/Linking';
// Top Stack
const ParentStack = createNativeStackNavigator<ParentStackParamList>();
const LoginStack = createNativeStackNavigator<LoginStackParamList>();
const DaftarKoperasiStack =
  createNativeStackNavigator<DaftarKoperasiParamList>();
const Tab = createBottomTabNavigator<HomeTabParamList>();
const HomeStack = createNativeStackNavigator<HomeStackParamList>();
const ChatStack = createNativeStackNavigator<ChatStackParamList>();
const ProfileStack = createNativeStackNavigator<ProfileStackParamList>();
const DataDiriStack = createNativeStackNavigator<DataDiriStackParamList>();
const SaldoSimpananStack =
  createNativeStackNavigator<SaldoSimpananStackParamList>();
const DiskonStack = createNativeStackNavigator<DiskonStackParamList>();
const TopupStack = createNativeStackNavigator<TopupStackParamList>();
const TransaksiStack = createNativeStackNavigator<TransaksiStackParamList>();
const VoucherStack = createNativeStackNavigator<VoucherStackParamList>();
const PinjamanStack = createNativeStackNavigator<PinjamanStackParamList>();
const DokumenStack = createNativeStackNavigator<DokumenStackParamList>();
const MarketStack = createNativeStackNavigator<MarketStackParamList>();

const shouldShowBottomNavigation = (route: RouteProp<any, any>) => {
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
    case 'ChatDetailScreen':
      return false;
    case 'DokumenStackNavigator':
      return false;
    case 'MarketStackNavigator':
      return false;
    default:
      return true;
  }
};

const IconBottom = (props: {
  focused: boolean;
  image: ImageSourcePropType;
}) => (
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

const DiskonStackNavigator = () => (
  <DiskonStack.Navigator
    initialRouteName={'DiskonMainScreen'}
    screenOptions={{
      headerShown: false,
      gestureEnabled: false,
    }}>
    <DiskonStack.Screen
      name="DiskonMainScreen"
      component={screens.DiskonMainScreen}
    />
  </DiskonStack.Navigator>
);

const DokumenStackNavigator = () => (
  <DokumenStack.Navigator
    initialRouteName={'DokumenMainScreen'}
    screenOptions={{
      headerShown: false,
      gestureEnabled: false,
    }}>
    <DokumenStack.Screen
      name="DokumenMainScreen"
      component={screens.DokumenMainScreen}
    />
    <DokumenStack.Screen
      name="DokumenDetailScreen"
      component={screens.DokumenDetailScreen}
    />
  </DokumenStack.Navigator>
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
      name="DaftarKtpCameraScreen"
      component={screens.DaftarKtpCameraScreen}
    />
    <DataDiriStack.Screen
      name="DaftarKtpSelfieScreen"
      component={screens.DaftarKtpSelfieScreen}
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
      headerShown: false,
      gestureEnabled: false,
    }}>
    <VoucherStack.Screen
      name="VoucherMainScreen"
      component={screens.VoucherMainScreen}
    />
  </VoucherStack.Navigator>
);

const MarketStackNavigator = () => (
  <MarketStack.Navigator
    initialRouteName={'MarketMainScreen'}
    screenOptions={{
      headerShown: false,
      gestureEnabled: false,
    }}>
    <MarketStack.Screen
      name="MarketMainScreen"
      component={screens.MarketMainScreen}
    />
  </MarketStack.Navigator>
);

const PinjamanStackNavigator = () => (
  <PinjamanStack.Navigator
    initialRouteName={'PinjamanStep1'}
    screenOptions={{
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
  <HomeStack.Navigator
    initialRouteName={'HomeScreen'}
    screenOptions={{
      headerShown: false,
      gestureEnabled: false,
    }}>
    <HomeStack.Screen name="HomeScreen" component={screens.HomeScreen} />
    <HomeStack.Screen
      name="DiskonStackNavigator"
      component={DiskonStackNavigator}
    />
    <HomeStack.Screen
      name="SaldoSimpananStackNavigator"
      component={SaldoSimpananStackNavigator}
    />
    <HomeStack.Screen
      name="TopupStackNavigator"
      component={TopupStackNavigator}
    />
    <HomeStack.Screen
      name="TransaksiStackNavigator"
      component={TransaksiStackNavigator}
    />
    <HomeStack.Screen
      name="VoucherStackNavigator"
      component={VoucherStackNavigator}
    />
    <HomeStack.Screen
      name="PinjamanStackNavigator"
      component={PinjamanStackNavigator}
    />
    <HomeStack.Screen
      name="DokumenStackNavigator"
      component={DokumenStackNavigator}
    />
    <HomeStack.Screen
      name="MarketStackNavigator"
      component={MarketStackNavigator}
    />
  </HomeStack.Navigator>
);

const DaftarKoperasiStackNavigator = () => (
  <DaftarKoperasiStack.Navigator
    initialRouteName={'DaftarKoperasiIntroScreen'}
    screenOptions={{
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

const LoginStackNavigator = () => (
  <LoginStack.Navigator
    initialRouteName={'LoginScreen'}
    screenOptions={{
      headerShown: false,
      gestureEnabled: false,
    }}>
    <LoginStack.Screen name="LoginScreen" component={screens.LoginScreen} />
    <LoginStack.Screen
      name="DaftarKoperasiStackNavigator"
      component={DaftarKoperasiStackNavigator}
    />
    <LoginStack.Screen name="HomeTab" component={HomeTab} />
  </LoginStack.Navigator>
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
          name={'LoginStackNavigator'}
          component={LoginStackNavigator}
        />
      </ParentStack.Navigator>
    </NavigationContainer>
  );
};

export default ParentStackNavigator;
