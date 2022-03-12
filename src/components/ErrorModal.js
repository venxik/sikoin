import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  Image,
  TouchableOpacity,
  Animated,
} from 'react-native';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { ButtonText } from '../components';
import { dismissErrorModal } from '../redux/reducers/ErrorModalReducer';

const ErrorModal = props => {
  const scaleValue = useRef(new Animated.Value(0)).current;
  const dispatch = useDispatch();
  const {
    options: { isVisible, errorType },
  } = props || {};

  useEffect(() => {
    if (isVisible) {
      Animated.spring(scaleValue, {
        toValue: 1,
        duration: 200,
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

  return (
    <Modal animationType="fade" transparent visible={isVisible}>
      <View style={styles.modalMainView}>
        <Animated.View
          style={[styles.modalView, { transform: [{ scale: scaleValue }] }]}>
          <TouchableOpacity
            onPress={closeModal}
            style={{
              position: 'absolute',
              right: -10,
              top: -28,
            }}></TouchableOpacity>
          <Text style={styles.headerModalText}>Modal title</Text>
          <Text style={styles.contentModalText}>Modal body</Text>
          <ButtonText
            text={'Button'}
            onPress={closeModal}
            style={{ width: '100%' }}
          />
        </Animated.View>
      </View>
    </Modal>
  );
};

ErrorModal.propTypes = {
  error: PropTypes.object,
  options: PropTypes.object,
};

ErrorModal.defaultProps = {
  error: {},
  options: {},
};

export default ErrorModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalMainView: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    margin: 20,
    backgroundColor: '#FFEFEB',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    borderWidth: 2,
    borderColor: '#E76F51',
  },
  button: {
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  headerModalText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#8C302D',
    paddingVertical: 5,
    textAlign: 'center',
  },
  contentModalText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#8C302D',
    paddingVertical: 20,
    textAlign: 'center',
  },
  headerContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '80%',
  },
  circle: {
    width: 80,
    height: 80,
    borderRadius: 80,
    backgroundColor: 'yellow',
    borderWidth: 2,
    borderColor: '#E76F51',
  },
});
