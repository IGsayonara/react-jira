import { configureStore } from '@reduxjs/toolkit';

import modalReducer from '@/common/features/modalSlice';
import counterReducer from '@/packages/Jira/features/counterSlice';
import jiraReducer from '@/packages/Jira/features/jiraSlice';

const store = configureStore({
  reducer: {
    counter: counterReducer,
    jira: jiraReducer,
    modal: modalReducer,
    // Add other reducers here if needed
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
