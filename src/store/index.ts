import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import tableReducer from './tableSlice';
import themeReducer from './themeSlice';

const tablePersistConfig = { key: 'table', storage, whitelist: ['columns'] };
const themePersistConfig = { key: 'theme', storage };

export const store = configureStore({
  reducer: {
    table: persistReducer(tablePersistConfig, tableReducer),
    theme: persistReducer(themePersistConfig, themeReducer),
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: { ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER] } }),
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;