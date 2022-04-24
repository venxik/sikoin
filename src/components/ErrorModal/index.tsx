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

const ErrorModal = (props: ErrorModalProps) => {
  const scaleValue = useRef(new Animated.Value(0)).current;
  const dispatch = useDispatch();
  const { isVisible, errorType } = props.options || {};

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

    switch (errorType) {
      case apis.errorTypes.generic:
        modalTitle = strings.error_generic_title;
        modalBody = strings.error_generic_message;
        return { modalTitle, modalBody };
      case apis.errorTypes.networkError:
        modalTitle = strings.error;
        modalBody = strings.error_network_message;
        return { modalTitle, modalBody };
      case apis.errorTypes.badRequest:
        modalTitle = strings.error_400_title;
        modalBody = strings.error_400_message;
        return { modalTitle, modalBody };
      case apis.errorTypes.unauthorized:
        modalTitle = strings.error_401_title;
        modalBody = strings.error_generic_message;
        return { modalTitle, modalBody };
      case apis.errorTypes.forbidden:
        modalTitle = strings.error_403_title;
        modalBody = strings.error_403_message;
        return { modalTitle, modalBody };
      case apis.errorTypes.notFound:
        modalTitle = strings.error_404_title;
        modalBody = strings.error_404_message;
        return { modalTitle, modalBody };
      case apis.errorTypes.methodNotAllowed:
        modalTitle = strings.error_405_title;
        modalBody = strings.error_405_message;
        return { modalTitle, modalBody };
      case apis.errorTypes.conflict:
        modalTitle = strings.error_409_title;
        modalBody = strings.error_409_message;
        return { modalTitle, modalBody };
      case apis.errorTypes.unsupported:
        modalTitle = strings.error_415_title;
        modalBody = strings.error_415_message;
        return { modalTitle, modalBody };
      case apis.errorTypes.unprocessable:
        modalTitle = strings.error_422_title;
        modalBody = strings.error_422_message;
        return { modalTitle, modalBody };
      case apis.errorTypes.serverError:
        modalTitle = strings.error_500_title;
        modalBody = strings.error_500_title;
        return { modalTitle, modalBody };
      default:
        modalTitle = strings.error_generic_title;
        modalBody = strings.error_generic_message;
        return { modalTitle, modalBody };
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
            <Image source={icons.popup_failed} style={styles.icon} />
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
