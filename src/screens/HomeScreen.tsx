import CommonContainer from '../containers/CommonContainer';
import { StyleSheet } from 'react-native';
import { User } from '../types/User';
import React from 'react';
import HomeFeed from '../components/HomeFeed';
import { PostData } from '../types/PostData';

export default function HomeScreen() {
  const post = require('../assets/testPost.json') as PostData;
  const posts = Array(100);
  for (let i = 0; i < 100; i++) {
    posts[i] = post;
  }

  return (
    <CommonContainer style={styles.container} useTouchableOpacity={false}>
      <HomeFeed posts={posts as [PostData]} />
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
});

export type HomeScreenParams = {
  userData: User;
};
