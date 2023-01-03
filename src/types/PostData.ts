import type { CommentData } from './CommentData';
export type PostData = {
  creator: string;
  likes: number;
  likedByLoggedInUser: boolean;
  images?: [string];
  text?: string;
  comments: [CommentData];
};
