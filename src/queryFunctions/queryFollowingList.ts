// Returns list of userIds of users who are followed by user with specified userId
import { collection, getDocs, query, where } from 'firebase/firestore';
import { firestore } from '../firebase/config';

export default async function queryFollowingList(userId: string) {
  const followsCollection = collection(firestore, 'follows');
  const followingQuery = query(followsCollection, where('followerId', '==', userId));
  const followingSnapshot = await getDocs(followingQuery);
  const following = Array<string>();
  return new Promise<string[]>((resolve) => {
    followingSnapshot.forEach((result) => {
      following.push(result.data().followedId);
      if (following.length == followingSnapshot.size) {
        resolve(following);
      }
    });
  });
}
