import PostCard from './PostCard';

import { FlashList } from '@shopify/flash-list';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useTheme } from 'react-native-paper';

export default function PostFeed({
  postIds,
  emptyFeedText = 'This feed is empty :((',
}: HomeFeedProps) {
  return postIds.length == 0 ? (
    <View style={styles.emptyFeed}>
      <Text style={useTheme().fonts.bodyMedium}>{emptyFeedText}</Text>
    </View>
  ) : (
    <View style={{ flex: 1 }} key={postIds.toString()}>
      <FlashList<string>
        data={postIds}
        contentContainerStyle={{ paddingBottom: 8 }}
        estimatedItemSize={300}
        renderItem={({ item }) => <PostCard postId={item} />}
        ItemSeparatorComponent={() => <View style={{ height: 15 }} />}
        ListHeaderComponent={<View style={{ height: 20 }} />}
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
});

type HomeFeedProps = {
  postIds: string[];
  emptyFeedText?: string;
};
