// src/redux/store.js
import {configureStore} from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import deviceReducer from './slices/deviceSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {persistCombineReducers, persistStore} from 'redux-persist';
import thunk from 'redux-thunk';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const persistedReducer = persistCombineReducers(persistConfig, {
  userReducer,
  deviceReducer,
});

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: [thunk],
});

export const persistor = persistStore(store);
