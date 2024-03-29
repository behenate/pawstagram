import { View, Text } from 'react-native';
import React, { useState } from 'react';
import { Button, TextInput } from 'react-native-paper';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { firestore } from '../firebase/config';
import { PostData } from '../types/PostData';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { RootState } from '../reducers/store';

export default function NewPostScreen() {
  const navigation = useNavigation();
  const currentUser = useSelector((state: RootState) => state.currentUser);
  const [isLoading, setIsLoading] = useState(false);
  const [postText, setPostText] = useState('Test');
  const [imageUrl, setImageUrl] = useState(
    'https://dogsontheloose.com/wp-content/uploads/2015/07/top-dog-videos.jpg'
  );

  const addPost = () => {
    setIsLoading(true);

    const postsRef = collection(firestore, 'posts');
    const data: PostData = {
      creator: currentUser.id,
      creatorAvatar: currentUser.avatar,
      creatorFullName: currentUser.fullName,
      text: postText,
      images: [imageUrl],
      timestamp: serverTimestamp(),
      likesCount: 0,
      commentsCount: 0,
    };
    addDoc(postsRef, data).then(() => {
      setIsLoading(false);
      alert('Post added :))');
      navigation.goBack();
    });
  };

  return (
    <View>
      <Text>Hello, this is a test page for adding posts</Text>
      <TextInput
        label={'Write about this post'}
        multiline={true}
        value={postText}
        onChangeText={(text) => setPostText(text)}
      />
      <TextInput
        label={'Add a link to the image'}
        multiline={true}
        value={imageUrl}
        onChangeText={(text) => setImageUrl(text)}
      />
      <Button
        icon={'send'}
        mode={'contained'}
        loading={isLoading}
        onPress={() => {
          addPost();
        }}>
        Send
      </Button>
    </View>
  );
}
