import {
  addDoc,
  collection,
  deleteDoc,
  DocumentSnapshot,
  getDoc,
  getDocs,
  query,
  setDoc,
  where,
} from 'firebase/firestore';
import { PostData } from '../types/PostData';
import { useEffect, useState } from 'react';
import { auth, firestore } from '../firebase/config';

export default function usePostManager(
  postOrg: DocumentSnapshot<PostData>
): [PostData, boolean, () => void, boolean] {
  const [post, setPost] = useState<DocumentSnapshot<PostData>>(postOrg);
  const [postData, setPostData] = useState<PostData>(postOrg.data() as PostData);
  const [liked, setLiked] = useState(false);
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
        setLiked(results.size == 1);
      })
      .catch((err) => alert(err));
  }, []);

  const toggleLike = async () => {
    console.log('Please help', liked);
    const prevLiked = liked.valueOf();
    const prevPostData = { ...postData };
    setLiked(!liked);
    setPostData({ ...postData, likesCount: postData.likesCount + (liked ? -1 : 1) });
    try {
      setSendingData(true);
      const likedSnapshot = await getDocs(postLikedQuery);
      if (liked) {
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
      getDoc(post.ref).then((res) => {
        setPost(res);
        res.data() && setPostData(res.data() as PostData);
      });
      setSendingData(false);
    } catch (e) {
      setLiked(prevLiked);
      setPostData(prevPostData);
      alert('Error while liking the post' + e);
    }
  };

  const updateLikesCount = async (changeSizeBy: number) => {
    const postDoc = post.ref;
    await setDoc(postDoc, {
      ...postData,
      likesCount: postData.likesCount + changeSizeBy,
    });
  };

  return [postData, liked, toggleLike, sendingData];
}
