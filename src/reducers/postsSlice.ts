import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../types/Post';
// This slice is used to pass post data and functions when navigating from feed to post screen and keep the
// optimistic updates working

// Define a type for the slice state
export interface PostsSlice {
  [id: string]: Post;
}

// Define the initial state using that type
const initialState: PostsSlice = {};
export const postsSlice = createSlice({
  name: 'currentPost',
  initialState: initialState,
  reducers: {
    setLikesCount: (state, action: PayloadAction<{ id: string; likesCount: number }>) => {
      state[action.payload.id].likesCount = action.payload.likesCount;
    },

    setLiked: (state, action: PayloadAction<{ id: string; liked: boolean }>) => {
      state[action.payload.id].liked = action.payload.liked;
    },
    addPost: (state, action: PayloadAction<Post>) => {
      state[action.payload.id] = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setLikesCount, setLiked, addPost } = postsSlice.actions;

export default postsSlice.reducer;
