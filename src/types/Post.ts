import { PostData } from './PostData';
import { Comment } from './Comment';

export type Post = PostData & {
  id: string;
  topComments: Comment[];
  // new comments added via optimistic updates
  newComments: Comment[];
  liked: boolean;
};
