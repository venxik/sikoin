import { strings, apis } from 'constants';
import { createSlice } from '@reduxjs/toolkit';
import { isEmpty } from 'lodash';

const initialState = {
  error: {
    title: strings.error_generic_title,
    message: strings.error_generic_message,
  },
  options: {
    isVisible: false,
    screenSource: 'RouterContainer',
    errorType: apis.errorTypes.generic,
  },
};

const errorModalSlice = createSlice({
  name: 'errorModal',
  initialState,
  reducers: {
    showErrorModal: (state, { payload }) => {
      const { options } = payload;

      state.error = isEmpty(payload.error) ? initialState.error : payload.error;
      state.options = {
        isVisible: true,
        screenSource: isEmpty(options.screenSource)
          ? initialState.options.screenSource
          : options.screenSource,
        errorType: isEmpty(options.errorType)
          ? initialState.options.errorType
          : options.errorType,
      };
    },
    dismissErrorModal: () => initialState,
  },
});

export const { showErrorModal, dismissErrorModal } = errorModalSlice.actions;

export default errorModalSlice.reducer;
