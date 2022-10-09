import { isEmpty } from 'lodash';
import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Modal, Animated, Image } from 'react-native';
import { useDispatch } from 'react-redux';
import {
  apis,
  colors,
  icons,
  SCREEN_WIDTH,
  sizes,
  strings,
} from '../../constants';
import { dismissErrorModal } from '../../redux/reducers/ErrorModalReducer';
import Button from '../Button';
import { ErrorModalProps } from './model';

const ErrorModal = ({ error, options }: ErrorModalProps) => {
  const scaleValue = useRef(new Animated.Value(0)).current;
  const dispatch = useDispatch();
  const { isVisible, errorType } = options;
  const { title, message } = error || {};

  useEffect(() => {
    if (isVisible) {
      Animated.spring(scaleValue, {
        toValue: 1,
        useNativeDriver: true,
      }).start();
    }
  }, [isVisible]);

  const closeModal = () => {
    Animated.timing(scaleValue, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      dispatch(dismissErrorModal());
    });
  };

  const getModalText = () => {
    let modalTitle;
    let modalBody;

    if (!isEmpty(error?.message) || !isEmpty(error?.title)) {
      if (errorType === apis.errorTypes.anggotaTerdaftar) {
        modalTitle = message;
      } else {
        modalTitle = title;
        modalBody = message;
      }
    } else {
      modalTitle = strings.error_generic_title;
      modalBody = strings.error_generic_message;
    }
    return { modalTitle, modalBody };
  };

  const getPopupImage = () => {
    if (errorType === apis.errorTypes.anggotaTerdaftar) {
      return icons.popup_success;
    } else {
      return icons.popup_failed;
    }
  };

  return (
    <Modal animationType="slide" transparent={true} visible={isVisible}>
      <View style={styles.modalMainView}>
        <Animated.View
          style={[styles.modalView, { transform: [{ scale: scaleValue }] }]}>
          <View
            style={{
              alignItems: 'center',
            }}>
            <Image source={getPopupImage()} style={styles.icon} />
            <View style={{ alignItems: 'center' }}>
              {!isEmpty(getModalText().modalTitle) && (
                <Text style={styles.headerModalText}>
                  {getModalText().modalTitle}
                </Text>
              )}
              {!isEmpty(getModalText().modalBody) && (
                <Text style={styles.contentModalText}>
                  {getModalText().modalBody}
                </Text>
              )}
            </View>
          </View>
          <View
            style={{
              width: '100%',
              marginTop: sizes.padding,
            }}>
            <Button text={strings.tutup} onPress={closeModal} />
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
};

export default ErrorModal;

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
