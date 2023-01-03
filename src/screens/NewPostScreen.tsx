import { View, Text } from 'react-native';
import React, { useState } from 'react';
import { Button, TextInput } from 'react-native-paper';
import { collection } from 'firebase/firestore';
import { firestore } from '../firebase/config';

export default function NewPostScreen() {
  const [postText, setPostText] = useState('Dupa');
  const [imageUrl, setImageUrl] = useState(
    'https://dogsontheloose.com/wp-content/uploads/2015/07/top-dog-videos.jpg'
  );

  const register = () => {
    const postsRef = collection(firestore, 'posts');
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
        onPress={() => {
          alert('Sending the post :))');
        }}>
        Send
      </Button>
    </View>
  );
}
