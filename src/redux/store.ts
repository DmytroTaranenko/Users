import { configureStore } from '@reduxjs/toolkit'

import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist'

import storage from 'redux-persist/lib/storage'
import { usersReducers } from './Users/usersReducer'

const userConfig = {
    key: 'userKey',
    storage,
    whitelist: ['users'],
}


const persistedReducer = persistReducer(userConfig, usersReducers);

export const store = configureStore({
    reducer: {
        users: persistedReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
    })



export const persistor = persistStore(store)
