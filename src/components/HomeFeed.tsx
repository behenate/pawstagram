import PostCard from './PostCard';

import { FlashList } from '@shopify/flash-list';
import React from 'react';
import { View } from 'react-native';
import { PostData } from '../types/PostData';

export default function HomeFeed({ posts }: HomeFeedProps) {
  return (
    <View style={{ flex: 1 }}>
      <FlashList<PostData>
        data={posts}
        contentContainerStyle={{ paddingBottom: 8 }}
        estimatedItemSize={300}
        renderItem={({ item }) => <PostCard post={item} />}
        ItemSeparatorComponent={() => <View style={{ height: 15 }} />}
        ListHeaderComponent={<View style={{ height: 20 }} />}
      />
    </View>
  );
}

type HomeFeedProps = {
  posts: [PostData];
};
