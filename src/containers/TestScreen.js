import React, { useEffect, useState } from 'react';
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
import {
  TextboxBorder,
  TextboxForm,
  ButtonIcon,
  ButtonText,
  HeaderBack,
  SubmenuItemList,
  DropdownForm,
  Popup1Button,
  Popup2Button,
} from '../components';
import { colors, icons } from '../constants';

const TestScreen = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const [showModal, setShowModal] = useState(false);
  const [showModal2, setShowModal2] = useState(false);

  const rightHeaderIcon = () => {
    return (
      <View style={{ flexDirection: 'row' }}>
        <Image
          source={icons.arrow_left_primary}
          style={{
            width: 40,
            height: 40,
          }}
        />
        <Image
          source={icons.arrow_left_primary}
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
      <Popup1Button
        headerText="Text"
        contentText="Lorem ipsum blaskdlas dsaldaskdsakd asld asdkasdklasd lkasd lkasd klas dklasd klasd las"
        showModal={showModal}
        onPress={() => setShowModal(false)}
        headerImage={icons.popup_success}
        customContent={
          <View style={{ alignItems: 'center', width: '100%' }}>
            <Text style={styles.headerModalText}>Test</Text>
            <Text style={styles.contentModalText}>Content</Text>
            <TextboxBorder
              style={{
                marginHorizontal: 50,
                paddingHorizontal: 10,
                // flex: 1,
                width: '100%',
              }}
              // value="text"
              // onChangeText={}
              secureTextEntry={false}
              placeholder={'TESTING'}
              icon={icons.edit_textbox}
            />
          </View>
        }
      />
      <Popup2Button
        buttonLeftOnPress={() => setShowModal2(false)}
        buttonRightOnPress={() => setShowModal2(false)}
        buttonLeftTitle="Kiri"
        buttonRightTitle="Kanan"
        headerText="Text"
        contentText="Lorem ipsum blaskdlas dsaldaskdsakd asld asdkasdklasd lkasd lkasd klas dklasd klasd las"
        showModal={showModal2}
        headerImage={icons.popup_success}
        // customContent={
        //   <View style={{ alignItems: 'center', width: '100%' }}>
        //     <Text style={styles.headerModalText}>Test</Text>
        //     <Text style={styles.contentModalText}>Content</Text>
        //     <TextboxBorder
        //       style={{
        //         marginHorizontal: 50,
        //         paddingHorizontal: 10,
        //         // flex: 1,
        //         width: '100%',
        //       }}
        //       // value="text"
        //       // onChangeText={}
        //       secureTextEntry={false}
        //       placeholder={'TESTING'}
        //       icon={icons.edit_textbox}
        //     />
        //   </View>
        // }
      />
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <HeaderBack title="test" rightIcon={rightHeaderIcon()} />
      <Text>Test</Text>
      <ButtonText
        onPress={() => setShowModal(true)}
        buttonContainerStyle={{ marginHorizontal: 50, paddingHorizontal: 50 }}
        text="SIMPAN"
        icon={icons.bottom_chat_bold}
        iconLocation="left"
      />
      <ButtonIcon
        onPress={() => setShowModal2(true)}
        buttonContainerStyle={{ marginHorizontal: 50, paddingHorizontal: 50 }}
        // text="SIMPAN"
        icon={icons.bottom_paper}
        // iconLocation="left"
      />
      <TextboxBorder
        style={{ marginHorizontal: 50, paddingHorizontal: 10 }}
        // value="text"
        // onChangeText={}
        secureTextEntry={false}
        placeholder={'TESTING'}
        icon={icons.edit_textbox}
      />
      <TextboxForm
        style={{ marginHorizontal: 50, paddingHorizontal: 10 }}
        // value="text"
        // onChangeText={}
        secureTextEntry={false}
        title={'Testing'}
        // placeholder={'TESTING'}
      />
      <SubmenuItemList
        icon={icons.bottom_home}
        title={'Profile'}
        navigateTo={'test'}
      />
      <DropdownForm customText={'Profile'} style={{ width: 200 }} />
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
  headerModalText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.black,
    width: '70%',
    textAlign: 'center',
  },
  contentModalText: {
    fontSize: 16,
    color: colors.black,
    paddingVertical: 20,
    textAlign: 'center',
  },
});

export default TestScreen;
