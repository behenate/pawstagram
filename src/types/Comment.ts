export type Comment = {
  creator: string;
  likes: number;
  likedByLoggedInUser: boolean;
  images?: [string];
  text?: string;
  replies?: [Comment];
};
