import type { CommentData } from './CommentData';
import { FieldValue } from 'firebase/firestore';
export type PostData = {
  creator: string;
  timestamp: FieldValue;
  likes: number;
  likedByLoggedInUser?: boolean;
  images: Array<string>;
  text?: string;
  comments: Array<CommentData>;
};
