import { View, Text } from 'react-native';
import React, { useState } from 'react';
import { Button, TextInput } from 'react-native-paper';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { auth, firestore } from '../firebase/config';
import { PostData } from '../types/PostData';
import { useNavigation } from '@react-navigation/native';

export default function NewPostScreen() {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const [postText, setPostText] = useState('Test');
  const [imageUrl, setImageUrl] = useState(
    'https://dogsontheloose.com/wp-content/uploads/2015/07/top-dog-videos.jpg'
  );

  const post = () => {
    setIsLoading(true);
    const user = auth.currentUser;
    const postsRef = collection(firestore, 'posts');
    const data: PostData = {
      creator: user ? user.uid : '',
      likes: 0,
      text: postText,
      comments: [],
      images: [imageUrl],
      timestamp: serverTimestamp(),
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
          post();
        }}>
        Send
      </Button>
    </View>
  );
}
