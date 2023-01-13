import { PostData } from './PostData';
export type Post = PostData & {
  id: string;
  liked: boolean;
};
