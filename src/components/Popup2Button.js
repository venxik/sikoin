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

  const closeModal = press => {
    // Animated.timing(scaleValue, {
    //   toValue: 0,
    //   duration: 200,
    //   useNativeDriver: true,
    // }).start(() => {
    if (press) {
      press();
    }
    // });
  };

  const buttonLeftPressed = () => {
    closeModal(buttonLeftOnPress);
  };
  const buttonRightPressed = () => {
    closeModal(buttonRightOnPress);
  };

  return (
    <Modal animationType="slide" transparent={true} visible={showModal}>
      <View style={styles.modalMainView}>
        <Animated.View style={[styles.modalView]}>
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
          <View
            style={{
              alignItems: 'center',
            }}>
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
          <View style={styles.buttonContainer}>
            <ButtonText
              text={buttonLeftTitle}
              onPress={buttonLeftPressed}
              buttonContainerStyle={{
                width: '47%',
                backgroundColor: colors.white,
                borderColor: colors.primary,
                borderWidth: 1,
              }}
              textStyle={{ color: colors.primary }}
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
  headerTextStyle: PropTypes.object,
  contentTextStyle: PropTypes.object,
};

Popup2Button.defaultProp = {
  showModal: false,
  headerText: 'default',
  contentText: 'default',
  customContent: null,
  headerImage: null,
  headerTextStyle: null,
  contentTextStyle: null,
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
    textAlign: 'center',
    paddingVertical: 10,
  },
  buttonContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
