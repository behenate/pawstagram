import { collection, getDocs, query, where } from 'firebase/firestore';
import { firestore } from '../firebase/config';

// This query checks if user liked a specific post or comment by id
export const queryLiked = async (userId: string, likeableId: string) => {
  const likesCollection = collection(firestore, 'likes');
  const postLikedQuery = query(
    likesCollection,
    where('postId', '==', likeableId),
    where('userId', '==', userId)
  );
  const results = await getDocs(postLikedQuery);
  return results.size == 1;
};
