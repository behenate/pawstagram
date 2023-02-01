import { configureStore } from '@reduxjs/toolkit';
import postsReducer from './postsSlice';
import currentUserReducer from './currentUserSlice';
export const store = configureStore({
  reducer: {
    posts: postsReducer,
    currentUser: currentUserReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
