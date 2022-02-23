import rootReducer from 'reducers';
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';

const middleware = [
  ...getDefaultMiddleware({
    thunk: true,
    serializableCheck: {
      ignoredActions: false,
    },
  }),
];

// if (__DEV__) {
//   middleware.push(
//     createLogger({
//       collapsed: true,
//       duration: true,
//       timestamp: true,
//       logErrors: true,
//       diff: true,
//     }),
//   );
// }

export const store = configureStore({
  reducer: rootReducer,
  middleware,
});

export const getStore = () => store;
