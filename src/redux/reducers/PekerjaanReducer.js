import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  pekerjaanData: null,
  error: null,
};

const pekerjaanSlice = createSlice({
  name: 'pekerjaanSlice',
  initialState,
  reducers: {
    addPekerjaan: (state, { payload }) => {
      state.pekerjaanData = payload;
    },
    addPekerjaanSuccess: (state, { payload }) => {
      state.pekerjaanData = payload;
    },
    addPekerjaanFailed: (state, { payload }) => {
      state.error = payload;
    },
  },
});

export const { addPekerjaan, addPekerjaanFailed, addPekerjaanSuccess } =
  pekerjaanSlice.actions;

export default pekerjaanSlice.reducer;
