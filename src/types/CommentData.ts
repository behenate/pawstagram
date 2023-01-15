import { PostData } from './PostData';

export type CommentData = PostData & {
  respondsTo: string;
};
