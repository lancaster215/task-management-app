import { configureStore } from '@reduxjs/toolkit';
import taskReducer from './taskSlice';
import assigneeReducer from './assigneeSlice';

export const store = configureStore({
    reducer: {
        task: taskReducer,
        assignee: assigneeReducer,
    },
});

export type AppStore = typeof store;
export type RootState = ReturnType<AppStore['getState']>;