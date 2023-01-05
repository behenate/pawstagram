import { MD3Theme, Text, useTheme } from 'react-native-paper';
import { PostData } from '../types/PostData';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import Post from './Post';
import CommentsList from './CommentsList';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../App';
import { DocumentData, QueryDocumentSnapshot } from 'firebase/firestore';

export default function PostCard({ post }: PostCardProps) {
  const theme = useTheme();
  const styles = useStyles(theme);
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  return (
    <View style={styles.container}>
      <Post post={post} />
      <TouchableOpacity
        style={styles.commentsPreviewContainer}
        onPress={() => navigation.navigate('Post', { post })}>
        <Text style={theme.fonts.titleSmall}>Comments:</Text>
        <CommentsList comments={post.data().comments} isPreview={true} />
      </TouchableOpacity>
    </View>
  );
}

const useStyles = (theme: MD3Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      marginHorizontal: 10,
      padding: 0,
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
  post: QueryDocumentSnapshot<PostData>;
};
