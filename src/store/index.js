import { combineReducers, configureStore } from '@reduxjs/toolkit'
import customizationReducer from './reducers/customization/reducer'
import contractReducer from './reducers/contract/reducer'

import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';

const persistConfig = {
    key: 'root',
    storage,
}

const rootReducer = combineReducers({
    customization: customizationReducer,
    contract: contractReducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer
})

export const persistor = persistStore(store)
