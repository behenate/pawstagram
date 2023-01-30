import { User } from '../types/User';
import CommonContainer from '../containers/CommonContainer';
import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import { Button, MD3Theme, useTheme } from 'react-native-paper';
import Counter from '../components/Counter';
import PostFeed from '../components/PostFeed';
export default function ProfileScreen({
  route: {
    params: { fullName, avatar, followers, following, postsCount },
  },
}: ProfileScreenProps) {
  const theme = useTheme();
  const styles = useStyles(theme);

  return (
    <CommonContainer style={styles.container}>
      <View style={styles.infoContainer}>
        <Image source={{ uri: avatar }} style={styles.avatar} />
        <View style={styles.innerContainer}>
          <Text style={theme.fonts.headlineMedium}>{fullName}</Text>
          <View style={styles.countersContainer}>
            <Counter label={'followers'} count={followers.toString()} />
            <Counter label={'following'} count={following.toString()} />
            <Counter label={'posts'} count={postsCount.toString()} />
          </View>
        </View>
      </View>
      <View style={styles.buttonsContainer}>
        <Button mode={'elevated'} style={styles.button}>
          Follow
        </Button>
        <Button mode={'elevated'} style={styles.button}>
          Message
        </Button>
      </View>
      <PostFeed postIds={[]} emptyFeedText={'This person has not posted anything :('} />
    </CommonContainer>
  );
}
const useStyles = (theme: MD3Theme) =>
  StyleSheet.create({
    container: {
      paddingHorizontal: 40,
      paddingVertical: 30,
    },
    innerContainer: {
      flex: 1,
      paddingTop: 10,
      paddingHorizontal: 20,
    },
    avatar: {
      borderRadius: 200,
      width: 96,
      height: 96,
      borderColor: theme.colors.primary,
      borderWidth: 4,
    },
    infoContainer: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'stretch',
    },
    countersContainer: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    buttonsContainer: {
      display: 'flex',
      marginTop: 20,
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    button: {
      paddingHorizontal: 20,
    },
  });
export type ProfileScreenParams = User;
type ProfileScreenProps = NativeStackScreenProps<RootStackParamList, 'Profile'>;
