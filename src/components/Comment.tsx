import { CommentData } from '../types/CommentData';
import { Text, useTheme } from 'react-native-paper';
import { useState } from 'react';
import { FlatList, TouchableOpacity, View } from 'react-native';
import { FlashList } from '@shopify/flash-list';

export default function Comment({ comment, isPreview }: CommentProps) {
  const theme = useTheme();
  const [repliesVisible, setRepliesVisible] = useState(false);
  const replies = isPreview
    ? comment.replies?.slice(comment.replies?.length - 3, comment.replies?.length)
    : comment.replies;

  return (
    <View>
      <Text>
        <Text style={theme.fonts.titleSmall}>{comment.creator}: </Text>
        <Text>{comment.text}</Text>
      </Text>
      {replies && !isPreview && (
        <TouchableOpacity onPress={() => setRepliesVisible(!repliesVisible)}>
          <Text style={theme.fonts.labelMedium}>
            {repliesVisible ? 'Hide Replies' : 'Show Replies'}
          </Text>
        </TouchableOpacity>
      )}
      {repliesVisible && (
        // minHeight used to avoid the "FlashList's rendered size is not usable" warning, it does not affect the looks of the app
        <View style={{ flex: 1, minHeight: 10 }}>
          <FlashList
            estimatedItemSize={18}
            data={replies}
            renderItem={({ item: reply }) => (
              <Text>
                {' '}
                <Text style={theme.fonts.titleSmall}>{reply.creator}: </Text>
                <Text>{reply.text}</Text>
              </Text>
            )}
          />
        </View>
      )}
    </View>
  );
}

type CommentProps = {
  comment: CommentData;
  isPreview?: boolean;
} & typeof defaultProps;

const defaultProps = {
  isPreview: false,
};
