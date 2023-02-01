import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  increment,
  query,
  updateDoc,
  where,
} from 'firebase/firestore';
import { firestore } from '../firebase/config';

// This query checks if user liked a specific post or comment by id
export const queryUnfollow = async (followerId: string, followedId: string) => {
  const userRef = doc(firestore, 'users', followedId);
  const likesCollection = collection(firestore, 'follows');

  const postLikedQuery = query(
    likesCollection,
    where('followerId', '==', followerId),
    where('followedId', '==', followedId)
  );

  const results = await getDocs(postLikedQuery);
  if (results.size == 1) {
    await deleteDoc(results.docs[0].ref);
    await updateDoc(userRef, {
      followersCount: increment(-1),
    });
    return;
  }

  throw new Error("Can't remove non-existing follow!");
};
