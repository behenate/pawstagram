import { Image, StyleSheet, TouchableOpacity, View, ViewStyle } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Text, useTheme } from 'react-native-paper';
import { PostData } from '../types/PostData';
import PostHeader from './PostHeader';
import { useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../App';
import { Post as PostType } from '../types/Post';
export default function Post({ post, liked, onLikePressed, sendingData, style }: PostProps) {
  const theme = useTheme();
  const iconName = liked ? 'cards-heart' : 'cards-heart-outline';
  const iconColor = liked ? 'red' : 'black';
  const iconSize = 30;

  const isOnPostScreen = useRoute().name == 'Post';
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  return (
    <View style={style}>
      <PostHeader post={post} />
      {post.images && <Image source={{ uri: post.images[0] }} style={styles.image} />}
      <Text style={styles.postText}>
        <Text style={theme.fonts.titleSmall}>{post.creator}: </Text>
        <Text>{post.text}</Text>
      </Text>
      <View style={styles.controlsContainer}>
        <TouchableOpacity
          onPress={() => !sendingData && onLikePressed()}
          hitSlop={{ bottom: 30, top: 30, left: 30, right: 30 }}>
          <MaterialCommunityIcons name={iconName} size={iconSize} color={iconColor} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            isOnPostScreen
              ? undefined
              : navigation.navigate('Post', {
                  postId: post.id,
                  focusTextInput: true,
                })
          }>
          <MaterialCommunityIcons size={iconSize - 5} name={'comment'} color={'lightblue'} />
        </TouchableOpacity>
        <TouchableOpacity>
          <MaterialCommunityIcons size={iconSize} name={'share'} color={'aquamarine'} />
        </TouchableOpacity>
      </View>
      <Text style={[styles.postText, theme.fonts.titleSmall]}>{post.likesCount} Likes</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: undefined,
    aspectRatio: 1.66,
    resizeMode: 'contain',
    marginBottom: 10,
  },
  controlsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
  },
  postText: {
    marginLeft: 25,
  },
  commentsPreviewContainer: {
    paddingLeft: 25,
  },
});

type PostProps = {
  post: PostType;
  liked: boolean;
  onLikePressed: () => void;
  sendingData: boolean;
  style?: ViewStyle;
};
