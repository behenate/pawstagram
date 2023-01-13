import type { CommentData } from './CommentData';
import { FieldValue } from 'firebase/firestore';
// Value returned from firestore
export type PostData = {
  creator: string;
  timestamp: FieldValue;
  images: Array<string>;
  text?: string;
  comments: Array<CommentData>;
  commentsCount: number;
  likesCount: number;
};
