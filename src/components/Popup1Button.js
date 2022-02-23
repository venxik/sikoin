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

  const closeModal = () => {
    Animated.timing(scaleValue, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      if (onPress) {
        onPress();
      }
    });
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
          <View style={{ width: '100%' }}>
            <ButtonText text="Tutup" onPress={closeModal} />
          </View>
        </Animated.View>
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
};

Popup1Button.defaultProp = {
  showModal: false,
  headerText: 'default',
  contentText: 'default',
  customContent: null,
  headerImage: null,
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
