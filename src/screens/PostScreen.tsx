import Post from '../components/Post';
import CommentsList from '../components/CommentsList';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import { Keyboard, KeyboardAvoidingView, Platform, StyleSheet, View } from 'react-native';
import { ActivityIndicator, TextInput } from 'react-native-paper';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { RootState } from '../reducers/store';
import usePostManager from '../hooks/usePostManager';
import { usePaginatedComments } from '../hooks/usePaginatedComments';
import { addDoc, collection, doc, serverTimestamp, updateDoc } from 'firebase/firestore';
import { firestore } from '../firebase/config';
import { addNewComment, updateNewComment } from '../reducers/postsSlice';
import { Comment } from '../types/Comment';
import { CommentData } from '../types/CommentData';
export default function PostScreen({
  route: {
    params: { postId, focusTextInput = false },
  },
}: PostScreenProps) {
  const { sendingData, toggleLike } = usePostManager(postId);
  const post = useSelector((state: RootState) => state.posts[postId]);
  const dispatch = useDispatch();
  const currentUser = useSelector((state: RootState) => state.currentUser);

  const newComments = useSelector((state: RootState) => state.posts[postId].newComments);
  const heightRef = useRef(-1);
  const refInput = useRef(null);
  // Avoid unnecessary animation after finding the actual size of the post (animation from -1 -> ~370)
  const [animationEnabled, setAnimationEnabled] = useState(false);
  const animatedHeight = useSharedValue<number>(-1);
  const [newCommentText, setNewCommentText] = useState('');
  const {
    comments: paginatedComments,
    loadNextPage,
    canLoadMore,
  } = usePaginatedComments(post.id, 8);
  const [isSendingComment, setIsSendingComment] = useState(false);

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

  const sendComment = async () => {
    setIsSendingComment(true);
    const commentsCollection = collection(firestore, 'comments');
    const data: CommentData = {
      respondsTo: post.id,
      creator: currentUser.id,
      creatorFullName: currentUser.fullName,
      creatorAvatar: currentUser.avatar,
      text: newCommentText,
      images: [],
      timestamp: serverTimestamp(),
      likesCount: 0,
      commentsCount: 0,
    };
    const optimisticComment: Comment = {
      id: '0',
      topComments: [],
      newComments: [],
      liked: false,
      ...data,
      // avoid serialization errors
      timestamp: { seconds: 0, nanoseconds: 0 },
    };
    setNewCommentText('');
    const newCommentIdx = newComments.length;
    dispatch(addNewComment({ id: post.id, comment: optimisticComment }));
    const newComment = await addDoc(commentsCollection, data);
    dispatch(
      updateNewComment({ id: post.id, commentIdx: newCommentIdx, commentId: newComment.id })
    );
    const serverPost = doc(collection(firestore, 'posts'), post.id);
    await updateDoc(serverPost, { commentsCount: post.commentsCount + 1 });
    setIsSendingComment(false);
  };
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
        <CommentsList
          comments={[
            ...newComments.slice().reverse(),
            ...(paginatedComments.length != 0 ? paginatedComments : post.topComments),
          ]}
          isPreview={false}
          style={styles.commentsList}
          onEndReached={loadNextPage}
          ListFooterComponent={canLoadMore ? <ActivityIndicator /> : <></>}
        />
        <TextInput
          ref={refInput}
          label={'comment'}
          value={newCommentText}
          onChangeText={(newText) => setNewCommentText(newText)}
          multiline={true}
          style={styles.textInput}
          right={
            <TextInput.Icon
              icon={isSendingComment ? 'dots-horizontal' : 'send'}
              onPress={sendComment}
            />
          }
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
