import React from 'react';
import { View, Text, StyleSheet, Modal, Image, ScrollView } from 'react-native';
import { Button } from '..';
import { colors, SCREEN_WIDTH, sizes, strings } from '../../constants';
import { isEmpty } from 'lodash';
import { Popup1ButtonProps } from './model';

const Popup1Button = (props: Popup1ButtonProps) => {
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
    scrollable = false,
  } = props;

  const renderScroll = () => {
    return (
      <ScrollView
        style={{ height: '50%', marginBottom: sizes.padding }}
        contentContainerStyle={{ alignItems: 'center' }}>
        {renderContent()}
      </ScrollView>
    );
  };

  const renderContent = () => {
    return (
      <View
        style={{
          alignItems: 'center',
        }}>
        {headerImage && (
          <Image source={headerImage} style={[styles.icon, { ...iconStyle }]} />
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
        {customContent && customContent}
      </View>
    );
  };

  return (
    <Modal animationType="slide" transparent={true} visible={showPopup}>
      <View style={styles.modalMainView}>
        <View style={[styles.modalView, style]}>
          {scrollable ? (
            renderScroll()
          ) : (
            <View
              style={{
                alignItems: 'center',
              }}>
              {headerImage && (
                <Image
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
            </View>
          )}
          <View
            style={{
              width: '100%',
              marginTop: isEmpty(contentText) ? sizes.padding : 0,
            }}>
            <Button
              text={customButtonText ? customButtonText : strings.tutup}
              onPress={onPress}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
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
