import { PostData } from '../types/PostData';
import Post from '../components/Post';
import CommentsList from '../components/CommentsList';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import { Dimensions, KeyboardAvoidingView, Platform, StyleSheet, View } from 'react-native';
import CommonContainer from '../containers/CommonContainer';
import { TextInput } from 'react-native-paper';
import { useState } from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default function PostScreen({
  route: {
    params: { post },
  },
}: PostScreenProps) {
  const [newComment, setNewComment] = useState('');
  return (
    <KeyboardAvoidingView
      contentContainerStyle={[styles.container]}
      style={styles.container}
      behavior={'padding'}>
      <Post post={post} />
      <CommentsList comments={post.comments} isPreview={false} style={styles.commentsList} />
      <TextInput
        label={'comment'}
        value={newComment}
        onChangeText={(newText) => setNewComment(newText)}
        multiline={true}
      />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 0,
    justifyContent: 'flex-start',
    marginBottom: 30,
  },
  commentsList: {
    paddingHorizontal: 30,
  },
});

type PostScreenProps = NativeStackScreenProps<RootStackParamList, 'Post'>;

export type PostScreenParams = {
  post: PostData;
};
