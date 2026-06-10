import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistReducer, persistStore } from 'redux-persist';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {mealApi} from "@/src/services/api";


const rootReducer = combineReducers({
    [mealApi.reducerPath]: mealApi.reducer,
});
const persisted = persistReducer(
    { key: 'root', storage: AsyncStorage, whitelist: ['favorites'], blacklist: [mealApi.reducerPath] }, //évite de sauvegarder al cache API
    rootReducer,
);
export const store = configureStore({
    reducer: persisted,
    middleware: (getDefault) =>
        getDefault({ serializableCheck: false }).concat(mealApi.middleware), //pour RTK Query
});
export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;


