import { configureStore } from '@reduxjs/toolkit';

import counterReducer from '@/packages/Jira/features/counterSlice';

const store = configureStore({
  reducer: {
    counter: counterReducer,
    // Add other reducers here if needed
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
