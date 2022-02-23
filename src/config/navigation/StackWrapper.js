import React from 'react';
import { Image, View } from 'react-native';
import {
  NavigationContainer,
  getFocusedRouteNameFromRoute,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as screens from 'containers';
import { dimensions } from '../../utils';
import { navigationRef, isReadyRef } from 'config/navigation/NavigationService';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { colors, icons } from '../../constants';

// import Linking from 'config/navigation/Linking';

const { SCREEN_WIDTH, SCREEN_HEIGHT } = dimensions;

// Top Stack
const MainStack = createNativeStackNavigator();
const ParentStack = createNativeStackNavigator();
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

const RootTab = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: { height: SCREEN_HEIGHT * 0.1 },
        headerShown: false,
      }}>
      <Tab.Screen
        name="MainStackNavigator"
        component={MainStackNavigator}
        options={({ route }) => ({
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
        options={({ route }) => ({
          tabBarIcon: props => (
            <IconBottom
              focused={props.focused}
              image={props.focused ? icons.bottom_chat_bold : icons.bottom_chat}
            />
          ),
        })}
      />
      <Tab.Screen
        name="Test3Screen"
        component={screens.Test3Screen}
        options={({ route }) => ({
          tabBarIcon: props => (
            <IconBottom
              focused={props.focused}
              image={
                props.focused ? icons.bottom_paper_bold : icons.bottom_paper
              }
            />
          ),
        })}
      />
      <Tab.Screen
        name="Test4Screen"
        component={screens.Test4Screen}
        options={({ route }) => ({
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

const MainStackNavigator = () => (
  <MainStack.Navigator
    initialRouteName={'TestScreen'}
    screenOptions={{
      headerMode: 'none',
      headerShown: false,
      gestureEnabled: false,
    }}>
    <MainStack.Screen name="TestScreen" component={screens.TestScreen} />
  </MainStack.Navigator>
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
      onStateChange={state => {
        // console.log('NAVIGATION STATE (onStateChange): ', state);
      }}>
      <ParentStack.Navigator
        initialRouteName={'MainStack'}
        screenOptions={{
          headerMode: 'screen',
          headerShown: false,
          gestureEnabled: false,
        }}>
        <ParentStack.Screen name="MainStack" component={RootTab} />
      </ParentStack.Navigator>
    </NavigationContainer>
  );
};

export default ParentStackNavigator;
