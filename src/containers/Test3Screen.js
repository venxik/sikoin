import React, { useEffect } from 'react';
import type { Node } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchData } from 'actions/DummyActions';

const Test3Screen = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const dispatch = useDispatch();
  const { error, data } = useSelector(state => state.DummyReducers);

  // useEffect(() => {
  //   dispatch(fetchData());
  // }, []);

  // useEffect(() => {
  //   if (data) {
  //     console.log('data', data);
  //   }
  // }, [data]);

  return (
    <SafeAreaView>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <Text>Test</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default Test3Screen;
