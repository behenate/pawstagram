import CommonContainer from '../containers/CommonContainer';
import { StyleSheet } from 'react-native';
import { User } from '../types/User';
import React, { useEffect, useState } from 'react';
import HomeFeed from '../components/HomeFeed';
import { PostData } from '../types/PostData';
import { IconButton } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../App';
import { collection, getDocs, query, where, orderBy } from 'firebase/firestore';
import { auth, firestore } from '../firebase/config';
import { Post as PostType } from '../types/Post';
import { useDispatch } from 'react-redux';
import { addPost } from '../reducers/postsSlice';

export default function HomeScreen() {
  const dispatch = useDispatch();
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [postIds, setPostIds] = useState<string[]>([]);
  const followsCollection = collection(firestore, 'follows');
  const postsCollection = collection(firestore, 'posts');
  const followingQuery = query(followsCollection, where('followerId', '==', auth.currentUser?.uid));
  const postsQuery = (creatorId: string) =>
    query(postsCollection, where('creator', '==', creatorId), orderBy('timestamp', 'desc'));

  useEffect(() => {
    getDocs(followingQuery).then((results) => {
      const gotPostIds: string[] = [];
      results.forEach((result) => {
        const followedId = result.data().followedId;
        getDocs(postsQuery(followedId))
          .then((followedPosts) => {
            followedPosts.forEach((followedPost) => {
              dispatch(
                addPost({
                  id: followedPost.id,
                  ...(followedPost.data() as PostData),
                  // Unpack timestamp to regular object, since it is not serializable for some reason
                  timestamp: { ...followedPost.data().timestamp },
                } as PostType)
              );
              gotPostIds.push(followedPost.id);
            });
          })
          .then(() => {
            setPostIds(gotPostIds);
          });
      });
    });
  }, []);
  return (
    <CommonContainer style={styles.container} useTouchableOpacity={false}>
      <HomeFeed postIds={postIds} />
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
