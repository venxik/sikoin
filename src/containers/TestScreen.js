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
  Image,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchData } from 'actions/DummyActions';
import { HeaderBack, Button } from 'components';
import { TextboxBorder, TextboxForm } from '../components';

const TestScreen = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const rightHeaderIcon = () => {
    return (
      <View style={{ flexDirection: 'row' }}>
        <Image
          source={require('assets/icons/arrow_left_primary.png')}
          style={{
            width: 40,
            height: 40,
          }}
        />
        <Image
          source={require('assets/icons/arrow_left_primary.png')}
          style={{
            width: 40,
            height: 40,
          }}
        />
      </View>
    );
  };

  return (
    <SafeAreaView>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <HeaderBack title="test" rightIcon={rightHeaderIcon()} />
      <Text>Test</Text>
      <Button
        style={{ marginHorizontal: 50, paddingHorizontal: 50 }}
        text="SIMPAN"
        icon={require('assets/icons/arrow_left_primary.png')}
        iconLocation="left"
      />
      <TextboxBorder
        style={{ marginHorizontal: 50, paddingHorizontal: 10 }}
        // value="text"
        // onChangeText={}
        secureTextEntry={false}
        placeholder={'TESTING'}
        icon={require('assets/icons/arrow_left_primary.png')}
      />
      <TextboxForm
        style={{ marginHorizontal: 50, paddingHorizontal: 10 }}
        // value="text"
        // onChangeText={}
        secureTextEntry={false}
        title={'Testing'}
        // placeholder={'TESTING'}
      />
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

export default TestScreen;
