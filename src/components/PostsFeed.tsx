import PostCard from './PostCard';

import { FlashList } from '@shopify/flash-list';
import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ActivityIndicator, useTheme } from 'react-native-paper';
import { Post } from '../types/Post';

export default function PostsFeed({
  posts,
  onEndReached,
  emptyFeedText = 'This feed is empty :((',
  canLoadMore = false,
}: HomeFeedProps) {
  const theme = useTheme();

  useEffect(() => {
    if (posts.length == 0) {
      if (onEndReached) {
        onEndReached();
      }
    }
  }, []);

  return posts.length == 0 && canLoadMore == false ? (
    <View style={styles.emptyFeed}>
      <Text style={theme.fonts.bodyMedium}>{emptyFeedText}</Text>
    </View>
  ) : (
    <View style={{ flex: 1 }}>
      <FlashList<Post>
        data={posts}
        contentContainerStyle={{ paddingBottom: 8 }}
        estimatedItemSize={300}
        renderItem={({ item }) => <PostCard post={item} />}
        ItemSeparatorComponent={() => <View style={{ height: 15 }} />}
        ListHeaderComponent={<View style={{ height: 20 }} />}
        ListFooterComponent={
          <View style={styles.loadingIndicatorContainer}>
            {canLoadMore ? (
              <ActivityIndicator style={styles.loadingIndicator} size={32} />
            ) : (
              <Text style={styles.text}>No more posts</Text>
            )}
          </View>
        }
        onEndReached={onEndReached}
        onEndReachedThreshold={0.5}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  emptyFeed: {
    flex: 1,
    alignItems: 'center',
    margin: 30,
  },
  loadingIndicator: {},
  loadingIndicatorContainer: {
    marginTop: 10,
    flex: 1,
    alignItems: 'center',
  },
  text: {
    opacity: 0.2,
  },
});

type HomeFeedProps = {
  posts: Post[];
  emptyFeedText?: string;
  onEndReached?: () => void;
  canLoadMore?: boolean;
};
