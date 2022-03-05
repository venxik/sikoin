/* eslint-disable react/prop-types */
import React from 'react';
import { Image, View } from 'react-native';
import {
  getFocusedRouteNameFromRoute,
  NavigationContainer,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as screens from '../../containers';
import { navigationRef, isReadyRef } from '../navigation/NavigationService';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { colors, icons, SCREEN_HEIGHT, SCREEN_WIDTH } from '../../constants';

// import Linking from 'config/navigation/Linking';
// Top Stack
const MainStack = createNativeStackNavigator();
const ParentStack = createNativeStackNavigator();
const DaftarKoperasiStack = createNativeStackNavigator();
const OnboardingStack = createNativeStackNavigator();
const LoginStack = createNativeStackNavigator();
const SaldoSimpananStack = createNativeStackNavigator();
const ProfileStack = createNativeStackNavigator();
const DataDiriStack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

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
        name="Test2Screen"
        component={screens.Test2Screen}
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

const HomeStackNavigator = () => (
  <MainStack.Navigator
    initialRouteName={'HomeScreen'}
    screenOptions={{
      headerMode: 'none',
      headerShown: false,
      gestureEnabled: false,
    }}>
    <MainStack.Screen name="TestScreen" component={screens.Test2Screen} />
    <MainStack.Screen name="HomeScreen" component={screens.HomeScreen} />
    <MainStack.Screen
      name="SaldoSimpananStackNavigator"
      component={SaldoSimpananStackNavigator}
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
  React.useEffect(
    () => () => {
      isReadyRef.current = false;
    },
    [],
  );

  return (
    <NavigationContainer
      // linking={Linking}
      ref={navigationRef}
      onReady={() => {
        isReadyRef.current = true;
      }}>
      <ParentStack.Navigator
        initialRouteName={'MainStack'}
        screenOptions={{
          headerMode: 'screen',
          headerShown: false,
          gestureEnabled: false,
        }}>
        <ParentStack.Screen
          name="MainStack"
          component={OnboardingStackNavigator}
        />
      </ParentStack.Navigator>
    </NavigationContainer>
  );
};

export default ParentStackNavigator;
