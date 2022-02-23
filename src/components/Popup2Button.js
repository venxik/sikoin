import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Modal, Animated, Image } from 'react-native';
import { ButtonText } from '../components';
import PropTypes from 'prop-types';
import { colors, icons } from '../constants';
import { dimensions } from '../utils';

const Popup2Button = props => {
  const {
    showModal,
    headerText,
    contentText,
    customContent,
    headerImage,
    buttonLeftTitle,
    buttonRightTitle,
    buttonLeftOnPress,
    buttonRightOnPress,
  } = props;
  const scaleValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (showModal) {
      Animated.spring(scaleValue, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }
  }, [showModal]);

  const closeModal = press => {
    Animated.timing(scaleValue, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      if (press) {
        press();
      }
    });
  };

  const buttonLeftPressed = () => {
    closeModal(buttonLeftOnPress);
  };
  const buttonRightPressed = () => {
    closeModal(buttonRightOnPress);
  };

  return (
    <Modal animationType="fade" transparent={true} visible={showModal}>
      <View style={styles.modalMainView}>
        <Animated.View
          style={[styles.modalView, { transform: [{ scale: scaleValue }] }]}>
          {headerImage && (
            <Image
              source={headerImage}
              style={{
                width: dimensions.SCREEN_WIDTH * 0.4,
                height: dimensions.SCREEN_WIDTH * 0.4,
              }}
            />
          )}
          {customContent ? (
            customContent
          ) : (
            <View style={{ alignItems: 'center' }}>
              <Text style={styles.headerModalText}>{headerText}</Text>
              <Text style={styles.contentModalText}>{contentText}</Text>
            </View>
          )}
          <View
            style={{
              width: '100%',
              flexDirection: 'row',
              justifyContent: 'space-between',
              backgroundColor: 'yellow',
            }}>
            <ButtonText
              text={buttonLeftTitle}
              onPress={buttonLeftPressed}
              buttonContainerStyle={{ width: '47%' }}
            />
            <ButtonText
              text={buttonRightTitle}
              onPress={buttonRightPressed}
              buttonContainerStyle={{ width: '47%' }}
            />
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
};

Popup2Button.propTypes = {
  showModal: PropTypes.bool,
  headerText: PropTypes.string,
  contentText: PropTypes.string,
  onPress: PropTypes.func,
  customContent: PropTypes.element,
  headerImage: PropTypes.any,
  buttonLeftTitle: PropTypes.string,
  buttonRightTitle: PropTypes.string,
  buttonLeftOnPress: PropTypes.func,
  buttonRightOnPress: PropTypes.func,
};

Popup2Button.defaultProp = {
  showModal: false,
  headerText: 'default',
  contentText: 'default',
  customContent: null,
  headerImage: null,
};

export default Popup2Button;

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
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    width: '85%',
    backgroundColor: colors.white,
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    // shadowColor: '#000',
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    // shadowOpacity: 0.25,
    // shadowRadius: 4,
    // elevation: 5,
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
