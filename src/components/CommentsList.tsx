import type { CommentData } from '../types/CommentData';
import { StyleSheet, View, ViewStyle } from 'react-native';
import React, { useEffect, useState } from 'react';
import Comment from './Comment';
import { FlashList } from '@shopify/flash-list';
import { Comment as CommentType } from '../types/Comment';
export default function CommentsList({
  comments,
  isPreview = false,
  style,
  reverse = true,
  flashListProps,
}: CommentListProps) {
  const [commentsProcessed] = useState(comments.slice());
  useEffect(() => {
    if (reverse) {
      commentsProcessed.reverse();
    }
  }, []);
  return (
    <View style={[styles.container, style]}>
      <FlashList<CommentType>
        estimatedItemSize={33}
        data={isPreview ? comments.slice(0, 3) : comments}
        renderItem={({ item }) => <Comment comment={item} isPreview={isPreview} />}
        {...flashListProps}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // minHeight used to avoid FlashList's rendered size is not usable
    minHeight: 20,
  },
});

export type CommentListProps = {
  comments: CommentType[];
  isPreview?: boolean;
  style?: ViewStyle;
  reverse?: boolean;
  flashListProps?: object;
};
