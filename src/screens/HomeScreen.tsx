import CommonContainer from '../containers/CommonContainer';
import { StyleSheet } from 'react-native';
import { User } from '../types/User';
import React, { useEffect, useState } from 'react';
import PostFeed from '../components/PostFeed';
import { IconButton } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../App';
import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  QueryDocumentSnapshot,
} from 'firebase/firestore';
import { auth, firestore } from '../firebase/config';
import { Post as PostType } from '../types/Post';
import { useDispatch } from 'react-redux';
import { addPost } from '../reducers/postsSlice';
import { queryAdditionalPostData } from '../queryFunctions/queryAdditionalPostData';
import FullscreenLoading from '../components/FullscreenLoading';

export default function HomeScreen() {
  const dispatch = useDispatch();
  const userId = auth.currentUser?.uid;
  const [isLoading, setIsLoading] = useState(true);
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [postIds, setPostIds] = useState<string[]>([]);

  const followsCollection = collection(firestore, 'follows');
  const postsCollection = collection(firestore, 'posts');
  const followingQuery = query(followsCollection, where('followerId', '==', userId));
  const postsQuery = (creatorId: string) =>
    query(postsCollection, where('creator', '==', creatorId), orderBy('timestamp', 'desc'));

  useEffect(() => {
    setIsLoading(true);

    const loadPosts = async () => {
      const gotPostIds: string[] = [];
      const followingSnapshot = await getDocs(followingQuery);

      followingSnapshot.forEach((result) => {
        const followedId = result.data().followedId;
        getDocs(postsQuery(followedId)).then((followedPosts) => {
          followedPosts.forEach((followedPost) => {
            queryAdditionalPostData(followedPost as QueryDocumentSnapshot<PostType>).then(
              (post) => {
                dispatch(addPost(post));
                gotPostIds.push(followedPost.id);
                if (gotPostIds.length == followedPosts.size) {
                  setIsLoading(false);
                  setPostIds(gotPostIds);
                }
              }
            );
          });
        });
      });
      const users = collection(firestore, 'users');
      const userQuery = query(users, where('id', '==', userId));
      const usersFetched = await getDocs(userQuery);
      const user = usersFetched.docs[0];
      navigation.navigate('Profile', user.data() as User);
    };
    loadPosts().catch(console.error);
  }, []);
  return isLoading ? (
    <FullscreenLoading />
  ) : (
    <CommonContainer style={styles.container} useTouchableOpacity={false}>
      <PostFeed
        postIds={postIds}
        emptyFeedText={'Your feed is empty! Follow your friends to see their posts!'}
      />
      <IconButton
        onPress={() => navigation.navigate('NewPost')}
        mode={'contained-tonal'}
        style={styles.button}
        icon={'plus'}
      />
    </CommonContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    textAlign: 'center',
    marginBottom: 20,
  },
  register: {
    marginBottom: 20,
  },
  prompt: {
    textAlign: 'center',
    marginBottom: 10,
  },
  button: {
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 5,
    paddingVertical: 5,
    width: 50,
    height: 50,
    bottom: 10,
    right: 10,
  },
});

export type HomeScreenParams = {
  userData: User;
};
