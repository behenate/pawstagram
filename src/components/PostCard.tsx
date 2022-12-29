import { MD3Theme, Text, useTheme } from 'react-native-paper';
import { PostData } from '../types/PostData';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useState } from 'react';

export default function PostCard({ post }: PostProps) {
  const theme = useTheme();
  const styles = useStyles(theme);
  const [liked, setLiked] = useState(post.likedByLoggedInUser);
  const iconName = liked ? 'cards-heart' : 'cards-heart-outline';
  const iconColor = liked ? 'red' : 'black';
  const iconSize = 30;
  return (
    <View style={styles.container}>
      <View style={styles.userInfoContainer}>
        <MaterialCommunityIcons name={'account-circle'} size={48} color={theme.colors.primary} />
        <View style={styles.usernameAndDate}>
          <Text style={theme.fonts.titleSmall}>{post.creator}</Text>
          <Text style={theme.fonts.labelSmall}>Posted on: 01/01/2023</Text>
        </View>
      </View>
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
        <TouchableOpacity>
          <MaterialCommunityIcons size={iconSize - 5} name={'comment'} color={'lightblue'} />
        </TouchableOpacity>
        <TouchableOpacity>
          <MaterialCommunityIcons size={iconSize} name={'share'} color={'aquamarine'} />
        </TouchableOpacity>
      </View>

      <View style={styles.commentsPreviewContainer}>
        <Text style={theme.fonts.titleSmall}>Comments:</Text>
        {post.comments.slice(0, 3).map((comment) => (
          <Text>
            {' '}
            <Text style={theme.fonts.titleSmall}>{comment.creator}: </Text>
            <Text>{comment.text}</Text>
          </Text>
        ))}
      </View>
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

type PostProps = {
  post: PostData;
};
