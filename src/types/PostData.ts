import type { CommentData } from './CommentData';
import { FieldValue } from 'firebase/firestore';
// Value returned from firestore
export type PostData = {
  creator: string;
  timestamp: FieldValue;
  images: Array<string>;
  text?: string;
  // Stores a few comments to show on previews without fetching all the comments
  commentsCount: number;
  likesCount: number;
};
