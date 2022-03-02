/* eslint-disable react/prop-types */
import React from 'react';
import { Image, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as screens from '../../containers';
import { dimensions } from '../../utils';
import { navigationRef, isReadyRef } from 'config/navigation/NavigationService';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { colors, icons } from '../../constants';

// import Linking from 'config/navigation/Linking';

const { SCREEN_WIDTH, SCREEN_HEIGHT } = dimensions;

// Top Stack
const MainStack = createNativeStackNavigator();
const ParentStack = createNativeStackNavigator();
const DaftarKoperasiStack = createNativeStackNavigator();
const OnboardingStack = createNativeStackNavigator();
const LoginStack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// const shouldShowBottomNavigation = (route) => {
//   const routeName = getFocusedRouteNameFromRoute(route) ?? 'RoadmapStackNavigator';

//   switch (routeName) {
//     case 'Chapter1StackNavigator':
//       return false;
//     case 'Chapter2StackNavigator':
//       return false;
//     case 'Chapter3StackNavigator':
//       return false;
//     case 'Chapter4StackNavigator':
//     default:
//       return true;
//   }
// };

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
        options={() => ({
          tabBarIcon: props => (
            <IconBottom
              focused={props.focused}
              image={props.focused ? icons.bottom_home_bold : icons.bottom_home}
            />
          ),
        })}
      />
      <Tab.Screen
        name="Test2Screen"
        component={screens.Test2Screen}
        options={() => ({
          tabBarIcon: props => (
            <IconBottom
              focused={props.focused}
              image={props.focused ? icons.bottom_chat_bold : icons.bottom_chat}
            />
          ),
        })}
      />
      <Tab.Screen
        name="Test4Screen"
        component={screens.Test3Screen}
        options={() => ({
          tabBarIcon: props => (
            <IconBottom
              focused={props.focused}
              image={
                props.focused ? icons.bottom_profile_bold : icons.bottom_profile
              }
            />
          ),
        })}
      />
    </Tab.Navigator>
  );
};

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
      }}
      // onStateChange={state => {
      //   // console.log('NAVIGATION STATE (onStateChange): ', state);
      // }}
    >
      <ParentStack.Navigator
        initialRouteName={'MainStack'}
        screenOptions={{
          headerMode: 'screen',
          headerShown: false,
          gestureEnabled: false,
        }}>
        <ParentStack.Screen name="MainStack" component={HomeStackNavigator} />
      </ParentStack.Navigator>
    </NavigationContainer>
  );
};

export default ParentStackNavigator;
