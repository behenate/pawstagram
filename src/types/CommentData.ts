export type CommentData = {
  creator: string;
  likes: number;
  likedByLoggedInUser: boolean;
  images?: [string];
  text?: string;
  replies?: [CommentData];
};
