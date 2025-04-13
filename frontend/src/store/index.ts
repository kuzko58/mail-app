import { configureStore } from '@reduxjs/toolkit';
import userReducer from './user.slice';
import inboxReducer from './inbox.slice';

const store = configureStore({
  reducer: {
    user: userReducer,
    inbox: inboxReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
