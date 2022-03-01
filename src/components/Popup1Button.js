import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Modal, Animated, Image } from 'react-native';
import { ButtonText } from '../components';
import PropTypes from 'prop-types';
import { colors, icons } from '../constants';
import { dimensions } from '../utils';

const Popup1Button = props => {
  const {
    showModal,
    headerText,
    contentText,
    onPress,
    customContent,
    headerImage,
    headerTextStyle,
    contentTextStyle,
  } = props;

  // const scaleValue = useRef(new Animated.Value(0)).current;

  // useEffect(() => {
  //   if (showModal) {
  //     Animated.spring(scaleValue, {
  //       toValue: 1,
  //       duration: 200,
  //       useNativeDriver: true,
  //     }).start();
  //   }
  // }, [showModal]);

  const closeModal = () => {
    // Animated.timing(scaleValue, {
    //   toValue: 0,
    //   duration: 200,
    //   useNativeDriver: true,
    // }).start(() => {
    if (onPress) {
      onPress();
    }
    // });
  };

  return (
    <Modal animationType="slide" transparent={true} visible={showModal}>
      <View style={styles.modalMainView}>
        <View style={[styles.modalView]}>
          {headerImage && (
            <Image
              source={headerImage}
              style={{
                width: dimensions.SCREEN_WIDTH * 0.2,
                height: dimensions.SCREEN_WIDTH * 0.2,
                marginVertical: 30,
              }}
            />
          )}
          <View style={{ alignItems: 'center' }}>
            {headerText && (
              <Text style={[styles.headerModalText, headerTextStyle]}>
                {headerText}
              </Text>
            )}
            {contentText && (
              <Text style={[styles.contentModalText, contentTextStyle]}>
                {contentText}
              </Text>
            )}
          </View>
          {customContent && customContent}
          <View style={{ width: '100%' }}>
            <ButtonText text="Tutup" onPress={closeModal} />
          </View>
        </View>
      </View>
    </Modal>
  );
};

Popup1Button.propTypes = {
  showModal: PropTypes.bool,
  headerText: PropTypes.string,
  contentText: PropTypes.string,
  onPress: PropTypes.func,
  customContent: PropTypes.element,
  headerImage: PropTypes.any,
  headerTextStyle: PropTypes.object,
  contentTextStyle: PropTypes.object,
};

Popup1Button.defaultProp = {
  showModal: false,
  headerText: 'default',
  contentText: 'default',
  customContent: null,
  headerImage: null,
  headerTextStyle: null,
  contentTextStyle: null,
};

export default Popup1Button;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalMainView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  modalView: {
    width: '85%',
    backgroundColor: colors.white,
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
  },
  headerModalText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.black,
    width: '70%',
    textAlign: 'center',
  },
  contentModalText: {
    fontSize: 14,
    color: colors.black,
    paddingVertical: 20,
    textAlign: 'center',
  },
});
