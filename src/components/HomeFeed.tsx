import PostCard from './PostCard';

import { FlashList } from '@shopify/flash-list';
import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';

export default function HomeFeed({ postIds }: HomeFeedProps) {
  return (
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

type HomeFeedProps = {
  postIds: string[];
};
