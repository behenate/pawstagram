import { QueryDocumentSnapshot } from 'firebase/firestore';
import { queryComments } from './queryComments';
import { queryLiked } from './queryLiked';
import { auth } from '../firebase/config';
import { CommentData } from '../types/CommentData';
import { Comment } from '../types/Comment';
// Fills the liked and topComments fields of a comment
export const queryAdditionalCommentData = async (
  postRef: QueryDocumentSnapshot<CommentData>,
  commentsLimit: number = 3
) => {
  const topComments = await queryComments(postRef.id, commentsLimit);
  const liked = await queryLiked(auth.currentUser?.uid!, postRef.id);
  return {
    id: postRef.id,
    ...(postRef.data() as CommentData),
    topComments: topComments,
    newComments: [],
    // Unpack timestamp to regular object, since it is not serializable for some reason
    liked: liked,
  } as Comment;
};
