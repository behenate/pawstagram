import Post from '../components/Post';
import CommentsList from '../components/CommentsList';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import { Keyboard, KeyboardAvoidingView, Platform, StyleSheet, View } from 'react-native';
import { TextInput } from 'react-native-paper';
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { RootState } from '../reducers/store';
import usePostManager from '../hooks/usePostManager';

export default function PostScreen({
  route: {
    params: { postId, focusTextInput = false },
  },
}: PostScreenProps) {
  const { sendingData, toggleLike } = usePostManager(postId);
  const post = useSelector((state: RootState) => state.posts[postId]);

  const heightRef = useRef(-1);
  const refInput = useRef(null);
  // Avoid unnecessary animation after finding the actual size of the post (animation from -1 -> ~370)
  const [animationEnabled, setAnimationEnabled] = useState(false);
  const animatedHeight = useSharedValue<number>(-1);
  const [newComment, setNewComment] = useState('');
  const animatedStyles = useAnimatedStyle(() => {
    return {
      height: animationEnabled
        ? withSpring(animatedHeight.value, {
            damping: animatedHeight.value == 0 ? 20 : 10,
            mass: 0.5,
            stiffness: 100,
          })
        : animatedHeight.value,
      marginTop: withSpring(animatedHeight.value == 0 ? 0 : 30),
    };
  });

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
      setAnimationEnabled(true);
      animatedHeight.value = 0;
    });
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      animatedHeight.value = heightRef.current;
    });

    if (focusTextInput) {
      //@ts-ignore
      setTimeout(() => refInput.current && refInput.current?.focus(), 100);
    }

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);
  return (
    <KeyboardAvoidingView
      style={styles.list}
      behavior={'padding'}
      keyboardVerticalOffset={10}
      enabled={Platform.OS === 'ios'}>
      <View style={{ flex: 1 }}>
        <Animated.View
          style={[animatedStyles, styles.imagesContainer]}
          // Measure height of the post before hiding in order to restore it later
          onLayout={(event) => {
            // console.log(animatedHeight.value, heightRef.current, event.nativeEvent.layout.height);
            if (animatedHeight.value == -1) {
              animatedHeight.value = event.nativeEvent.layout.height;
              heightRef.current = event.nativeEvent.layout.height;
            }
          }}>
          <Post
            sendingData={sendingData}
            liked={post.liked}
            post={post}
            onLikePressed={toggleLike}
          />
        </Animated.View>
        <CommentsList comments={post.topResponses} isPreview={false} style={styles.commentsList} />
        <TextInput
          ref={refInput}
          label={'comment'}
          value={newComment}
          onChangeText={(newText) => setNewComment(newText)}
          multiline={true}
          style={styles.textInput}
          right={<TextInput.Icon icon={'send'} />}
        />
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  list: {
    flex: 1,
  },
  imagesContainer: {
    overflow: 'hidden',
  },
  commentsList: {
    paddingHorizontal: 30,
  },
  textInput: {},
});

type PostScreenProps = NativeStackScreenProps<RootStackParamList, 'Post'>;

export type PostScreenParams = {
  postId: string;
  focusTextInput?: boolean;
};
