import { collection, getDocs, limit, orderBy, query, where } from 'firebase/firestore';
import { auth, firestore } from '../firebase/config';
import { Comment } from '../types/Comment';
import { CommentData } from '../types/CommentData';
import { queryLiked } from './queryLiked';

export const queryComments = async (respondsTo: string, commentsNumber: number = 3) => {
  const comments: Comment[] = [];
  const commentsCollection = collection(firestore, 'comments');

  const commentsQuery = query(
    commentsCollection,
    where('respondsTo', '==', respondsTo),
    orderBy('timestamp', 'desc'),
    limit(commentsNumber)
  );

  return new Promise<Comment[]>(async (resolve) => {
    const results = await getDocs(commentsQuery);
    const liked = await queryLiked(auth.currentUser?.uid!, respondsTo);
    results.forEach((result) => {
      comments.push({
        id: result.id,
        ...(result.data() as CommentData),
        // to avoid serialization errors
        timestamp: { ...result.data().timestamp },
        liked: liked,
        topComments: [],
        newComments: [],
      } as Comment);
    });

    resolve(comments);
  });
};
