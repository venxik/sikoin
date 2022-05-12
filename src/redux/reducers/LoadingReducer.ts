import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoading: false,
  screenSource: 'RouterContainer',
};

const loadingModalSlice = createSlice({
  name: 'loadingModal',
  initialState,
  reducers: {
    showLoading: (state: { isLoading: boolean }) => {
      state.isLoading = true;
    },
    hideLoading: () => initialState,
  },
});

export const { showLoading, hideLoading } = loadingModalSlice.actions;

export default loadingModalSlice.reducer;
