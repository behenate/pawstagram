import { PostData } from '../types/PostData';
import { Post } from '../types/Post';
import { QueryDocumentSnapshot } from 'firebase/firestore';
import { queryComments } from './queryComments';
import { queryLiked } from './queryLiked';
import { auth } from '../firebase/config';

// Fills the liked and topResponses fields of a post
export const queryAdditionalPostData = async (
  postRef: QueryDocumentSnapshot<PostData>,
  commentsLimit: number = 3
) => {
  const topComments = await queryComments(postRef.id, commentsLimit);
  const liked = await queryLiked(auth.currentUser?.uid!, postRef.id);
  return {
    id: postRef.id,
    ...(postRef.data() as PostData),
    topComments: topComments,
    liked: liked,
    newComments: [],
    timestamp: { ...postRef.data().timestamp },
  } as Post;
};
