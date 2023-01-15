import { PostData } from '../types/PostData';
import { useState } from 'react';
import { Post } from '../types/Post';
import {
  collection,
  getDocs,
  orderBy,
  query,
  where,
  QueryDocumentSnapshot,
  limit,
  FieldValue,
} from 'firebase/firestore';
import { firestore } from '../firebase/config';
import { Comment } from '../types/Comment';
import { CommentData } from '../types/CommentData';
export function usePostFetch() {
  const fetchPost = async (postRef: QueryDocumentSnapshot<PostData>) => {
    const topResponses: Comment[] = [];
    const commentsCollection = collection(firestore, 'comments');
    const responsesQuery = query(
      commentsCollection,
      where('respondsTo', '==', postRef.id),
      orderBy('timestamp', 'desc'),
      limit(3)
    );

    await getDocs(responsesQuery).then((results) => {
      results.forEach((result) => {
        topResponses.push({
          id: result.id,
          liked: false,
          ...(result.data() as CommentData),
          topResponses: [],
        } as Comment);
      });
    });
    return {
      id: postRef.id,
      ...(postRef.data() as PostData),
      topResponses: topResponses,
      // Unpack timestamp to regular object, since it is not serializable for some reason
      liked: false,
    } as Post;
  };
  return { fetchPost };
}
