import { MD3Theme, Text, useTheme } from 'react-native-paper';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import Post from './Post';
import CommentsList from './CommentsList';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../App';
import usePostManager from '../hooks/usePostManager';
import { useSelector } from 'react-redux';
import { RootState } from '../reducers/store';

export default function PostCard({ postId }: PostCardProps) {
  const theme = useTheme();
  const styles = useStyles(theme);
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const { sendingData, toggleLike } = usePostManager(postId);
  const post = useSelector((state: RootState) => state.posts[postId]);
  return (
    <View style={styles.container}>
      <Post post={post} liked={post.liked} onLikePressed={toggleLike} sendingData={sendingData} />
      <TouchableOpacity
        style={styles.commentsPreviewContainer}
        onPress={() => {
          navigation.navigate('Post', { postId: post.id });
        }}>
        <Text style={theme.fonts.titleSmall}>Comments:</Text>
        <CommentsList comments={post.topResponses} isPreview={true} />
      </TouchableOpacity>
    </View>
  );
}

const useStyles = (theme: MD3Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      marginHorizontal: 10,
      justifyContent: 'center',
      borderRadius: 10,
      elevation: 5,
      backgroundColor: theme.colors.background,
      paddingVertical: 15,
    },
    userInfoContainer: {
      flex: 1,
      flexDirection: 'row',
      paddingLeft: 15,
      marginBottom: 5,
    },
    usernameAndDate: {
      flex: 1,
      justifyContent: 'center',
      paddingLeft: 5,
    },
    image: {
      width: '100%',
      height: undefined,
      aspectRatio: 1.66,
      resizeMode: 'contain',
      marginBottom: 10,
    },
    controlsContainer: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-around',
      paddingVertical: 10,
    },
    postText: {
      paddingLeft: 25,
    },
    commentsPreviewContainer: {
      paddingLeft: 25,
    },
  });

type PostCardProps = {
  postId: string;
};
