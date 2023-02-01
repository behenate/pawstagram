import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Image, View } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import { StyleSheet } from 'react-native';
import { PostData } from '../types/PostData';
import React from 'react';
import { FieldValue, Timestamp } from 'firebase/firestore';

export default function PostHeader({ post }: PostHeaderProps) {
  const theme = useTheme();
  let timeDate = new Date();
  if (!(post.timestamp instanceof FieldValue)) {
    timeDate = new Timestamp(post.timestamp.seconds, post.timestamp.nanoseconds).toDate();
  }
  const timeString =
    timeDate.getDate() +
    '/' +
    timeDate.getMonth() +
    1 +
    '/' +
    timeDate.getFullYear() +
    ' ' +
    timeDate.toLocaleTimeString().slice(0, 5);
  return (
    <View style={styles.userInfoContainer}>
      {post.creatorAvatar != '' ? (
        <Image source={{ uri: post.creatorAvatar }} style={styles.avatar} />
      ) : (
        <MaterialCommunityIcons name={'account-circle'} size={48} color={theme.colors.primary} />
      )}

      <View style={styles.usernameAndDate}>
        <Text style={theme.fonts.titleMedium}>{post.creatorFullName}</Text>
        <Text style={theme.fonts.bodySmall}>{timeString}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  userInfoContainer: {
    flexDirection: 'row',
    alignContent: 'center',
    paddingHorizontal: 20,
    marginBottom: 5,
  },
  usernameAndDate: {
    flex: 1,
    justifyContent: 'center',
    paddingLeft: 5,
  },
  avatar: {
    overflow: 'visible',
    borderRadius: 30,
    width: 44,
    height: 44,
  },
});
type PostHeaderProps = {
  post: PostData;
};
