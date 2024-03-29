import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { auth, firestore } from '../firebase/config';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../reducers/store';
import { setLiked as setLikedFn, setLikesCount as setLikesCountFn } from '../reducers/postsSlice';

// postManager is used for convenient modification state of a post such as likes comment etc.
export default function usePostManager(postId: string): PostManagement {
  const dispatch = useDispatch();
  const setLiked = (args: { id: string; liked: boolean }) => dispatch(setLikedFn(args));
  const setLikesCount = (args: { id: string; likesCount: number }) =>
    dispatch(setLikesCountFn(args));

  const post = useSelector((state: RootState) => state.posts[postId]);
  const [sendingData, setSendingData] = useState(false);

  const userId = auth.currentUser?.uid;
  const likesCollection = collection(firestore, 'likes');
  const postLikedQuery = query(
    likesCollection,
    where('postId', '==', post.id),
    where('userId', '==', userId)
  );

  useEffect(() => {
    getDocs(postLikedQuery)
      .then((results) => {
        setLiked({ id: post.id, liked: results.size == 1 });
      })
      .catch((err) => alert(err));
  }, []);

  const toggleLike = async () => {
    const prevLiked = post.liked.valueOf();
    setLiked({ id: post.id, liked: !post.liked });
    setLikesCount({ id: post.id, likesCount: post.likesCount + (post.liked ? -1 : 1) });
    try {
      setSendingData(true);
      const likedSnapshot = await getDocs(postLikedQuery);
      if (post.liked) {
        likedSnapshot.forEach((doc) => {
          deleteDoc(doc.ref);
        });
        await updateLikesCount(-1);
      } else {
        await addDoc(likesCollection, {
          postId: post.id,
          userId: userId,
        });
        await updateLikesCount(1);
      }
      setSendingData(false);
    } catch (e) {
      setLiked({ id: post.id, liked: prevLiked });
      setLikesCount({ id: post.id, likesCount: post.likesCount + (post.liked ? -1 : 1) });
      alert('Error while liking the post' + e);
    }
  };

  const updateLikesCount = async (changeSizeBy: number) => {
    const postDoc = doc(firestore, 'posts', post.id);
    await updateDoc(postDoc, {
      likesCount: post.likesCount + changeSizeBy,
    });
  };

  return { sendingData, toggleLike };
}

export type PostManagement = {
  toggleLike: () => void;
  sendingData: boolean;
};
