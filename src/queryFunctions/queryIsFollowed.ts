import { collection, getDocs, query, where } from 'firebase/firestore';
import { firestore } from '../firebase/config';

// This query checks if user liked a specific post or comment by id
export const queryIsFollowed = async (followerId: string, followedId: string) => {
  const likesCollection = collection(firestore, 'follows');
  const isFollowedQuery = query(
    likesCollection,
    where('followerId', '==', followerId),
    where('followedId', '==', followedId)
  );
  const results = await getDocs(isFollowedQuery);
  return results.size == 1;
};
