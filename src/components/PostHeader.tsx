import { MaterialCommunityIcons } from '@expo/vector-icons';
import { View } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import { StyleSheet } from 'react-native';
import { PostData } from '../types/PostData';

export default function PostHeader({ post }: PostHeaderProps) {
  const theme = useTheme();
  return (
    <View style={styles.userInfoContainer}>
      <MaterialCommunityIcons name={'account-circle'} size={48} color={theme.colors.primary} />
      <View style={styles.usernameAndDate}>
        <Text style={theme.fonts.titleSmall}>{post.creator}</Text>
        <Text style={theme.fonts.labelSmall}>Posted on: 01/01/2023</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  userInfoContainer: {
    flexDirection: 'row',
    paddingLeft: 15,
    marginBottom: 5,
  },
  usernameAndDate: {
    flex: 1,
    justifyContent: 'center',
    paddingLeft: 5,
  },
});

type PostHeaderProps = {
  post: PostData;
};
