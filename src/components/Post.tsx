import { Image, StyleSheet, TouchableOpacity, View, ViewStyle } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Text, useTheme } from 'react-native-paper';
import { PostData } from '../types/PostData';
import { useState } from 'react';
import PostHeader from './PostHeader';
import { useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../App';

export default function Post({ post, style }: PostProps) {
  const theme = useTheme();
  const [liked, setLiked] = useState<boolean>(post.likedByLoggedInUser);
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
          onPress={() => setLiked(!liked)}
          hitSlop={{ bottom: 30, top: 30, left: 30, right: 30 }}>
          <MaterialCommunityIcons name={iconName} size={iconSize} color={iconColor} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            isOnPostScreen ? undefined : navigation.navigate('Post', { post, focusTextInput: true })
          }>
          <MaterialCommunityIcons size={iconSize - 5} name={'comment'} color={'lightblue'} />
        </TouchableOpacity>
        <TouchableOpacity>
          <MaterialCommunityIcons size={iconSize} name={'share'} color={'aquamarine'} />
        </TouchableOpacity>
      </View>
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
    paddingLeft: 25,
  },
  commentsPreviewContainer: {
    paddingLeft: 25,
  },
});

type PostProps = {
  post: PostData;
  style?: ViewStyle;
};
