import { PostData } from './PostData';
import { Comment } from './Comment';

export type Post = PostData & {
  id: string;
  topResponses: Comment[];
  liked: boolean;
};
