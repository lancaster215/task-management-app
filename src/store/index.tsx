import { configureStore } from '@reduxjs/toolkit';
import taskReducer from './taskSlice';
import assigneeReducer from './assigneeSlice';
import userReducer from './userSlice'

export const store = configureStore({
    reducer: {
        task: taskReducer,
        assignee: assigneeReducer,
        user: userReducer,
    },
});

export type AppStore = typeof store;
export type RootState = ReturnType<AppStore['getState']>;