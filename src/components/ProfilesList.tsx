import { UserFromSearch } from '../types/UserFromSearch';
import { TouchableOpacity } from 'react-native';
import ProfileSearchResult from './ProfileSearchResult';
import { FlashList } from '@shopify/flash-list';
import React from 'react';

export default function ProfilesList({ profiles, onEndReached }: ProfilesListProps) {
  return (
    <FlashList<UserFromSearch>
      keyboardShouldPersistTaps={'handled'}
      showsVerticalScrollIndicator={false}
      data={profiles}
      // Wrap in touchable opacity, because there are issues with scrolling otherwise (Common container steals touches)
      renderItem={(item) => (
        <TouchableOpacity activeOpacity={1}>
          <ProfileSearchResult foundUser={item.item} />
        </TouchableOpacity>
      )}
      estimatedItemSize={50}
      onEndReached={onEndReached}
    />
  );
}
export type ProfilesListProps = {
  profiles: UserFromSearch[];
  onEndReached?: () => void;
};
