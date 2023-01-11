import { Image, StyleSheet, TouchableOpacity, View, ViewStyle } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Text, useTheme } from 'react-native-paper';
import { PostData } from '../types/PostData';
import { useEffect, useState } from 'react';
import PostHeader from './PostHeader';
import { useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../App';
import { DocumentSnapshot } from 'firebase/firestore';
export default function Post({ postData, liked, toggleLike, sendingData, style }: PostProps) {
  const theme = useTheme();
  const iconName = liked ? 'cards-heart' : 'cards-heart-outline';
  const iconColor = liked ? 'red' : 'black';
  const iconSize = 30;

  const isOnPostScreen = useRoute().name == 'Post';
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  console.log(liked, iconColor);
  return (
    <View style={style}>
      <PostHeader post={postData} />
      {postData.images && <Image source={{ uri: postData.images[0] }} style={styles.image} />}
      <Text style={styles.postText}>
        <Text style={theme.fonts.titleSmall}>{postData.creator}: </Text>
        <Text>{postData.text}</Text>
      </Text>
      <View style={styles.controlsContainer}>
        <TouchableOpacity
          onPress={() => !sendingData && toggleLike()}
          hitSlop={{ bottom: 30, top: 30, left: 30, right: 30 }}>
          <MaterialCommunityIcons name={iconName} size={iconSize} color={iconColor} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            isOnPostScreen
              ? undefined
              : navigation.navigate('Post', {
                  postData,
                  liked,
                  toggleLike,
                  sendingData,
                  focusTextInput: true,
                })
          }>
          <MaterialCommunityIcons size={iconSize - 5} name={'comment'} color={'lightblue'} />
        </TouchableOpacity>
        <TouchableOpacity>
          <MaterialCommunityIcons size={iconSize} name={'share'} color={'aquamarine'} />
        </TouchableOpacity>
      </View>
      <Text style={[styles.postText, theme.fonts.titleSmall]}>{postData.likesCount} Likes</Text>
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
  postData: PostData;
  liked: boolean;
  toggleLike: () => void;
  sendingData: boolean;
  style?: ViewStyle;
};
