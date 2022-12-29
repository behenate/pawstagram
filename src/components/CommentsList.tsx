import type { CommentData } from '../types/CommentData';
import { StyleSheet, View, ViewStyle } from 'react-native';
import React from 'react';
import Comment from './Comment';
import { FlashList } from '@shopify/flash-list';

export default function CommentsList({ comments, isPreview }: CommentListProps) {
  return (
    <View style={[styles.container]}>
      <FlashList<CommentData>
        estimatedItemSize={33}
        data={isPreview ? comments.slice(comments.length - 3, comments.length) : comments}
        renderItem={({ item }) => <Comment comment={item} isPreview={isPreview} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export type CommentListProps = {
  comments: [CommentData];
  isPreview?: boolean;
} & typeof defaultProps;

const defaultProps = {
  isPreview: false,
};
