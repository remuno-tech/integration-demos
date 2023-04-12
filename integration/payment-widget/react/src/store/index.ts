import { combineReducers, configureStore } from '@reduxjs/toolkit';

import widgetSlice from './slices/widgetSlice';

const rootReducer = combineReducers({
  widget: widgetSlice,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
