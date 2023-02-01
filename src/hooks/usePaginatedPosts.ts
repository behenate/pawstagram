import { useEffect, useState } from 'react';
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  QueryDocumentSnapshot,
  startAfter,
  where,
} from 'firebase/firestore';
import { firestore } from '../firebase/config';
import { Post } from '../types/Post';
import { queryAdditionalPostData } from '../queryFunctions/queryAdditionalPostData';
import { PostData } from '../types/PostData';

// Creates a hook for paginated posts, authors is the array of allowed authors, for a single author pass an
// array with only id
export default function usePaginatedPosts(pageSize: number = 20, authorsPassed?: string[]) {
  const [authors, setAuthors] = useState<string[]>(authorsPassed ? authorsPassed : []);
  const [posts, setPosts] = useState<Post[]>([]);
  const [canLoadMore, setCanLoadMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const postsCollection = collection(firestore, 'posts');
  const [lastVisible, setLastVisible] = useState<QueryDocumentSnapshot | undefined>(undefined);
  const decoyQuery = query(postsCollection, where('creator', '==', '123'));
  const first =
    authors.length > 0
      ? query(
          postsCollection,
          where('creator', 'in', authors),
          orderBy('timestamp', 'desc'),
          limit(pageSize)
        )
      : decoyQuery;
  const nextCreator = (startingPost: QueryDocumentSnapshot | undefined) =>
    authors.length > 0
      ? query(
          postsCollection,
          where('creator', 'in', authors),
          orderBy('timestamp', 'desc'),
          startAfter(startingPost),
          limit(pageSize)
        )
      : decoyQuery;

  useEffect(() => {
    setPosts([]);
    setLastVisible(undefined);
  }, [authors]);

  const loadNextPage: () => Promise<Post[]> = () =>
    new Promise<Post[]>(async (resolve) => {
      setIsLoading(true);
      const next = posts.length > 0 && nextCreator(lastVisible);
      const newPosts: Post[] = [];
      const results = await getDocs(next ? next : first);
      if (results.size == 0) {
        setCanLoadMore(false);
        setIsLoading(false);
        resolve([]);
      }
      results.forEach((result) => {
        queryAdditionalPostData(result as QueryDocumentSnapshot<PostData>).then((post) => {
          newPosts.push(post);
          if (newPosts.length == results.docs.length) {
            setPosts([...posts, ...newPosts]);
            setLastVisible(results.docs[results.docs.length - 1]);
            setIsLoading(false);
            resolve(newPosts);
          }
        });
      });
    });

  return { posts, loadNextPage, canLoadMore, setAuthors, isLoading };
}
