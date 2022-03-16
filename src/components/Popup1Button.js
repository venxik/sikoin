import React from 'react';
import { View, Text, StyleSheet, Modal, Image } from 'react-native';
import { ButtonText } from '../components';
import PropTypes from 'prop-types';
import { colors, SCREEN_WIDTH, sizes, strings } from '../constants';
import { isEmpty } from 'lodash';

const Popup1Button = props => {
  const {
    showPopup,
    headerText,
    contentText,
    onPress,
    customContent,
    headerImage,
    headerTextStyle,
    contentTextStyle,
    customButtonText,
    iconStyle,
    style,
  } = props;

  // const scaleValue = useRef(new Animated.Value(0)).current;

  // useEffect(() => {
  //   if (showPopup) {
  //     Animated.spring(scaleValue, {
  //       toValue: 1,
  //       duration: 200,
  //       useNativeDriver: true,
  //     }).start();
  //   }
  // }, [showPopup]);

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
    <Modal animationType="slide" transparent={true} visible={showPopup}>
      <View style={styles.modalMainView}>
        <View style={[styles.modalView, style]}>
          {headerImage && (
            <Image
              resizeMode="cover"
              source={headerImage}
              style={[styles.icon, { ...iconStyle }]}
            />
          )}
          <View style={{ alignItems: 'center' }}>
            {!isEmpty(headerText) && (
              <Text style={[styles.headerModalText, headerTextStyle]}>
                {headerText}
              </Text>
            )}
            {!isEmpty(contentText) && (
              <Text style={[styles.contentModalText, contentTextStyle]}>
                {contentText}
              </Text>
            )}
          </View>
          {customContent}
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
  showPopup: PropTypes.bool,
  headerText: PropTypes.string,
  contentText: PropTypes.string,
  onPress: PropTypes.func,
  customContent: PropTypes.element,
  headerImage: PropTypes.any,
  headerTextStyle: PropTypes.object,
  contentTextStyle: PropTypes.object,
  customButtonText: PropTypes.string,
  iconStyle: PropTypes.object,
  style: PropTypes.object,
};

Popup1Button.defaultProps = {
  showPopup: false,
  headerText: '',
  contentText: '',
  customContent: null,
  headerImage: null,
  headerTextStyle: null,
  contentTextStyle: null,
  customButtonText: null,
  iconStyle: null,
  style: null,
};

export default Popup1Button;

const styles = StyleSheet.create({
  modalMainView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.1)',
  },
  modalView: {
    width: '85%',
    backgroundColor: colors.white,
    borderRadius: sizes.padding,
    padding: sizes.padding,
    alignItems: 'center',
  },
  headerModalText: {
    fontSize: 18,
    color: colors.bodyText,
    textAlign: 'center',
    fontFamily: 'Poppins-Bold',
  },
  contentModalText: {
    fontSize: 15,
    color: colors.bodyText,
    textAlign: 'center',
    paddingVertical: sizes.padding,
    lineHeight: sizes.padding,
    fontFamily: 'Inter-Regular',
  },
  icon: {
    width: SCREEN_WIDTH * 0.2,
    height: SCREEN_WIDTH * 0.2,
    marginVertical: 30,
  },
});
