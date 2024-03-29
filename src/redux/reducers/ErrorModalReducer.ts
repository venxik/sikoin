import { createSlice } from '@reduxjs/toolkit';
import { isEmpty } from 'lodash';

import { apis } from '../../constants';

interface ErrorState {
  title: string;
  message?: string;
}

interface OptionsState {
  isVisible?: boolean;
  screenSource?: string;
  errorType?: string;
}

interface RootState {
  error?: ErrorState;
  options: OptionsState;
}

const initialState: RootState = {
  error: {
    title: 'Error',
    message: 'Error Occured',
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
    showErrorModal: (
      state: RootState,
      { payload }: { payload: { options: OptionsState; error?: ErrorState } },
    ) => {
      const { options } = payload;

      state.error = isEmpty(payload.error) ? initialState.error : payload.error;
      state.options = {
        isVisible: true,
        screenSource: isEmpty(options.screenSource)
          ? initialState.options.screenSource
          : options.screenSource,
        errorType: isEmpty(options.errorType) ? initialState.options.errorType : options.errorType,
      };
    },
    dismissErrorModal: () => initialState,
  },
});

export const { showErrorModal, dismissErrorModal } = errorModalSlice.actions;

export default errorModalSlice.reducer;
