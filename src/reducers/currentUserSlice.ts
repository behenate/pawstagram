import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../types/User';
import emptyUser from '../assets/emptyUser.json';
// This slice is used to pass post data and functions when navigating from feed to post screen and keep the
// optimistic updates working

// Define a type for the slice state

// Define the initial state using that type
const initialState: User = emptyUser as User;
export const currentUserSlice = createSlice({
  name: 'currentUser',
  initialState: initialState,
  reducers: {
    setCurrentUser: (state, action: PayloadAction<User>) => {
      state.id = action.payload.id;
      state.followersCount = action.payload.followersCount;
      state.followingCount = action.payload.followingCount;
      state.postsCount = action.payload.postsCount;
      state.email = action.payload.email;
      state.avatar = action.payload.avatar;
      state.fullName = action.payload.fullName;
      state.isOnline = action.payload.isOnline;
      state.registrationDate = action.payload.registrationDate;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setCurrentUser } = currentUserSlice.actions;

export default currentUserSlice.reducer;
