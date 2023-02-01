import { configureStore } from '@reduxjs/toolkit';
import postsReducer from './postsSlice';
import currentUserSliceReducer from './currentUserSlice';
export const store = configureStore({
  reducer: {
    posts: postsReducer,
    currentUser: currentUserSliceReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
