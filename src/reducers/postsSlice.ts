import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../types/Post';
import { Comment } from '../types/Comment';
// This slice is used to pass post data and functions when navigating from feed to post screen and keep the
// optimistic updates working

// Define a type for the slice state
export interface PostsSlice {
  [id: string]: Post;
}

// Define the initial state using that type
const initialState: PostsSlice = {};
export const postsSlice = createSlice({
  name: 'posts',
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
    // Adds new comment for the optimistic update
    addNewComment: (state, action: PayloadAction<{ id: string; comment: Comment }>) => {
      state[action.payload.id].newComments.push(action.payload.comment);
    },
    // sets new comment's id etc. once the id is assigned by firestore
    updateNewComment: (
      state,
      action: PayloadAction<{ id: string; commentIdx: number; commentId: string }>
    ) => {
      state[action.payload.id].newComments[action.payload.commentIdx].id = action.payload.commentId;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setLikesCount, setLiked, addPost, addNewComment, updateNewComment } =
  postsSlice.actions;

export default postsSlice.reducer;
