import CommonContainer from '../containers/CommonContainer';
import { StyleSheet } from 'react-native';
import { User } from '../types/User';
import React, { useEffect, useState } from 'react';
import PostsFeed from '../components/PostsFeed';
import { IconButton } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../App';
import { auth } from '../firebase/config';
import { useDispatch, useSelector } from 'react-redux';
import FullscreenLoading from '../components/FullscreenLoading';
import usePaginatedPosts from '../hooks/usePaginatedPosts';
import queryFollowingList from '../queryFunctions/queryFollowingList';
import { addPost, removeAll } from '../reducers/postsSlice';
import { RootState } from '../reducers/store';
import { setFollowing } from '../reducers/currentUserSlice';

export default function HomeScreen() {
  const dispatch = useDispatch();
  const userId = auth.currentUser?.uid;
  const [isLoading, setIsLoading] = useState(true);
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const posts = useSelector((state: RootState) => Object.values(state.posts));
  const followingList = useSelector((state: RootState) => state.currentUser.followingList);

  const {
    loadNextPage,
    canLoadMore,
    setAuthors,
    isLoading: isLoadingNewPosts,
    reload: reloadPaginatedPosts,
  } = usePaginatedPosts(3);

  useEffect(() => {
    setAuthors(followingList);
    reload();
  }, [followingList]);

  const loadMorePosts = async () => {
    if (canLoadMore && !isLoadingNewPosts) {
      const newPosts = await loadNextPage();
      newPosts.forEach((post) => {
        dispatch(addPost(post));
      });
    }
  };
  const loadFollowing = async () => {
    const follows = await queryFollowingList(userId!);
    setAuthors(follows);
    setIsLoading(false);
    dispatch(setFollowing(follows));
  };
  const reload = () => {
    dispatch(removeAll());
    reloadPaginatedPosts();
  };

  useEffect(() => {
    loadFollowing().catch((e) => Error(e));
  }, []);

  return isLoading ? (
    <FullscreenLoading />
  ) : (
    <CommonContainer style={styles.container} useTouchableOpacity={false}>
      <PostsFeed
        posts={posts}
        emptyFeedText={'Your feed is empty! Follow your friends to see their posts!'}
        onEndReached={loadMorePosts}
        onRefresh={reload}
        canLoadMore={canLoadMore}
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
