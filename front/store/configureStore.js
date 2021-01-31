import { configureStore } from '@reduxjs/toolkit';

import rootReducer from '../reducers/index';

export default function configureAppStore() {
  const store = configureStore({
    reducer: rootReducer,
  });

  return store;
}
