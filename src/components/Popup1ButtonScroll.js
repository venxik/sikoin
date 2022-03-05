import React from 'react';
import { View, Text, StyleSheet, Modal, Image, ScrollView } from 'react-native';
import { ButtonText } from '../components';
import PropTypes from 'prop-types';
import { colors, SCREEN_WIDTH, sizes, strings } from '../constants';

const Popup1ButtonScroll = props => {
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
        <View style={styles.modalView}>
          <ScrollView
            style={{ height: '50%', marginBottom: sizes.padding }}
            contentContainerStyle={{ alignItems: 'center' }}>
            {headerImage && (
              <Image
                resizeMode="contain"
                source={headerImage}
                style={[styles.icon, { ...iconStyle }]}
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
          </ScrollView>
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

Popup1ButtonScroll.propTypes = {
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
};

Popup1ButtonScroll.defaultProp = {
  showPopup: false,
  headerText: 'default',
  contentText: 'default',
  customContent: null,
  headerImage: null,
  headerTextStyle: null,
  contentTextStyle: null,
  customButtonText: null,
  iconStyle: null,
};

export default Popup1ButtonScroll;

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
    fontWeight: 'bold',
    color: colors.bodyText,
    textAlign: 'center',
  },
  contentModalText: {
    paddingHorizontal: 16,
    fontSize: 14,
    color: colors.bodyTextGrey,
    paddingVertical: sizes.padding,
    textAlign: 'center',
    lineHeight: sizes.padding,
  },
  icon: {
    width: SCREEN_WIDTH * 0.2,
    height: SCREEN_WIDTH * 0.2,
    marginVertical: 30,
  },
});
