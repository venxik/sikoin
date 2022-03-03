import React from 'react';
import { View, Text, StyleSheet, Modal, Image } from 'react-native';
import { ButtonText } from '../components';
import PropTypes from 'prop-types';
import { colors, strings } from '../constants';
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
    customButtonText,
    iconStyle,
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
              style={[
                {
                  width: dimensions.SCREEN_WIDTH * 0.2,
                  height: dimensions.SCREEN_WIDTH * 0.2,
                  marginVertical: 30,
                },
                { ...iconStyle },
              ]}
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
            <ButtonText
              text={customButtonText ? customButtonText : strings.tutup}
              onPress={closeModal}
            />
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
  customButtonText: PropTypes.string,
  iconStyle: PropTypes.object,
};

Popup1Button.defaultProp = {
  showModal: false,
  headerText: 'default',
  contentText: 'default',
  customContent: null,
  headerImage: null,
  headerTextStyle: null,
  contentTextStyle: null,
  customButtonText: null,
  iconStyle: null,
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
    color: colors.bodyText,
    width: '70%',
    textAlign: 'center',
  },
  contentModalText: {
    paddingHorizontal: 16,
    fontSize: 14,
    color: colors.bodyTextGrey,
    paddingVertical: 20,
    textAlign: 'center',
    lineHeight: 20,
  },
});
