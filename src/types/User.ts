import { FieldValue } from 'firebase/firestore';

export type User = {
  id: string;
  email: string;
  fullName: string;
  avatar: string;
  followersCount: number;
  followingCount: number;
  postsCount: number;
  isOnline: boolean;
  registrationDate: { nanoseconds: number; seconds: number } | FieldValue;
  description: string;
};
