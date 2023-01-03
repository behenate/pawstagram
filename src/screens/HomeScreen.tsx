import CommonContainer from '../containers/CommonContainer';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { User } from '../types/User';
import React from 'react';
import HomeFeed from '../components/HomeFeed';
import { PostData } from '../types/PostData';
import { Button, IconButton, MD3Theme, useTheme } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../App';

export default function HomeScreen() {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const styles = useStyles(useTheme());

  const post = require('../assets/testPost.json') as PostData;
  const posts = Array(100);
  for (let i = 0; i < 100; i++) {
    posts[i] = post;
  }

  return (
    <CommonContainer style={styles.container} useTouchableOpacity={false}>
      <HomeFeed posts={posts as [PostData]} />
      <IconButton
        onPress={() => navigation.navigate('NewPost')}
        mode={'contained-tonal'}
        style={styles.button}
        icon={'plus'}
      />
    </CommonContainer>
  );
}

const useStyles = (theme: MD3Theme) =>
  StyleSheet.create({
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
