import { configureStore } from '@reduxjs/toolkit';
import taskReducer from './taskSlice';

export const store = configureStore({
    reducer: {
        task: taskReducer,
    },
});

export type AppStore = typeof store;
export type RootState = ReturnType<AppStore['getState']>;