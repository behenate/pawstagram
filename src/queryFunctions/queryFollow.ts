import { addDoc, collection, doc, increment, updateDoc } from 'firebase/firestore';
import { firestore } from '../firebase/config';
// This query follows a user
export const queryFollow = async (followerId: string, followedId: string) => {
  const userRef = doc(firestore, 'users', followedId);

  const likesCollection = collection(firestore, 'follows');
  await addDoc(likesCollection, { followerId: followerId, followedId: followedId });
  await updateDoc(userRef, {
    followersCount: increment(1),
  });
};
