import type { Comment } from './Comment';
export type PostData = {
  creator: string;
  likes: number;
  likedByLoggedInUser: boolean;
  images?: [string];
  text?: string;
  comments: [Comment];
};
