import PostCard from './PostCard';

import { FlashList } from '@shopify/flash-list';
import React from 'react';
import { View } from 'react-native';
import { PostData } from '../types/PostData';
import { DocumentSnapshot, QueryDocumentSnapshot } from 'firebase/firestore';
import { Post } from '../types/Post';

export default function HomeFeed({ postIds }: HomeFeedProps) {
  return (
    <View style={{ flex: 1 }}>
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
