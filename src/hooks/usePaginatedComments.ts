import {
  collection,
  orderBy,
  query,
  where,
  startAfter,
  getDocs,
  limit,
  QueryDocumentSnapshot,
} from 'firebase/firestore';
import { firestore } from '../firebase/config';
import { useEffect, useState } from 'react';
import { CommentData } from '../types/CommentData';
import { queryAdditionalCommentData } from '../queryFunctions/queryAdditionalCommentData';
import { Comment } from '../types/Comment';

// Fetches paginated comments for a post
export function usePaginatedComments(respondTo: string, pageSize: number = 20) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [canLoadMore, setCanLoadMore] = useState(true);
  const commentsCollection = collection(firestore, 'comments');
  const [lastVisible, setLastVisible] = useState<QueryDocumentSnapshot | undefined>(undefined);
  const first = query(
    commentsCollection,
    where('respondsTo', '==', respondTo),
    orderBy('timestamp', 'desc'),
    limit(pageSize)
  );

  useEffect(() => {
    loadNextPage().catch();
  }, []);

  const loadNextPage = async () => {
    const next =
      comments.length != 0 &&
      lastVisible != undefined &&
      query(
        commentsCollection,
        where('respondsTo', '==', respondTo),
        orderBy('timestamp', 'desc'),
        startAfter(lastVisible),
        limit(pageSize)
      );
    if (!canLoadMore) {
      return [];
    }

    const newComments: Comment[] = [];
    const results = await getDocs(next ? next : first);
    setCanLoadMore(results.docs.length == pageSize);

    results.forEach((result) => {
      queryAdditionalCommentData(result as QueryDocumentSnapshot<CommentData>).then((comment) => {
        newComments.push(comment);
        if (newComments.length == results.docs.length) {
          setComments([...comments, ...newComments]);
          setLastVisible(results.docs[results.docs.length - 1]);
          return newComments;
        }
      });
    });
  };
  return { comments, loadNextPage, canLoadMore };
}
