import { PostData } from '../types/PostData';
import Post from '../components/Post';
import CommentsList from '../components/CommentsList';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import { StyleSheet, View } from 'react-native';
import CommonContainer from '../containers/CommonContainer';

export default function PostScreen({
  route: {
    params: { post },
  },
}: PostScreenProps) {
  return (
    <CommonContainer style={styles.container} useTouchableOpacity={false}>
      <Post post={post} />
      <CommentsList comments={post.comments} isPreview={false} />
    </CommonContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 0,
    justifyContent: 'flex-start',
  },
});

type PostScreenProps = NativeStackScreenProps<RootStackParamList, 'Post'>;

export type PostScreenParams = {
  post: PostData;
};
