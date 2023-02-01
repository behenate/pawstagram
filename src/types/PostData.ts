import { FieldValue } from 'firebase/firestore';
// Value returned from firestore
export type PostData = {
  creator: string;
  creatorFullName: string;
  creatorAvatar: string;
  timestamp: { nanoseconds: number; seconds: number } | FieldValue;
  images: Array<string>;
  text?: string;
  // Stores a few comments to show on previews without fetching all the comments
  commentsCount: number;
  likesCount: number;
};
