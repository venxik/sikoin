import React, { FC } from 'react';
import { View, Text, StyleSheet, Modal, Animated, Image } from 'react-native';
import { ButtonText } from '.';
import { colors, SCREEN_WIDTH, sizes } from '../constants';
import { isEmpty } from 'lodash';
import { Popup2ButtonProps } from './types';

const Popup2Button: FC<Popup2ButtonProps> = props => {
  const {
    iconStyle,
    style,
    showPopup,
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

  return (
    <Modal animationType="slide" transparent={true} visible={showPopup}>
      <View style={[styles.modalMainView, style]}>
        <Animated.View style={styles.modalView}>
          {headerImage && (
            <Image
              source={headerImage}
              style={[styles.icon, { ...iconStyle }]}
            />
          )}
          <View
            style={{
              alignItems: 'center',
            }}>
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
          <View style={styles.buttonContainer}>
            <ButtonText
              text={buttonLeftTitle}
              onPress={buttonLeftOnPress}
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
              onPress={buttonRightOnPress}
              buttonContainerStyle={{ width: '47%' }}
            />
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
};

export default Popup2Button;

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
  icon: {
    width: SCREEN_WIDTH * 0.2,
    height: SCREEN_WIDTH * 0.2,
    marginVertical: 30,
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
  buttonContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
